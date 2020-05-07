import { OrderState } from '@contracts/order-states';
import { orderStateMetadata } from '@contracts/master-data/order-state.class';
import { Failure, failureMetadata } from '@contracts/master-data/failure.class';

import {
  MasterDataConfig,
  MasterDataSource,
} from '../modules/master-data/config/master-data-config.service';
import { environment } from '../../environments/environment';

const config = new MasterDataConfig();

config.sources = [
  new MasterDataSource<OrderState>({
    href: 'order-states',
    endpoint: environment.endpoints.orderStates.root,
    label: {
      plural: 'Order states',
      single: 'Order state',
    },
    entityName: 'OrderState',
    metadata: orderStateMetadata,
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
  }),
];

export const masterDataConfig = config;
