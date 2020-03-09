import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { DialogsService } from '@common/dialogs/components/dialogs.service';
import { AuthenticationService } from '@common/authentication/auth-service/authentication.service';

@Injectable()
export class LicenceCheckInterceptor implements HttpInterceptor {
  private lisenseChecked = false;

  constructor(
    private dialogs: DialogsService,
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      tap(
        () => (this.lisenseChecked = false),
        error => this.checkLicense(error)
      )
    );
  }

  private checkLicense(response: HttpErrorResponse) {
    if (!response || !response.status || !response.statusText) {
      return;
    }

    const isForbidden = response.status === 403;
    const isInvaidLisense =
      response.statusText.toLowerCase() === 'user has no valid license';

    if (!(isForbidden && isInvaidLisense && !this.lisenseChecked)) {
      return;
    }

    // const isUserInfoRequest = response.url.includes(AuthConfig.endpoints.userInfo);
    // this.lisenseChecked = !isUserInfoRequest;
    // const licenseDialogClose = this.dialogs
    //   .info({
    //     title: 'Истечение лицензии',
    //     message: 'Срок действия лицензии истек.\nДля продления лицензии обратитесь к администратору.'
    //   })
    //   .afterClosed()
    //   .pipe(
    //     switchMap(() => this.authenticationService.state$),
    //     tap(state => {
    //       licenseDialogClose.unsubscribe();
    //       if (state.isAuthenticated) {
    //         this.authenticationService.logout();
    //         this.lisenseChecked = false;
    //       }
    //     })
    //   )
    //   .subscribe();
  }
}
