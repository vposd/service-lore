import { Observable } from 'rxjs';

export interface RetrieveDataStrategy<T> {
  getData(query: string): Observable<T[]>;
  onDestroy(): void;
}
