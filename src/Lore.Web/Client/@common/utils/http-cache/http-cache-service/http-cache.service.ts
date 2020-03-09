import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {
  private cachedResponses = new Map<string, HttpResponse<any>>();

  put(request: HttpRequest<any>, response: HttpResponse<any>) {
    this.cachedResponses.set(request.url, response.clone());
  }

  get(request: HttpRequest<any>) {
    const cached = this.cachedResponses.get(request.url);
    return cached ? cached.clone() : cached;
  }

  delete(url: string) {
    return this.cachedResponses.delete(url);
  }

  clean() {
    this.cachedResponses.forEach((_, key) => this.cachedResponses.delete(key));
  }
}
