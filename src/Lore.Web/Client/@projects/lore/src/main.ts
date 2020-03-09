import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import localeRU from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

registerLocaleData(localeRU);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
