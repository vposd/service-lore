import { FilterExpression } from '../master-data-service/filter-expression';

export type ExpressionFactory<T> = (value: T) => FilterExpression;
export enum FilterType {
  Boolean,
  String,
  EntitySelection,
}

export class DataFilter<TValue> {
  label: string;
  property: string;
  type: FilterType;
  sourceValuesContract?: string;
  expressionFactory: ExpressionFactory<TValue>;

  constructor(options?: DataFilter<TValue>) {
    Object.assign(this, options || {});
  }
}
