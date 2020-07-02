import {
  orderStatusMetadata,
  OrderStatus,
} from '@contracts/master-data/order-state.class';
import {
  Attribute,
  attributeMetadata,
} from '@contracts/master-data/attribute.class';
import { Failure, failureMetadata } from '@contracts/master-data/failure.class';
import {
  productMetadata,
  Product,
  ProductGroup,
  productGroupMetadata,
} from '@contracts/master-data/product.class';
import {
  attributeValueMetadata,
  AttributeValue,
} from '@contracts/master-data/attribute-value.class';

import {
  MasterDataConfig,
  MasterDataSource,
} from '../modules/master-data/config/master-data-config.service';
import { environment } from '../../environments/environment';
import { displayDeletedFilter } from '../modules/master-data/tables/data-table/data-filters/common-filters';
import {
  DataFilter,
  FilterType,
} from '../modules/master-data/models/filter-metadata.class';
import {
  dataFilter,
  Operator,
  property,
} from '../modules/master-data/master-data-service/filter-expression';
import {
  customerMetadata,
  Customer,
} from '@contracts/master-data/customer.class';

const config = new MasterDataConfig();

config.sources = [
  new MasterDataSource<OrderStatus>({
    href: 'order-states',
    endpoint: environment.endpoints.orderStatuses.root,
    label: {
      plural: 'Order statuses',
      noun: 'Order status',
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
      noun: 'Failure',
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
      noun: 'Product',
    },
    entityName: 'Product',
    metadata: productMetadata,
    filters: [displayDeletedFilter],
  }),
  new MasterDataSource<ProductGroup>({
    href: 'productGroups',
    endpoint: environment.endpoints.productGroups.root,
    label: {
      plural: 'Product groups',
      noun: 'Product group',
    },
    entityName: 'ProductGroup',
    metadata: productGroupMetadata,
    filters: [displayDeletedFilter],
  }),
  new MasterDataSource<Customer>({
    href: 'customers',
    endpoint: environment.endpoints.customers.root,
    label: {
      plural: 'Customers',
      noun: 'Customer',
    },
    entityName: 'Customer',
    metadata: customerMetadata,
    filters: [displayDeletedFilter],
  }),
  new MasterDataSource<Attribute>({
    href: 'attributes',
    endpoint: environment.endpoints.attributes.root,
    label: {
      plural: 'Attributes',
      noun: 'Attribute',
    },
    entityName: 'Attribute',
    metadata: attributeMetadata,
    filters: [displayDeletedFilter],
  }),
  new MasterDataSource<AttributeValue>({
    href: 'attributesValues',
    endpoint: environment.endpoints.attributes.values,
    label: {
      plural: 'Attributes values',
      noun: 'Attributes value',
    },
    entityName: 'AttributeValue',
    metadata: attributeValueMetadata,
    filters: [
      displayDeletedFilter,
      new DataFilter<Attribute>({
        label: 'Filter by attribute',
        type: FilterType.EntitySelection,
        sourceValuesContract: 'Attribute',
        property: 'attribute',
        expressionFactory: (value) =>
          value
            ? dataFilter().addParam(property('attribute/id').equals(value.id))
            : null,
      }),
    ],
  }),
];

export const masterDataConfig = config;
