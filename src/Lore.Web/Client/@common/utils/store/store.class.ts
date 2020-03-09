import { BehaviorSubject } from 'rxjs';
import { filter, shareReplay, share } from 'rxjs/operators';
import { isEmpty } from 'lodash';

export class Store<T> {
  filterEmptyState: boolean;

  set state(value: T) {
    this.stateBroadcast.next(value);
  }

  get state() {
    return this.stateBroadcast.getValue();
  }

  get state$() {
    return this.stateBroadcast.asObservable().pipe(
      filter(state => !(this.filterEmptyState && isEmpty(state))),
      share()
    );
  }

  private readonly stateBroadcast: BehaviorSubject<T>;

  constructor(initialState: T = {} as T) {
    this.stateBroadcast = new BehaviorSubject(initialState);
  }
}
