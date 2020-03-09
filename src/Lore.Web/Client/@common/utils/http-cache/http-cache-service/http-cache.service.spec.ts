import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpResponse } from '@angular/common/http';

import { HttpCacheService } from './http-cache.service';

let service: HttpCacheService;

describe('[Core] Service: HttpCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpCacheService]
    });
    service = TestBed.get(HttpCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide cache saving', () => {
    const request = new HttpRequest('GET', 'localhost');
    const response = new HttpResponse({ body: { data: 'any' } });
    service.put(request, response);

    expect(service.get(request)).toEqual(response);
  });

  it('should return cache by url', () => {
    const request = new HttpRequest('GET', 'localhost');
    const requestOther = new HttpRequest('GET', 'localhost');
    const response = new HttpResponse({ body: { data: 'any' } });
    service.put(request, response);

    expect(service.get(requestOther)).toEqual(response);
  });

  it('should return cloned response from cache', () => {
    const request = new HttpRequest('GET', 'localhost');
    const requestOther = new HttpRequest('GET', 'localhost');
    const response = new HttpResponse({ body: { data: 'any' } });

    service.put(request, response);

    expect(service.get(requestOther).body).toEqual({ data: 'any' });
  });

  it('should provide clean method', () => {
    const request = new HttpRequest('GET', 'localhost');
    const response = new HttpResponse({ body: { data: 'any' } });
    service.put(request, response);
    service.clean();

    expect(service.get(request)).toBeUndefined();
  });

  it('should provide delete method', () => {
    const request1 = new HttpRequest('GET', 'localhost');
    const response1 = new HttpResponse({ body: { data: 'any' } });
    service.put(request1, response1);

    const request2 = new HttpRequest('GET', 'localhost2');
    const response2 = new HttpResponse({ body: { data: 'other' } });
    service.put(request2, response2);

    service.delete('localhost');

    expect(service.get(request1)).toBeUndefined();
    expect(service.get(request2).body).toEqual({ data: 'other' });
  });
});
