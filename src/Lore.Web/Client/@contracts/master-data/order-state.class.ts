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
  isDefault: boolean;
}

export const orderStateMetadata: ObjectPropertyMetadata<OrderState>[] = [
  {
    property: 'color',
    type: ObjectPropertyType.Color,
    formValidators: [Validators.required],
    label: 'Color',
  },
  {
    property: 'isDefault',
    type: ObjectPropertyType.Boolean,
    formValidators: [],
    label: 'Default',
  },
  {
    property: 'name',
    type: ObjectPropertyType.String,
    formValidators: [Validators.max(50)],
    label: 'Name',
  },
  deleted,
];
