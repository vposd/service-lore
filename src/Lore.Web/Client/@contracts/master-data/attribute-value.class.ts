import { DeletableEntity, SimpleEntity } from '@contracts/common';
import { Validators } from '@angular/forms';

import {
  ObjectPropertyMetadata,
  ObjectPropertyType,
} from './common/metadata.class';

export class AttributeValue extends DeletableEntity {
  attribute: SimpleEntity;
  value: string;
  isDefault: boolean;
}

export const attributeValueMetadata: ObjectPropertyMetadata<
  AttributeValue
>[] = [
  {
    property: 'attribute',
    type: ObjectPropertyType.Entity,
    sourceEntityName: 'Attribute',
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
];
