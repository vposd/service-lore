import { DeletableEntity, SimpleEntity } from '@contracts/common';
import { Validators } from '@angular/forms';

import {
  ObjectPropertyMetadata,
  ObjectPropertyType,
} from './common/metadata.class';

export class ProductGroup extends DeletableEntity {
  name: string;
  parent: SimpleEntity;
}

export class Product extends DeletableEntity {
  name: string;
  price: number;
  description: string;
  group: ProductGroup;
}

export const productGroupMetadata: ObjectPropertyMetadata<ProductGroup>[] = [
  {
    property: 'name',
    type: ObjectPropertyType.String,
    formValidators: [Validators.maxLength(50)],
    label: 'Name',
  },
  {
    property: 'parent',
    type: ObjectPropertyType.Entity,
    formValidators: [Validators.maxLength(50)],
    sourceEntityName: 'ProductGroup',
    label: 'Parent',
  },
];

export const productMetadata: ObjectPropertyMetadata<Product>[] = [
  {
    property: 'name',
    type: ObjectPropertyType.String,
    formValidators: [Validators.maxLength(50)],
    label: 'Name',
  },
  {
    property: 'price',
    type: ObjectPropertyType.Number,
    formValidators: [Validators.min(0)],
    label: 'Price',
  },
  {
    property: 'description',
    type: ObjectPropertyType.String,
    formValidators: [Validators.maxLength(255)],
    label: 'Description',
  },
  {
    property: 'group',
    type: ObjectPropertyType.Entity,
    formValidators: [],
    sourceEntityName: 'ProductGroup',
    label: 'Group',
  },
];
