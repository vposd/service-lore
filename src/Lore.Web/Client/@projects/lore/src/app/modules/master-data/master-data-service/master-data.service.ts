import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { isArray } from 'lodash';

import { QueryResult } from '@contracts/master-data/query-result.class';
import { Entity } from '@contracts/master-data/entity.class';
import { Classifier } from '@contracts/master-data/entities/classifier.class';
import { ENABLED_CACHE_OPTIONS } from '@common/utils/http-cache/http-cache-constant';

import { environment } from '../../../../environments/environment';
import { format } from '../../../../environments/endpoints';

@Injectable({
  providedIn: 'root'
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
      params: queryParams
    });
  }

  getClassifiers(entityName: string) {
    const codeKey = `${entityName}Classifier`;
    return this.http.get<QueryResult<Classifier>>(
      format(environment.endpoints.classifiers, { codeKey }),
      ENABLED_CACHE_OPTIONS
    );
  }
}
