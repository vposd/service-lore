import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { AppShellConfig } from '../../config/app-shell.config.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor(private appShellConfig: AppShellConfig) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const customReq = request.clone();
    return next.handle(customReq);
  }
}
