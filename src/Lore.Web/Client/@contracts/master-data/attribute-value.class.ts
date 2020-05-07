import { DeletableEntity } from '@contracts/common';

export class AttributeValue extends DeletableEntity {
  name: string;
  attributeId: string;
  value: string;
  isDefault: boolean;
}
