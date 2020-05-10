import { Entity } from '@contracts/common';
import { ObjectPropertyMetadata } from '@contracts/master-data/common/metadata.class';

export class MasterDataSource<T extends Entity> {
  href: string;
  label: {
    plural: string;
    single: string;
  };
  endpoint: string;
  entityName: string;
  metadata: ObjectPropertyMetadata<T>[];

  constructor(config: Partial<MasterDataSource<T>>) {
    Object.assign(this, config);
  }
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
