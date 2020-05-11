import {
  orderStatusMetadata,
  OrderStatus,
} from '@contracts/master-data/order-state.class';
import { Failure, failureMetadata } from '@contracts/master-data/failure.class';

import {
  MasterDataConfig,
  MasterDataSource,
} from '../modules/master-data/config/master-data-config.service';
import { environment } from '../../environments/environment';
import { displayDeletedFilter } from '../modules/master-data/data-table/data-filters/common-filters';

const config = new MasterDataConfig();

config.sources = [
  new MasterDataSource<OrderStatus>({
    href: 'order-states',
    endpoint: environment.endpoints.orderStatuses.root,
    label: {
      plural: 'Order statuses',
      single: 'Order status',
    },
    entityName: 'OrderStatus',
    metadata: orderStatusMetadata,
    filters: [displayDeletedFilter],
  }),
  new MasterDataSource<Failure>({
    href: 'failures',
    endpoint: environment.endpoints.failures.root,
    label: {
      plural: 'Failures',
      single: 'Failure',
    },
    entityName: 'Failure',
    metadata: failureMetadata,
    filters: [displayDeletedFilter],
  }),
];

export const masterDataConfig = config;
