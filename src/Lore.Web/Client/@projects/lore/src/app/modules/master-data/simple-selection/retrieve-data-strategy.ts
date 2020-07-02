import { Observable } from 'rxjs';

export interface RetrieveDataStrategy<T> {
  getData(): Observable<T[]>;
  onDestroy(): void;
}
