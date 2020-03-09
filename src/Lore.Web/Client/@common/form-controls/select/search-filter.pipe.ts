import { Pipe, PipeTransform } from '@angular/core';
import { property } from 'lodash';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], propPath: string, query: string) {
    if (!query) {
      return items;
    }
    return items.filter(item =>
      ((property(propPath)(item) as string) || '')
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }
}
