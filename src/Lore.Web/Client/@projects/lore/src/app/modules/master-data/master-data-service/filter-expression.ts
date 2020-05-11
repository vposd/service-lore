import { isNil } from 'lodash';

export enum Operator {
  And = 'and',
  Or = 'or',
}

enum PropertyOperator {
  Equals = 'eq',
  NotEquals = 'ne',
  GreaterThan = 'gt',
  GreaterThanOrEqual = 'ge',
  LessThan = 'lt',
  LessThanOrEqual = 'le',
}

export class PropertyExpression {
  get propertyPath() {
    return this.path.replace('.', '/');
  }

  expression: string;

  constructor(private readonly path: string) {}

  toString() {
    return this.expression ? `${this.propertyPath} ${this.expression}` : '';
  }

  equals(value: string | number | boolean) {
    return this.makeExpression(PropertyOperator.Equals, value as string);
  }

  notEquals(value: string | number) {
    return this.makeExpression(PropertyOperator.NotEquals, value);
  }

  greaterThan(value: string | number) {
    return this.makeExpression(PropertyOperator.GreaterThan, value);
  }

  greaterThanOrEqual(value: string | number) {
    return this.makeExpression(PropertyOperator.GreaterThanOrEqual, value);
  }

  lessThan(value: string | number) {
    return this.makeExpression(PropertyOperator.LessThan, value);
  }

  lessThanOrEqual(value: string | number) {
    return this.makeExpression(PropertyOperator.LessThanOrEqual, value);
  }

  private makeExpression(operator: PropertyOperator, value: string | number) {
    this.expression = isNil(value) ? '' : `${operator} ${value}`;
    return this;
  }
}

export class FilterExpression {
  private _operator: Operator;
  private _params: (FilterExpression | PropertyExpression)[] = [];

  constructor(
    operator?: Operator,
    params?: (FilterExpression | PropertyExpression)[]
  ) {
    if (operator) {
      this._operator = operator;
    }
    if (params) {
      this._params = params;
    }
  }

  addParam(p: FilterExpression | PropertyExpression) {
    this._params.push(p);
    return this;
  }

  setParams(p: (FilterExpression | PropertyExpression)[]) {
    this._params = p;
    return this;
  }

  setOperator(o: Operator) {
    this._operator = o;
    return this;
  }

  toString() {
    return this._params
      .map((x) => x.toString())
      .join(' ' + this._operator + ' ');
  }
}

export const property = (path: string) => new PropertyExpression(path);
export const dataFilter = (
  o?: Operator,
  p?: (FilterExpression | PropertyExpression)[]
) => new FilterExpression(o, p);
