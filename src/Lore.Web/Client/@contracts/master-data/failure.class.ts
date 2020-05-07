import { DeletableEntity } from '@contracts/common';
import { Validators } from '@angular/forms';

import {
  ObjectPropertyMetadata,
  ObjectPropertyType,
} from './common/metadata.class';
import { deleted } from './common/common-properties';

export class Failure extends DeletableEntity {
  name: string;
}

export const failureMetadata: ObjectPropertyMetadata<Failure>[] = [
  {
    property: 'name',
    type: ObjectPropertyType.String,
    formValidators: [Validators.max(50)],
    label: 'Name',
  },
  deleted,
];
