import { Entity } from './entity.class';

export class QueryResult<T extends Entity> {
  results: T[];
  count: number;
}
