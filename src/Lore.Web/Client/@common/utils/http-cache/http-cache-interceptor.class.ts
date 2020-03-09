import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse
} from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpCacheService } from './http-cache-service/http-cache.service';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
  constructor(private cache: HttpCacheService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const isRetrievingRequest =
      request.method === 'GET' ||
      (request.method === 'POST' && request.url.includes('/request'));

    if (!isRetrievingRequest || !request.headers.has('cache')) {
      return next.handle(request);
    }

    const cachedResponse = this.cache.get(request);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.put(request, event);
        }
      })
    );
  }
}
