import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { DialogsService } from '@common/dialogs/components/dialogs.service';
import { StorageService } from '@common/utils/storage/storage.service';

import { AppShellConfig } from './../../config/app-shell.config.service';
import { AppShellService } from '../app-shell.service';

const APP_VERSION_HEADER = 'x-app-version';
const API_VERSION_HEADER = 'x-api-version';
const APP_TENANT_HEADER = 'x-app-tenant';
const APP_ENVIRONMENT_HEADER = 'x-app-environment';

@Injectable()
export class VersionCheckInterceptor implements HttpInterceptor {
  private static checking = false;

  constructor(
    private storage: StorageService,
    private dialogs: DialogsService,
    private appShellConfig: AppShellConfig,
    private appShellService: AppShellService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      tap((response: HttpResponse<any>) => {
        if (response.headers) {
          this.checkHeaders(response.headers);
        }
      })
    );
  }

  private saveHeaders(headers: HttpHeaders) {
    const withoutUpdateEvent = true;
    VersionCheckInterceptor.checking = false;
    // this.storage.set(this.appShellConfig.settingsCodekeys.apiVersion, headers.get(API_VERSION_HEADER), withoutUpdateEvent);
    // this.storage.set(this.appShellConfig.settingsCodekeys.appVersion, headers.get(APP_VERSION_HEADER), withoutUpdateEvent);
    // this.storage.set(this.appShellConfig.settingsCodekeys.tenantName, headers.get(APP_TENANT_HEADER), withoutUpdateEvent);
    // this.storage.set(this.appShellConfig.settingsCodekeys.environmentName, headers.get(APP_ENVIRONMENT_HEADER), withoutUpdateEvent);
  }

  private async checkHeaders(headers: HttpHeaders) {
    // if ((apiUpdated || appUpdated) && !VersionCheckInterceptor.checking) {
    //   VersionCheckInterceptor.checking = true;
    //   this.dialogs.closeAll();
    //   setTimeout(async () => {
    //     await this.appShellService.showUpdateAlert();
    //     this.saveHeaders(headers);
    //     location.reload();
    //   });
    // }
  }
}
