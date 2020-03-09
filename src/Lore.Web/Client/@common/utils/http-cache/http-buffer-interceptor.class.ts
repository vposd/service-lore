import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { tap, finalize, filter } from 'rxjs/operators';
import { forEach } from 'lodash';
import { from } from 'rxjs';

interface Resolver {
  resolve: (response: HttpResponse<any>) => void;
  reject: () => void;
}

@Injectable()
export class HttpBufferInterceptor implements HttpInterceptor {
  private buffer = new Map<string, Resolver[]>();

  intercept<T>(request: HttpRequest<T>, next: HttpHandler) {
    // skip non GET requests
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    // if request is in progress, add response resolver to queue
    if (this.buffer.has(request.url)) {
      return from(
        new Promise<HttpResponse<T>>((resolve, reject) =>
          this.buffer.set(request.url, [
            ...this.buffer.get(request.url),
            { resolve, reject }
          ])
        )
      );
    }

    this.buffer.set(request.url, []);

    // for further cancelling requests check
    let cancelled = true;

    return next.handle(request).pipe(
      filter(event => event instanceof HttpResponse),
      tap(
        (event: HttpResponse<T>) => this.resolve<T>(event, request),
        () => this.reject<T>(request)
      ),
      tap(
        () => (cancelled = false),
        () => (cancelled = false)
      ),
      finalize(() => {
        if (cancelled) {
          this.buffer.delete(request.url);
        }
      })
    );
  }

  private resolve<T>(event: HttpResponse<T>, request: HttpRequest<T>) {
    if (this.buffer.has(request.url)) {
      // send response for each requests from queue
      forEach(this.buffer.get(request.url), resolver =>
        resolver.resolve(event)
      );
    }
    this.buffer.delete(request.url);
  }

  private reject<T>(request: HttpRequest<T>) {
    if (this.buffer.has(request.url)) {
      // reject each requests from queue
      forEach(this.buffer.get(request.url), resolver => resolver.reject());
    }
    this.buffer.delete(request.url);
  }
}
