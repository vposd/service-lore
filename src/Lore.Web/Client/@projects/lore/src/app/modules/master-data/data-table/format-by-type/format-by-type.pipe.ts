import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SimpleEntity, Entity } from '@contracts/common';
import {
  ObjectPropertyMetadata,
  ObjectPropertyType,
} from '@contracts/master-data/common/metadata.class';

@Pipe({
  name: 'formatByType',
})
export class FormatByTypePile implements PipeTransform {
  private readonly datePipe = new DatePipe('ru');

  transform(
    value: any,
    objectMetadata: ObjectPropertyMetadata<Entity>[],
    propertyName: string
  ): string {
    const propertyMetadata = (objectMetadata || []).find(
      (x) => x.property === propertyName
    );

    if (!propertyMetadata) {
      return value;
    }

    const { type } = propertyMetadata;

    switch (type) {
      case ObjectPropertyType.Boolean:
        return this.formatBoolean(value);

      case ObjectPropertyType.Date:
        return this.formatDate(value);

      case ObjectPropertyType.DateTime:
        return this.formatDateTime(value);

      case ObjectPropertyType.Entity:
        return this.formatEntity(value);

      default:
        return value;
    }
  }

  private formatDate(input: string) {
    try {
      return this.datePipe.transform(input, 'dd.MM.yyyy');
    } catch (e) {
      return '';
    }
  }

  private formatBoolean(input: boolean) {
    return input ? 'Yes' : 'No';
  }

  private formatDateTime(input: string) {
    try {
      return this.datePipe.transform(input, 'dd.MM.yyyy hh:ss:mm');
    } catch (e) {
      return '';
    }
  }

  private formatEntity(input: SimpleEntity) {
    return input ? input.name : '';
  }
}
