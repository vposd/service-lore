import { DeletableEntity } from '@contracts/common';

export class OrderState extends DeletableEntity {
  name: string;
  color: string;
  isDefault: boolean;
}
