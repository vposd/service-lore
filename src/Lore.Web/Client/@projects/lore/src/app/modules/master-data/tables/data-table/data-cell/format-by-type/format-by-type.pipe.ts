import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import { SimpleEntity, Entity } from '@contracts/common';
import {
  ObjectPropertyMetadata,
  ObjectPropertyType,
} from '@contracts/master-data/common/metadata.class';

import { EnumsService } from '../../../../enums/enums.service';

@Pipe({
  name: 'formatByType',
})
export class FormatByTypePipe implements PipeTransform {
  private readonly datePipe = new DatePipe('ru');

  constructor(private readonly enums: EnumsService) {}

  transform(
    value: string | number | boolean | SimpleEntity,
    propertyMetadata: ObjectPropertyMetadata<Entity>
  ): string {
    if (!propertyMetadata) {
      return '';
    }
    const { type } = propertyMetadata;

    switch (type) {
      case ObjectPropertyType.Boolean:
        return this.formatBoolean(value as boolean);

      case ObjectPropertyType.Enum:
        return this.formatEnum(propertyMetadata.enumName, value as string);

      case ObjectPropertyType.Date:
        return this.formatDate(value as string);

      case ObjectPropertyType.DateTime:
        return this.formatDateTime(value as string);

      case ObjectPropertyType.Entity:
        return this.formatEntity(value as SimpleEntity);

      default:
        return value as string;
    }
  }

  private formatEnum(entityName: string, input: string) {
    return this.enums.getValues(entityName).find((x) => x.id === input).name;
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
