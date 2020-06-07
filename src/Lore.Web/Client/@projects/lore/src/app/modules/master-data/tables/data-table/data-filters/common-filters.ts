import { DataFilter, FilterType } from '../../../models/filter-metadata.class';
import {
  dataFilter,
  property,
  Operator,
} from '../../../master-data-service/filter-expression';

export const displayDeletedFilter = new DataFilter<boolean>({
  label: 'Display deleted entries',
  type: FilterType.Boolean,
  property: 'deleted',
  expressionFactory: (value) => {
    const filters = [property('deleted').equals(value)];
    if (value) {
      filters.push(property('deleted').equals(!value));
    }
    return dataFilter(Operator.Or, filters);
  },
});
