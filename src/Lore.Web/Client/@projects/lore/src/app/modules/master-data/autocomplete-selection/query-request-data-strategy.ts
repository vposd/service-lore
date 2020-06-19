import { map } from 'rxjs/operators';

import { Entity } from '@contracts/common';

import { MasterDataService } from '../master-data-service/master-data.service';
import { MasterDataSource } from '../config/master-data-config.service';
import { QueryRequestBuilder } from '../master-data-service/query-request-builder.class';
import { property } from '../master-data-service/filter-expression';
import { RetrieveDataStrategy } from './retrieve-data-strategy';

export class QueryRequestDataStrategy<T extends Entity>
  implements RetrieveDataStrategy<T> {
  constructor(
    private readonly masterData: MasterDataService,
    private sourceParams: MasterDataSource<T>,
    private viewValue: string
  ) {}

  getData(query: string) {
    const builder = query
      ? new QueryRequestBuilder().setFilter(
          property(this.viewValue).contains(query)
        )
      : new QueryRequestBuilder();
    const request = builder.setPageSize(20).request;
    return this.masterData
      .query<T>(this.sourceParams.endpoint, request)
      .pipe(map(({ results }) => results));
  }

  onDestroy() {}
}
