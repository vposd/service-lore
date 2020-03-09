import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppShellConfig } from '@common/app-shell/config/app-shell.config.service';

import { of } from 'rxjs';

@Injectable()
export class SupportService {
  constructor(
    private http: HttpClient,
    private appShellConfig: AppShellConfig
  ) {}

  getDetails() {
    return of(); // this.http.get<SupportDetails>(this.appShellConfig.endpoints.supportInfo || ENDPOINTS.SUPPORT_INFO);
  }
}
