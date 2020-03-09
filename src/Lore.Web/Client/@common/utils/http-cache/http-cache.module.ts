import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf
} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpCacheInterceptor } from './http-cache-interceptor.class';
import { HttpBufferInterceptor } from './http-buffer-interceptor.class';

@NgModule()
export class HttpCacheModule {
  constructor(@Optional() @SkipSelf() parentModule: HttpCacheModule) {
    if (parentModule) {
      throw new Error(
        'HttpCacheModule is already loaded. Import it in the AppModule only.'
      );
    }
  }

  static forRoot(): ModuleWithProviders<HttpCacheModule> {
    return {
      ngModule: HttpCacheModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpCacheInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpBufferInterceptor,
          multi: true
        }
      ]
    };
  }
}
