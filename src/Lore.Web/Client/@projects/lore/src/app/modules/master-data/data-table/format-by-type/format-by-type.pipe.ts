import { Pipe, PipeTransform, Type } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
  DataType,
  getDataType,
} from '@common/utils/decorators/data-type.decorator';
import { SimpleEntity } from '@contracts/common';

@Pipe({
  name: 'formatByType',
})
export class FormatByTypePile implements PipeTransform {
  private readonly datePipe = new DatePipe('ru');

  transform(value: any, classRef: Type<any>, propertyName: string): string {
    const { type } = getDataType(classRef, propertyName) || {
      type: DataType.String,
    };
    switch (type) {
      case DataType.Date:
        return this.formatDate(value);

      case DataType.DateTime:
        return this.formatDateTime(value);

      case DataType.Entity:
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
