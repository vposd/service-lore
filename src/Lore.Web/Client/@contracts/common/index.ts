export class Entity {
  id: string;
}

export class DeletableEntity extends Entity {
  deleted: boolean;
}

export class AuditableEntity extends Entity {
  created: string;
  createdBy: string;
  modified: string;
  modifiedBy: string;
}

export class SimpleEntity {
  id: string;
  name?: string;
}

export class OperationResult {
  succeeded: boolean;
  errors: string[];
}

/** Request for common query */
export class QueryRequest<T extends Entity> {
  take: number;
  skip: number;
  sort: string;
  filter: string;
  search: string;
  searchColumns: (keyof T)[];
}

/** Common query result */
export class QueryResult<T extends Entity> {
  results: T[];
  count?: number;
}
