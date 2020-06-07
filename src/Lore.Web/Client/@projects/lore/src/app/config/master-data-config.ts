import {
  orderStatusMetadata,
  OrderStatus,
} from '@contracts/master-data/order-state.class';
import { Failure, failureMetadata } from '@contracts/master-data/failure.class';
import {
  productMetadata,
  Product,
  ProductGroup,
  productGroupMetadata,
} from '@contracts/master-data/product.class';

import {
  MasterDataConfig,
  MasterDataSource,
} from '../modules/master-data/config/master-data-config.service';
import { environment } from '../../environments/environment';
import { displayDeletedFilter } from '../modules/master-data/tables/data-table/data-filters/common-filters';

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
  new MasterDataSource<Product>({
    href: 'products',
    endpoint: environment.endpoints.products.root,
    label: {
      plural: 'Products',
      single: 'Product',
    },
    entityName: 'Product',
    metadata: productMetadata,
    filters: [displayDeletedFilter],
  }),
  new MasterDataSource<ProductGroup>({
    href: 'products',
    endpoint: environment.endpoints.productGroups.root,
    label: {
      plural: 'Product groups',
      single: 'Product group',
    },
    entityName: 'ProductGroup',
    metadata: productGroupMetadata,
    filters: [displayDeletedFilter],
  }),
];

export const masterDataConfig = config;
