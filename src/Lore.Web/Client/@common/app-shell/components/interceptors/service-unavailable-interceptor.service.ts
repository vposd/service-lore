import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

import {
  InformationService,
  MessageType
} from '@common/information/information.service';

@Injectable()
export class ServiceUnavailableInterceptor implements HttpInterceptor {
  private checked = false;

  constructor(private information: InformationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next
      .handle(request)
      .pipe(tap(null, error => this.checkServerError(error)));
  }

  private checkServerError(response: HttpErrorResponse) {
    if (!response) {
      return;
    }

    const isServiceUnavailable = [502, 503].includes(response.status);

    if (isServiceUnavailable && !this.checked) {
      this.information.show({
        type: MessageType.Warning,
        message: 'Сервис временно не доступен',
        label: 'Информация',
        timeoutClose: false
      });
      this.checked = true;
      setTimeout(() => (this.checked = false), 5000);
    }
  }
}
