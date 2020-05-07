import { DeletableEntity } from '@contracts/common';
import { AttributeValueType, AttributeObject } from '@contracts/enums';
import { AttributeValue } from './attribute-value.class';

export class Attribute extends DeletableEntity {
  name: string;
  type: AttributeValueType;
  objectType: AttributeObject;
  values: AttributeValue[];
}
