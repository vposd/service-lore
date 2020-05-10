import { Entity } from '@contracts/common';
import { ValidatorFn } from '@angular/forms';

export enum ObjectPropertyType {
  String,
  Boolean,
  Number,
  Color,
  Date,
  DateTime,
  Entity,
}

export class ObjectPropertyMetadata<T extends Entity> {
  property: keyof T;
  formValidators: ValidatorFn[];
  type: ObjectPropertyType;
  label: string;
  readonly?: boolean;
}
