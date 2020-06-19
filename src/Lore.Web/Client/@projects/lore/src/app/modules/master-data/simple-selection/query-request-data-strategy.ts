import { of } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Entity } from '@contracts/common';
import { HttpCacheService } from '@common/utils/http-cache/http-cache-service/http-cache.service';
import { RequestProgress } from '@common/utils/request-progress/request-progress.class';

import { MasterDataService } from '../master-data-service/master-data.service';
import { MasterDataSource } from '../config/master-data-config.service';
import { QueryRequestBuilder } from '../master-data-service/query-request-builder.class';
import { RetrieveDataStrategy } from './retrieve-data-strategy';
import {
  dataFilter,
  property,
  Operator,
} from '../master-data-service/filter-expression';

export class QueryRequestDataStrategy<T extends Entity>
  implements RetrieveDataStrategy<T> {
  constructor(
    private readonly masterData: MasterDataService,
    private readonly httpCache: HttpCacheService,
    private filterExpression = dataFilter(),
    private ignorePagination: boolean,
    private sourceParams: MasterDataSource<T>,
    private requestProgress: RequestProgress
  ) {}

  getData() {
    if (!this.sourceParams) {
      this.requestProgress.stop(true);
      return of([]);
    }

    const useCache = true;
    const query = new QueryRequestBuilder()
      .setFilter(
        dataFilter(Operator.And, [property('deleted').equals(false)]).toString()
      )
      .setFilter(this.filterExpression.toString());

    if (this.ignorePagination) {
      query.setPageSize(Infinity);
    }

    return this.masterData
      .query<T>(this.sourceParams.endpoint, query.request, useCache)
      .pipe(pluck('results'));
  }

  onDestroy() {
    this.httpCache.delete(this.sourceParams.endpoint);
  }
}
