import { of } from 'rxjs';
import { Entity } from '@contracts/common';

import { RetrieveDataStrategy } from './retrieve-data-strategy';

export class DefinedValuesDataStrategy<T extends Entity>
  implements RetrieveDataStrategy<T> {
  constructor(private readonly values: T[]) {}

  getData() {
    return of(this.values);
  }

  onDestroy() {}
}
