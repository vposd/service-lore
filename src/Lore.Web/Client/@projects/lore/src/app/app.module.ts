import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AuthenticationModule } from '@common/authentication/authentication.module';
import { Environment } from '@contracts/environment.class';
import { HttpCacheModule } from '@common/utils/http-cache/http-cache.module';
import { InformationModule } from '@common/information/information.module';
import { ShellModule } from '@common/shell/shell.module';

import { AppComponent } from './app.component';
import { MasterDataConfig } from './modules/master-data/config/master-data-config.service';
import { RoutingModule } from './routing/routing.module';
import { environment } from '../environments/environment';
import { getRussianPaginatorIntl } from './config/mat-paginator-local';
import { masterDataConfig } from './config/master-data-config';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    MatNativeDateModule,
    ShellModule,
    InformationModule,
    HttpCacheModule.forRoot(),
    BrowserAnimationsModule,
    AuthenticationModule.forRoot(),
  ],
  providers: [
    { provide: Environment, useValue: environment },
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: MasterDataConfig, useValue: masterDataConfig },
    { provide: MatPaginatorIntl, useValue: getRussianPaginatorIntl() },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
