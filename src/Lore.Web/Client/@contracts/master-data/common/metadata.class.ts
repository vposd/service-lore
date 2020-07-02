import { Entity } from '@contracts/common';
import { ValidatorFn } from '@angular/forms';

export enum ObjectPropertyType {
  Boolean,
  Color,
  Date,
  DateTime,
  Entity,
  Enum,
  Number,
  String,
}

export class ObjectPropertyMetadata<T extends Entity> {
  property: keyof T;
  formValidators: ValidatorFn[];
  type: ObjectPropertyType;
  sourceEntityName?: string;
  enumName?: string;
  label: string;
  readonly?: boolean;
}
