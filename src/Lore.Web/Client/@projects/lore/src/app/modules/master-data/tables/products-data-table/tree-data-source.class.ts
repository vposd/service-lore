import { BehaviorSubject, Observable, merge, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DataSource } from '@angular/cdk/table';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ListRange, CollectionViewer } from '@angular/cdk/collections';
import { MatTreeFlattener } from '@angular/material/tree';

/** Data source for virtual scroll tree data with sticky header */
export class TreeDataSource<T, F> extends DataSource<F> {
  set data(value: T[]) {
    this._data.next(value);
    this.updateData();
  }

  get data() {
    return this._data.value;
  }

  get data$() {
    return this._data.asObservable();
  }

  /** Scroll offset */
  get offset$() {
    return this._offsetChange.asObservable();
  }

  /** Emit event when filter handler updates */
  get filterChange$() {
    return this._filterChange.asObservable();
  }

  /** Set filter function for T node */
  set filter(filter: (data: T[]) => T[]) {
    this._filter = filter;
    this.updateData();
    this._filterChange.next();
  }

  private readonly _offsetChange = new BehaviorSubject(0);
  private readonly _flattenedData = new BehaviorSubject<F[]>([]);
  private readonly _expandedData = new BehaviorSubject<F[]>([]);
  private readonly _data: BehaviorSubject<T[]>;
  private readonly _filterChange = new Subject();
  private readonly _range = new BehaviorSubject<ListRange>({
    start: 0,
    end: 0,
  });
  private _filter: (data: T[]) => T[] = (data) => data;

  constructor(
    private readonly _viewport: CdkVirtualScrollViewport,
    private readonly _treeControl: FlatTreeControl<F>,
    private readonly _treeFlattener: MatTreeFlattener<T, F>,
    initialData: T[] = [],
    readonly _options: { pageSize: number; itemSize: number } = {
      pageSize: 100,
      itemSize: 32,
    }
  ) {
    super();
    this._data = new BehaviorSubject<T[]>(initialData);
    _viewport
      .elementScrolled()
      .pipe(
        map((ev) => (ev.currentTarget as HTMLElement)?.scrollTop ?? 0),
        tap((scrollTop) => {
          const start = Math.floor(scrollTop / this._options.itemSize);
          const prevExtraData = start > 5 ? 5 : 0;
          const range = {
            start: start - prevExtraData,
            end: start + (this._options.pageSize - prevExtraData),
          };
          this._range.next(range);
          const offset = this._options.itemSize * range.start;
          this._viewport.setRenderedContentOffset(offset);
          this._offsetChange.next(offset);
        })
      )
      .subscribe();
  }

  connect(collectionViewer: CollectionViewer): Observable<F[]> {
    const changes = [
      collectionViewer.viewChange,
      this._treeControl.expansionModel.changed,
      this._flattenedData,
      this._range,
      this._filterChange,
    ];
    return merge(...changes).pipe(
      map(() => {
        const expandedValueLength = this._expandedData.value.length;
        const expandedData = this._treeFlattener
          .expandFlattenedNodes(this._flattenedData.value, this._treeControl)
          .map((x, i) =>
            Object.assign(x, {
              renderInfo: { index: i, even: i % 2 === 0 },
            })
          );
        this._expandedData.next(expandedData);

        if (expandedData.length !== expandedValueLength) {
          this._viewport.setTotalContentSize(
            this._options.itemSize * this._expandedData.value.length
          );
        }

        return this._expandedData.value.slice(
          this._range.value.start,
          this._range.value.end || this._options.pageSize
        );
      })
    );
  }

  disconnect() {}

  private updateData() {
    this._flattenedData.next(
      this._treeFlattener.flattenNodes(this._filter(this.data))
    );
    this._treeControl.dataNodes = this._flattenedData.value;
    this._viewport.scrollToOffset(0);
    this._viewport.setTotalContentSize(
      this._options.itemSize * this._treeControl.dataNodes.length
    );
  }
}
