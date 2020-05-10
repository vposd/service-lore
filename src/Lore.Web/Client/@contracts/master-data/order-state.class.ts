import { DeletableEntity } from '@contracts/common';
import { Validators } from '@angular/forms';

import { deleted } from './common/common-properties';
import {
  ObjectPropertyMetadata,
  ObjectPropertyType,
} from './common/metadata.class';

export class OrderState extends DeletableEntity {
  id: string;
  name: string;
  color: string;
  deleted: boolean;
  sortOrder: boolean;
  isDefault: boolean;
  isFinal: boolean;
}

export const orderStateMetadata: ObjectPropertyMetadata<OrderState>[] = [
  {
    property: 'color',
    type: ObjectPropertyType.Color,
    formValidators: [
      Validators.required,
      Validators.pattern(/^#(?:[0-9a-f]{3}){1,2}$/i),
    ],
    label: 'Color',
  },
  {
    property: 'isDefault',
    type: ObjectPropertyType.Boolean,
    formValidators: [],
    label: 'Default state',
    readonly: true,
  },
  {
    property: 'isFinal',
    type: ObjectPropertyType.Boolean,
    formValidators: [],
    label: 'Final state',
    readonly: true,
  },
  {
    property: 'sortOrder',
    type: ObjectPropertyType.Number,
    formValidators: [Validators.min(1), Validators.required],
    label: 'Sort order',
  },
  {
    property: 'name',
    type: ObjectPropertyType.String,
    formValidators: [Validators.max(50)],
    label: 'Name',
  },
  deleted,
];
