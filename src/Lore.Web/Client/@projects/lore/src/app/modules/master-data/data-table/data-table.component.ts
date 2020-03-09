import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ContentChild,
  QueryList,
  ViewChildren
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Subject, merge } from 'rxjs';
import { isEmpty } from 'lodash/fp';
import { map, tap, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Entity } from '@contracts/master-data/entity.class';
import { InformationService } from '@common/information/information.service';
import { RequestProgress } from '@common/utils/request-progress/request-progress.class';
import {
  getColumnsKeys,
  getColumns
} from '@common/utils/decorators/column.decorator';

import { MasterDataSource } from '../config/master-data-config.service';
import { RowsAnimation, DetailExpanded } from './data-table-animations';
import { MasterDataService } from '../master-data-service/master-data.service';
import {
  QueryRequestBuilder,
  SortDirection
} from '../master-data-service/query-request-builder.class';
import { ExpandableRowDirective } from './expandable-row/expandable-row.directive';

class TableColumn {
  key: string;
  name: string;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  animations: [RowsAnimation, DetailExpanded],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent<T extends Entity> implements OnInit, OnDestroy {
  @Input()
  set sourceParams(params: MasterDataSource<T>) {
    if (!params) {
      throw new Error('[DataTableComponent]: Missing source params');
    }

    this.initialized = false;
    this._sourceParams = params;
    this.dataSource = new MatTableDataSource([]);
    this.displayedColumns = getColumnsKeys(params.entity);
    this.columns = Array.from(getColumns(params.entity)).map(([key, name]) => ({
      key,
      name
    }));

    this.destroy$.next();
    this.listenTableInteraction();
  }
  get sourceParams() {
    return this._sourceParams;
  }

  @Input()
  set selected(selected: string[]) {
    if (isEmpty(selected)) {
      return;
    }
    this._selected = selected;
  }

  @Input() selectable = false;
  @Input() expandable = false;
  @Input() multipleSelection = true;

  requestProgress = new RequestProgress();
  displayedColumns: string[];
  columns: TableColumn[];
  dataSource: MatTableDataSource<T>;
  selectionModel: SelectionModel<string>;
  initialized = false;
  expandedRowId: string;

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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ContentChild(ExpandableRowDirective) expandableRow: ExpandableRowDirective;

  private _sourceParams: MasterDataSource<T>;
  private _selected: string[];
  private readonly destroy$ = new Subject();

  constructor(
    private readonly masterData: MasterDataService,
    private readonly information: InformationService
  ) {}

  ngOnInit() {
    if (this.selectable && this.multipleSelection) {
      this.displayedColumns.unshift('actions');
    }
    this.selectionModel = new SelectionModel<string>(
      this.multipleSelection,
      this._selected
    );
    this.paginator.pageSize = QueryRequestBuilder.PageSizeDefault;
    this.paginator.pageSizeOptions = [30, 50, 100];
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectRow(row: T) {
    if (this.expandable) {
      this.expandedRowId = this.expandedRowId === row.id ? null : row.id;
    }
    if (this.selectable) {
      this.selectionModel.toggle(row.id);
    }
  }

  masterToggle() {
    this.isAllSelected
      ? this.selectionModel.clear()
      : this.dataSource.data.forEach(row => this.selectionModel.select(row.id));
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
        switchMap(request =>
          this.masterData.query<T>(this._sourceParams.endpoint, request)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(
        ({ results, count }) => {
          this.initialized = true;
          this.paginator.length = count;
          this.dataSource.data = results;
          this.requestProgress.stop(!count);
        },
        error => {
          this.initialized = true;
          this.requestProgress.stop(true);
          this.information.error(RequestProgress.formatError(error));
        }
      );
  }
}
