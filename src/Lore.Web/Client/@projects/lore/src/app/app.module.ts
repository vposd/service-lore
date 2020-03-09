import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

import { APP_SHELL_CONFIG } from '@common/app-shell/config/app-shell.config.service';
import { AppShellModule } from '@common/app-shell/app-shell.module';
import { AuthenticationModule } from '@common/authentication/authentication.module';
import { Environment } from '@contracts/environment.class';
import { GlobalErrorHandler } from '@common/app-shell/components/error-handlers/provide-error-handler';
import { InformationModule } from '@common/information/information.module';
import { HttpCacheModule } from '@common/utils/http-cache/http-cache.module';

import { AppComponent } from './app.component';
import { MasterDataConfig } from './modules/master-data/config/master-data-config.service';
import { RoutingModule } from './routing/routing.module';
import { appShellConfig } from './config/shell-config';
import { environment } from '../environments/environment';
import { getRussianPaginatorIntl } from './config/mat-paginator-local';
import { masterDataConfig } from './config/master-data-config';
import { ReportsConfig } from './modules/reports/config/reports-config';
import { reportsConfig } from './config/reports-config';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppShellModule.forRoot(),
    RoutingModule,
    HttpClientModule,
    MatNativeDateModule,
    InformationModule,
    HttpCacheModule.forRoot(),
    BrowserAnimationsModule,
    AuthenticationModule.forRoot()
  ],
  providers: [
    { provide: APP_SHELL_CONFIG, useValue: appShellConfig },
    { provide: Environment, useValue: environment },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: MasterDataConfig, useValue: masterDataConfig },
    { provide: ReportsConfig, useValue: reportsConfig },
    { provide: MatPaginatorIntl, useValue: getRussianPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
