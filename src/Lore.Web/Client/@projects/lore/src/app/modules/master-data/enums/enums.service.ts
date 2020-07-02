import { Injectable } from '@angular/core';
import { SimpleEntity } from '@contracts/common';

export abstract class EnumsValues {
  [enumName: string]: SimpleEntity[];
}

@Injectable({
  providedIn: 'root',
})
export class EnumsService {
  constructor(private readonly values: EnumsValues) {}

  getValues(enumName: string) {
    return this.values[enumName];
  }
}
