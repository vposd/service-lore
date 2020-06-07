import { DeletableEntity, SimpleEntity } from '@contracts/common';
import { Validators } from '@angular/forms';

import {
  ObjectPropertyMetadata,
  ObjectPropertyType,
} from './common/metadata.class';
import { deleted } from './common/common-properties';

export class AttributeValue extends DeletableEntity {
  name: string;
  attribute: SimpleEntity;
  value: string;
  isDefault: boolean;
}

export const attributeValueMetadata: ObjectPropertyMetadata<
  AttributeValue
>[] = [
  {
    property: 'name',
    type: ObjectPropertyType.String,
    formValidators: [Validators.max(50)],
    label: 'Name',
  },
  {
    property: 'attribute',
    type: ObjectPropertyType.Entity,
    formValidators: [Validators.required],
    label: 'Attribute',
  },
  {
    property: 'value',
    type: ObjectPropertyType.String,
    formValidators: [Validators.required],
    label: 'Value',
  },
  {
    property: 'isDefault',
    type: ObjectPropertyType.Boolean,
    formValidators: [],
    label: 'Default value',
  },
  deleted,
];
