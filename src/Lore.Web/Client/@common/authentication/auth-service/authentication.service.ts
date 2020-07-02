import { HttpClient } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthResult } from '@contracts/authentication/auth-result';
import { Environment } from '@contracts/environment.class';
import { HttpCacheService } from '@common/utils/http-cache/http-cache-service/http-cache.service';
import { InformationService } from '@common/information/information.service';
import {
  RequestProgressState,
  RequestProgress,
} from '@common/utils/request-progress/request-progress.class';
import { StorageService } from '@common/utils/storage/storage.service';
import { Store } from '@common/utils/store/store.class';
import { User } from '@contracts/authentication/user';
import { UserCredentials } from '@contracts/authentication/user-credentials';
import { DialogsService } from '@common/dialogs/components/dialogs.service';

import { StorageKey } from '../types/storage-keys';

const ERROR_MAP = {
  401: 'Неправильное имя пользователя или пароль',
  400: 'Имя пользователя или пароль не введены',
  500: 'Не удается войти',
  503: 'Сервис временно не доступен',
};

const formatError = (error: string) =>
  ({
    'Invalid username or password': 'Неправильное имя пользователя или пароль',
  }[error]);

export class AuthState {
  user: User;
  authProgress: RequestProgressState;
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends Store<AuthState> {
  get user$(): Observable<User | null> {
    return this.state$.pipe(map(({ user }) => user));
  }

  get isAuthenticated$() {
    return this.state$.pipe(
      filter(({ authProgress: { progress } }) => !progress),
      map(({ isAuthenticated }) => isAuthenticated),
      map(Boolean),
      distinctUntilChanged()
    );
  }

  get user() {
    return this.state.user;
  }

  set reference(url: string) {
    this.referenceUrl = url;
  }

  get reference() {
    return this.referenceUrl;
  }

  private referenceUrl = '/';

  constructor(
    private readonly http: HttpClient,
    private readonly httpCacheService: HttpCacheService,
    private readonly router: Router,
    private readonly storage: StorageService,
    private readonly environment: Environment,
    private readonly impormation: InformationService,
    private readonly dialogs: DialogsService,
    private readonly errorHandler: ErrorHandler
  ) {
    super(new AuthState());
  }

  async signIn(credentials: UserCredentials) {
    this.state = {
      ...this.state,
      user: null,
      isAuthenticated: false,
      authProgress: {
        progress: true,
      },
    };
    return this.http
      .post<AuthResult>(
        this.environment.endpoints.authentication.signIn,
        credentials
      )
      .pipe(
        tap((result) => {
          this.storage.set(StorageKey.AccessToken, result.accessToken);
          this.storage.set(StorageKey.RefreshToken, result.refreshToken);
          this.httpCacheService.clean();
        })
      )
      .toPromise()
      .then(() => this.getCurrentUser())
      .then(() => this.router.navigate([this.referenceUrl]))
      .catch((errorResponse) => {
        this.errorHandler.handleError(errorResponse);

        const error =
          formatError(errorResponse.error.error) ||
          RequestProgress.formatError(errorResponse, ERROR_MAP);
        this.state = {
          ...this.state,
          authProgress: { error },
        };

        this.impormation.error(error);
      });
  }

  async getCurrentUser() {
    this.state = {
      ...this.state,
      authProgress: {
        progress: true,
      },
    };

    return this.http
      .get<User>(this.environment.endpoints.users.currentUser)
      .toPromise()
      .then(
        (user) =>
          (this.state = {
            ...this.state,
            user: new User(user),
            isAuthenticated: true,
            authProgress: {
              done: true,
            },
          })
      )
      .catch((error) => {
        this.errorHandler.handleError(error);
        this.state = {
          ...this.state,
          user: null,
          isAuthenticated: false,
          authProgress: {
            error: '',
          },
        };
      });
  }

  refreshAccess(accessToken: string, refreshToken: string) {
    return this.http.post<AuthResult>(
      this.environment.endpoints.authentication.refreshAccess,
      { accessToken, refreshToken }
    );
  }

  async signOut() {
    return this.http
      .post(this.environment.endpoints.authentication.signOut, null)
      .pipe(tap(() => this.onSignOut()))
      .toPromise();
  }

  onSignOut() {
    this.dialogs.closeAll();
    this.httpCacheService.clean();
    this.storage.delete(StorageKey.AccessToken);
    this.storage.delete(StorageKey.RefreshToken);
    this.state = {
      ...this.state,
      user: null,
      isAuthenticated: false,
    };
    this.redirectToLogin();
  }

  private redirectToLogin() {
    this.router.navigate(['login']);
  }
}
