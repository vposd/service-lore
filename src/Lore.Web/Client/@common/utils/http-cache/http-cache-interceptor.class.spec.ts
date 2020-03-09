import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ENABLED_CACHE_OPTIONS } from './http-cache-constant';
import { HttpCacheModule } from './http-cache.module';

@Injectable()
class DataService {
  url = `api/endpoint`;

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(this.url);
  }

  getWithCache() {
    return this.http.get(this.url, ENABLED_CACHE_OPTIONS);
  }

  post() {
    return this.http.post(this.url, null, ENABLED_CACHE_OPTIONS);
  }
}

describe(`[Core] Service: HttpCacheInterceptor`, () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpCacheModule.forRoot()],
      providers: [DataService]
    });

    service = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should not cache request without cache options', () => {
    service.get().subscribe(response => {
      expect(response).toBeTruthy();
    });

    httpMock.expectOne(service.url);
  });

  it('should cache request with cache options', () => {
    service.getWithCache().subscribe(response => {
      expect(response).toBeTruthy();
    });

    service.getWithCache().subscribe(response => {
      expect(response).toBeTruthy();
    });

    httpMock.expectOne(service.url);
  });

  it('should not cache non GET request with cache options', () => {
    service.post().subscribe(response => {
      expect(response).toBeTruthy();
    });

    httpMock.expectOne(service.url);

    service.post().subscribe(response => {
      expect(response).toBeTruthy();
    });

    httpMock.expectOne(service.url);
  });
});
