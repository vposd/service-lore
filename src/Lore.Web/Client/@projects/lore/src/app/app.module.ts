import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AuthenticationModule } from '@common/authentication/authentication.module';
import { Environment } from '@contracts/environment.class';
import { HttpCacheModule } from '@common/utils/http-cache/http-cache.module';
import { InformationModule } from '@common/information/information.module';
import { ShellConfig } from '@common/shell/config/shell-config.service';
import { ShellModule } from '@common/shell/shell.module';

import { AppComponent } from './app.component';
import { MasterDataConfig } from './modules/master-data/config/master-data-config.service';
import { RoutingModule } from './routing/routing.module';
import { environment } from '../environments/environment';
import { masterDataConfig } from './config/master-data-config';
import { shellConfig } from './config/shell-config';
import { GlobalSearchModule } from './shared/global-search/global-search.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthenticationModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    GlobalSearchModule,
    HttpCacheModule.forRoot(),
    HttpClientModule,
    InformationModule,
    MatNativeDateModule,
    RoutingModule,
    ShellModule,
  ],
  providers: [
    { provide: Environment, useValue: environment },
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: MasterDataConfig, useValue: masterDataConfig },
    { provide: ShellConfig, useValue: shellConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
