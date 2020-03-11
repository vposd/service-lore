import { Pipe, PipeTransform } from '@angular/core';
import { take } from 'lodash';

@Pipe({
  name: 'limit'
})
export class LimitPipe<T> implements PipeTransform {
  transform(value: T[], length: number = 20): T[] {
    return take(value, length);
  }
}
