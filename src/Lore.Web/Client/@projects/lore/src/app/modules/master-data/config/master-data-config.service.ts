import { Entity } from '@contracts/common';
import { ObjectPropertyMetadata } from '@contracts/master-data/common/metadata.class';

import { DataFilter } from '../models/filter-metadata.class';
import { makeHref } from '../../../../environments/endpoints';

export class MasterDataSource<T extends Entity> {
  href: string;
  label: {
    plural: string;
    noun: string;
  };
  endpoint: string;
  entityName: string;
  metadata: ObjectPropertyMetadata<T>[];
  filters: DataFilter<any>[];

  constructor(config: Partial<MasterDataSource<T>>) {
    Object.assign(this, config);
  }

  makeEndpoint = (params?: { [key: string]: unknown }) =>
    makeHref(this.endpoint, { ...(params || {}) });
}

export class MasterDataConfig {
  sources: MasterDataSource<any>[];

  getSource(entityName: string) {
    return this.sources.find((s) => s.entityName === entityName);
  }

  getSourceByHref(href: string) {
    return this.sources.find((s) => s.href.includes(href));
  }
}
