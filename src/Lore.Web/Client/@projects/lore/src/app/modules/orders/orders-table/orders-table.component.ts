import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { map, tap, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';

import { RequestProgress } from '@common/utils/request-progress/request-progress.class';
import {
  QueryRequestBuilder,
  SortDirection,
} from '../../master-data/master-data-service/query-request-builder.class';
import { MasterDataService } from '../../master-data/master-data-service/master-data.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { RowsAnimation } from '../../master-data/data-table/data-table-animations';
import { OrdersService } from '../orders.service';
import { OrderTableRow } from '../models/order-table-row';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
  animations: [RowsAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersTableComponent implements OnInit, OnDestroy {
  columns = ['id', 'statusId', 'customerName', 'deviceName'];
  displayedColumns = this.columns;
  dataSource: MatTableDataSource<OrderTableRow>;
  selectionModel: SelectionModel<string>;
  requestProgress = new RequestProgress();
  paginator: MatPaginator;

  private initialized = false;
  private readonly destroy$ = new Subject();

  get isAllSelected() {
    return this.selectionModel.selected.length === this.dataSource.data.length;
  }

  get tableHidden() {
    return (
      !this.initialized ||
      this.requestProgress.state.empty ||
      this.requestProgress.state.error
    );
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    cdr: ChangeDetectorRef,
    private readonly masterData: MasterDataService,
    private readonly orders: OrdersService
  ) {
    this.paginator = new MatPaginator(new MatPaginatorIntl(), cdr, {});
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.selectionModel = new SelectionModel<string>(true, []);
    this.listenTableInteraction();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addEntry() {}

  selectRow(row: OrderTableRow) {
    this.selectionModel.toggle(row.id);
  }

  private listenTableInteraction() {
    this.requestProgress.start();

    const query = new QueryRequestBuilder();
    const pagination = this.paginator.page.pipe(
      map(
        ({ pageSize, pageIndex }) =>
          query.setPageSize(pageSize).setPage(pageIndex).request
      )
    );

    const sort = this.sort.sortChange.pipe(
      tap(() => (this.paginator.pageIndex = 0)),
      map(
        ({ active, direction }) =>
          query.setPage(0).sort(active, direction as SortDirection).request
      )
    );

    merge(pagination, sort)
      .pipe(
        tap(() => this.requestProgress.start()),
        startWith(query.request),
        switchMap((request) => this.orders.getOrders(request)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        ({ results, count }) => {
          this.initialized = true;
          this.paginator.length = count;
          this.dataSource.data = results;
          this.requestProgress.stop(!count);
        },
        () => {
          this.initialized = true;
          this.requestProgress.stop(true);
        }
      );
  }
}