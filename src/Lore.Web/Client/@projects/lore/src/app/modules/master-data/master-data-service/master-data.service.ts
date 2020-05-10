import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ENABLED_CACHE_OPTIONS } from '@common/utils/http-cache/http-cache-constant';
import { Entity, QueryResult, OperationResult } from '@contracts/common';

@Injectable({
  providedIn: 'root',
})
export class MasterDataService {
  constructor(private readonly http: HttpClient) {}

  query<T extends Entity>(
    endpoint: string,
    queryParams: HttpParams,
    cache = false
  ) {
    return this.http.get<QueryResult<T>>(endpoint, {
      ...(cache ? ENABLED_CACHE_OPTIONS : {}),
      params: queryParams,
    });
  }

  update<T extends Entity>(endpoint: string, item: T) {
    return this.http.patch<OperationResult>(endpoint, item);
  }

  create<T extends Entity>(endpoint: string, item: T) {
    return this.http.post<OperationResult>(endpoint, item);
  }
}
