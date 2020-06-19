import { DeletableEntity } from '@contracts/common';

import {
  ObjectPropertyMetadata,
  ObjectPropertyType,
} from './common/metadata.class';
import { Validators } from '@angular/forms';

export class Customer extends DeletableEntity {
  name: string;
  phone: string;
}

export const customerMetadata: ObjectPropertyMetadata<Customer>[] = [
  {
    property: 'name',
    type: ObjectPropertyType.String,
    formValidators: [Validators.maxLength(50)],
    label: 'Name',
  },
  {
    property: 'phone',
    type: ObjectPropertyType.String,
    formValidators: [Validators.maxLength(50)],
    label: 'phone',
  },
];
