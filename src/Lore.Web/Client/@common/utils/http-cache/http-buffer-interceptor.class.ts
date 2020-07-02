import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
} from '@angular/common/http';
import { tap, finalize, filter } from 'rxjs/operators';
import { forEach } from 'lodash';
import { from } from 'rxjs';

interface Resolver {
  resolve: (response: HttpResponse<any>) => void;
  reject: () => void;
}

const hash = (request: HttpRequest<any>) =>
  request.url + request.params.toString();

@Injectable()
export class HttpBufferInterceptor implements HttpInterceptor {
  private buffer = new Map<string, Resolver[]>();

  intercept<T>(request: HttpRequest<T>, next: HttpHandler) {
    // skip non GET requests
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const requestId = hash(request);

    // if request is in progress, add response resolver to queue
    if (this.buffer.has(requestId)) {
      return from(
        new Promise<HttpResponse<T>>((resolve, reject) =>
          this.buffer.set(requestId, [
            ...this.buffer.get(requestId),
            { resolve, reject },
          ])
        )
      );
    }

    this.buffer.set(requestId, []);

    // for further cancelling requests check
    let cancelled = true;

    return next.handle(request).pipe(
      filter((event) => event instanceof HttpResponse),
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
          this.buffer.delete(requestId);
        }
      })
    );
  }

  private resolve<T>(event: HttpResponse<T>, request: HttpRequest<T>) {
    const requestId = hash(request);

    if (this.buffer.has(requestId)) {
      // send response for each requests from queue
      forEach(this.buffer.get(requestId), (resolver) =>
        resolver.resolve(event)
      );
    }
    this.buffer.delete(requestId);
  }

  private reject<T>(request: HttpRequest<T>) {
    const requestId = hash(request);

    if (this.buffer.has(requestId)) {
      // reject each requests from queue
      forEach(this.buffer.get(requestId), (resolver) => resolver.reject());
    }
    this.buffer.delete(requestId);
  }
}
