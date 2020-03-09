import { Entity } from '@contracts/master-data/entity.class';

export class MasterDataSource<T extends Entity> {
  href: string;
  label: {
    plural: string;
    single: string;
  };
  endpoint: string;
  entity: T;
  entityName: string;

  constructor(config: Partial<MasterDataSource<T>>) {
    Object.assign(this, config);
  }
}

export class MasterDataConfig {
  sources: MasterDataSource<any>[];

  getSource(source: string) {
    return this.sources.find(s => s.href.includes(source));
  }
}
