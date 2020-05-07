import { Entity } from '@contracts/common';
import { Validators } from '@angular/forms';

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
  formValidators: Validators[];
  type: ObjectPropertyType;
  label: string;
}
