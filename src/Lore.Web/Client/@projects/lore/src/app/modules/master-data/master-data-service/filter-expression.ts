import { isNil } from 'lodash';

enum Operator {
  And = 'and',
  Or = 'or'
}

enum PropertyOperator {
  Equals = 'eq',
  NotEquals = 'ne',
  GreaterThan = 'ne',
  GreaterThanOrEqual = 'ge',
  LessThan = 'lt',
  LessThanOrEqual = 'le'
}

export class PropertyExpression {
  get propertyPath() {
    return this.path.replace('.', '/');
  }

  operator: Operator;
  expression: string;
  next: PropertyExpression;

  constructor(private readonly path: string) {}

  toString() {
    return this.expression ? `${this.propertyPath} ${this.expression}` : '';
  }

  toExpressionString() {
    return this.operator
      ? `${this.propertyPath} ${this.expression} ${this.operator}`
      : `${this.propertyPath} ${this.expression}`;
  }

  equals(value: string | number) {
    return this.makeExpression(PropertyOperator.Equals, value);
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
  private head: PropertyExpression;
  private tail: PropertyExpression;

  isEmpty = () => !this.head;

  and(property: PropertyExpression) {
    this.concat(Operator.And, property);
    return this;
  }

  or(property: PropertyExpression) {
    this.concat(Operator.Or, property);
    return this;
  }

  toString() {
    let output = '';
    let head = this.head;
    while (head) {
      output += ` ${head.toExpressionString()}`;
      head = head.next;
    }
    return output;
  }

  private concat(operator: Operator, property: PropertyExpression) {
    if (this.isEmpty()) {
      this.head = property;
      this.tail = property;
      return this;
    }
    this.tail.operator = operator;
    this.tail.next = property;
    this.tail = property;
  }
}
