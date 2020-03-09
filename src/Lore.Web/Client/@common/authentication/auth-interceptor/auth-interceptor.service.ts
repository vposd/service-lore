import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, switchMap, finalize, filter, take } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { StorageService } from '@common/utils/storage/storage.service';

import { AuthenticationService } from './../auth-service/authentication.service';
import { StorageKey } from '../types/storage-keys';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshingToken = false;

  private readonly refreshToken$ = new BehaviorSubject<string>(null);

  constructor(
    private readonly storage: StorageService,
    private readonly authentication: AuthenticationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.storage.get(StorageKey.AccessToken);
    return next.handle(this.addTokenToRequest(request, accessToken)).pipe(
      catchError(error => {
        if (!(error instanceof HttpErrorResponse)) {
          return throwError(error);
        }
        if (error.headers.has('Token-Expired') && error.status === 401) {
          return this.handleExpiredToken(request, next);
        }
        if (error.status === 401) {
          this.authentication.onSignOut();
        }
        return throwError(error);
      })
    );
  }

  private addTokenToRequest(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  private handleExpiredToken(request: HttpRequest<any>, next: HttpHandler) {
    if (this.isRefreshingToken) {
      this.isRefreshingToken = false;

      return this.refreshToken$.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => next.handle(this.addTokenToRequest(request, token)))
      );
    }

    this.isRefreshingToken = true;
    this.refreshToken$.next(null);

    const accessToken = this.storage.get(StorageKey.AccessToken);
    const refreshToken = this.storage.get(StorageKey.RefreshToken);

    if (!accessToken || !refreshToken) {
      this.authentication.onSignOut();
      return throwError(null);
    }

    return this.authentication.refreshAccess(accessToken, refreshToken).pipe(
      switchMap(result => {
        this.storage.set(StorageKey.AccessToken, result.accessToken);
        this.storage.set(StorageKey.RefreshToken, result.refreshToken);
        if (!result) {
          this.authentication.signOut();
          return throwError(null);
        }
        this.refreshToken$.next(result.accessToken);
        return next.handle(this.addTokenToRequest(request, result.accessToken));
      }),
      catchError(error => {
        this.authentication.onSignOut();
        return throwError(error);
      }),
      finalize(() => (this.isRefreshingToken = false))
    );
  }
}
