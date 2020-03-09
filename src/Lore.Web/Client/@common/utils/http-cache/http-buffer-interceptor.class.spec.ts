import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { range } from 'lodash';
import { forkJoin } from 'rxjs';

import { HttpBufferInterceptor } from './http-buffer-interceptor.class';

@Injectable()
class DataService {
  url = `api/endpoint`;

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(this.url).pipe(delay(500));
  }

  post() {
    return this.http.post(this.url, null).pipe(delay(500));
  }
}

describe(`[Core] Service: AuthHttpInterceptor`, () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpBufferInterceptor,
          multi: true
        }
      ]
    });

    service = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should work with single request', () => {
    service.get().subscribe(response => {
      expect(response).toBeTruthy();
    });

    httpMock.expectOne(service.url);
  });

  it('should prevent dublicates requests', () => {
    const requests = range(0, 15).map(() => service.get());
    forkJoin(requests).subscribe(responses => {
      expect(responses.length).toBe(100);
    });

    httpMock.expectOne(service.url);
  });

  it('should prevent dublicates requests', fakeAsync(() => {
    service.get().subscribe(response => {
      expect(response).toBeTruthy();
    });

    tick(5000);

    service.get().subscribe(response => {
      expect(response).toBeTruthy();
    });

    httpMock.expectOne(service.url);
  }));

  it('should not prevent dublicates non GET requests', fakeAsync(() => {
    service.post().subscribe();
    httpMock.expectOne(service.url);

    service.post().subscribe();
    httpMock.expectOne(service.url);

    service.post().subscribe();
    httpMock.expectOne(service.url);
  }));
});
