import { DeletableEntity } from '@contracts/common';
import { Validators } from '@angular/forms';
import { AttributeValueType, AttributeObject } from '@contracts/enums';

import { AttributeValue } from './attribute-value.class';
import {
  ObjectPropertyMetadata,
  ObjectPropertyType,
} from './common/metadata.class';

export class Attribute extends DeletableEntity {
  name: string;
  type: AttributeValueType;
  objectType: AttributeObject;
}

export const attributeMetadata: ObjectPropertyMetadata<Attribute>[] = [
  {
    property: 'name',
    type: ObjectPropertyType.String,
    formValidators: [Validators.max(50)],
    label: 'Name',
  },
  {
    property: 'type',
    type: ObjectPropertyType.Enum,
    enumName: 'AttributeValueType',
    formValidators: [],
    label: 'Type',
  },
  {
    property: 'objectType',
    type: ObjectPropertyType.Enum,
    enumName: 'AttributeObject',
    formValidators: [],
    label: 'Object type',
  },
];
