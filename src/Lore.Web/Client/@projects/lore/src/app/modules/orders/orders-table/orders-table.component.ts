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
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { map, tap, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { chain, first, uniq } from 'lodash';
import { merge, Subject, of } from 'rxjs';

import { RequestProgress } from '@common/utils/request-progress/request-progress.class';
import { Attribute } from '@contracts/orders';
import { OrderStatusUpdatedEvent } from '@contracts/events/order-state-updated.class';
import {
  NotificationHub,
  listenEvent,
} from '@common/utils/notifications/notification-bus.service';

import {
  QueryRequestBuilder,
  SortDirection,
} from '../../master-data/master-data-service/query-request-builder.class';
import { MasterDataService } from '../../master-data/master-data-service/master-data.service';
import { OrdersService } from '../orders.service';
import { OrderTableRow, AttributeModel } from '../models/order-table-row';
import { ProcessAction } from '../../master-data/models/process-action.enum';
import { RowsAnimation } from '../../master-data/tables/data-table/data-table-animations';

const groupAttributes = (attrs: Attribute[][]): AttributeModel[] =>
  chain(attrs)
    .flatten()
    .groupBy((x) => x.id)
    .map((x) => ({
      id: first(x).id,
      name: first(x).name,
      values: x.map((v) => v.value),
    }))
    .value();

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
  animations: [RowsAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersTableComponent implements OnInit, OnDestroy {
  columns = ['id', 'statusId', 'customerName', 'deviceName', 'actions'];
  deviceAttrs: AttributeModel[];
  orderDeviceAttrs: AttributeModel[];
  displayedColumns = this.columns;
  dataSource: MatTableDataSource<OrderTableRow>;
  selectionModel: SelectionModel<string>;
  requestProgress = new RequestProgress();
  paginator: MatPaginator;

  private initialized = false;
  private readonly destroy$ = new Subject();
  readonly processActionEnum = ProcessAction;

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
    private readonly cdr: ChangeDetectorRef,
    private readonly masterData: MasterDataService,
    private readonly notifications: NotificationHub,
    private readonly orders: OrdersService
  ) {
    this.paginator = new MatPaginator(new MatPaginatorIntl(), cdr, {});
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.selectionModel = new SelectionModel<string>(true, []);
    this.listenTableInteraction();

    this.notifications.events$
      .pipe(
        listenEvent<OrderStatusUpdatedEvent>('OrderStatusUpdatedEvent'),
        switchMap((x) => {
          const order = this.dataSource.data.find((e) => x.payload.orderId);
          if (!order) {
            return of();
          }
          return this.orders.getOrderStatus(x.payload.stateId).pipe(
            tap(
              (status) =>
                (this.dataSource.data = this.dataSource.data.map((v) =>
                  v.id === x.payload.orderId
                    ? {
                        ...v,
                        statusId: x.payload.stateId,
                        status,
                      }
                    : v
                ))
            )
          );
        })
      )
      .subscribe();
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

          this.deviceAttrs = groupAttributes(
            results.map((x) => x.device.attributes)
          );
          const deviceAttrsColumns = this.deviceAttrs.map((x) => x.name);
          this.displayedColumns = uniq([
            ...this.displayedColumns.filter((x) => x !== 'actions'),
            ...deviceAttrsColumns,
            'actions',
          ]);

          this.dataSource.data = results.map((x) => ({
            ...x,
            attributes: x.device.attributes.reduce(
              (acc, i) => (
                (acc[i.name] = [...(acc[i.name] || []), i.value]), acc
              ),
              {}
            ),
          }));

          console.log(this.dataSource.data);
          this.requestProgress.stop(!count);
        },
        () => {
          this.initialized = true;
          this.requestProgress.stop(true);
        }
      );
  }
}
