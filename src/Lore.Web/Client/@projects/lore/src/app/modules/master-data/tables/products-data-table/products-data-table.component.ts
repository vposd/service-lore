import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ContentChild,
  OnDestroy,
} from '@angular/core';
import { Subject, merge, forkJoin, combineLatest } from 'rxjs';
import {
  take,
  map,
  tap,
  startWith,
  switchMap,
  takeUntil,
  mergeMap,
  combineAll,
} from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { isEmpty, omit, cloneDeep } from 'lodash';
import { MatSort } from '@angular/material/sort';
import {
  CdkVirtualScrollViewport,
  VIRTUAL_SCROLL_STRATEGY,
} from '@angular/cdk/scrolling';

import { ObjectPropertyType } from '@contracts/master-data/common/metadata.class';
import { RequestProgress } from '@common/utils/request-progress/request-progress.class';
import { MatPaginator } from '@angular/material/paginator';
import { InformationService } from '@common/information/information.service';
import { OperationResult } from '@contracts/common';
import { Product, ProductGroup } from '@contracts/master-data/product.class';

import {
  MasterDataSource,
  MasterDataConfig,
} from '../../config/master-data-config.service';
import { MasterDataService } from '../../master-data-service/master-data.service';
import { ExpandableRowDirective } from '../data-table/expandable-row/expandable-row.directive';
import { ProcessAction } from '../../models/process-action.enum';
import {
  FilterExpression,
  dataFilter,
  Operator,
} from '../../master-data-service/filter-expression';
import {
  QueryRequestBuilder,
  SortDirection,
} from '../../master-data-service/query-request-builder.class';
import { TreeDataSource } from './tree-data-source.class';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  ProductFlattenNode,
  getNodeLevel,
  getIsNodeExpandable,
  ProductNode,
  createTreeFlattener,
  ProductNodeType,
  ProductNodeBase,
  makeNodes,
  makeTree,
} from './tree-util';
import { TreeGridScrollStrategy } from './tree-grid-scroll-strategy.class';
import {
  RowsAnimation,
  DetailExpanded,
} from '../data-table/data-table-animations';

class TableColumn {
  key: string;
  name: string;
}

@Component({
  selector: 'app-products-data-table',
  templateUrl: './products-data-table.component.html',
  styleUrls: [
    './products-data-table.component.scss',
    '../data-table/data-table.component.scss',
  ],
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useClass: TreeGridScrollStrategy,
    },
  ],
  animations: [RowsAnimation, DetailExpanded],
})
export class ProductsDataTableComponent implements OnInit, OnDestroy {
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

  productSource: MasterDataSource<Product>;
  productGroupSource: MasterDataSource<Product>;
  displayedColumns: string[];
  columns: TableColumn[];
  dataSource: TreeDataSource<ProductNode, ProductFlattenNode>;
  selectionModel: SelectionModel<string>;
  initialized = false;
  expandedRowId: string;
  nodeType = ProductNodeType;
  skuFetchProgress = new RequestProgress();

  readonly processType = ProcessAction;
  readonly dataType = ObjectPropertyType;
  readonly requestProgress = new RequestProgress();
  readonly treeControl: FlatTreeControl<
    ProductFlattenNode
  > = new FlatTreeControl<ProductFlattenNode>(
    getNodeLevel,
    getIsNodeExpandable
  );

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
  @ContentChild(ExpandableRowDirective) expandableRow: ExpandableRowDirective;
  @ViewChild(CdkVirtualScrollViewport, { static: true })
  viewport: CdkVirtualScrollViewport;

  private _selected: string[];
  private readonly destroy$ = new Subject();
  private readonly operationSuccess$ = new Subject();
  private readonly filtersChange$ = new Subject<FilterExpression[]>();

  constructor(
    private readonly masterData: MasterDataService,
    private readonly masterDataConfig: MasterDataConfig,
    private readonly information: InformationService
  ) {}

  ngOnInit() {
    this.initSources();

    if (this.selectable && this.multipleSelection) {
      this.displayedColumns.unshift('actions');
    }
    this.selectionModel = new SelectionModel<string>(
      this.multipleSelection,
      this._selected
    );
    this.displayedColumns.push('row-actions');

    this.dataSource = new TreeDataSource<ProductNode, ProductFlattenNode>(
      this.viewport,
      this.treeControl,
      createTreeFlattener()
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectRow(row: Product) {
    if (this.expandable) {
      this.expandedRowId = this.expandedRowId === row.id ? null : row.id;
    }
    if (this.selectable) {
      this.selectionModel.toggle(row.id);
    }
  }

  onExpressionsChanged(exps: FilterExpression[]) {
    this.filtersChange$.next(exps);
  }

  delete({ type, id }: ProductNode) {
    return this.masterData
      .delete(this.getDataSourceByNodeType(type).endpoint, id)
      .pipe(take(1))
      .subscribe(() => this.operationSuccess$.next());
  }

  restore({ type, id }: ProductNode) {
    return this.masterData
      .restore(this.getDataSourceByNodeType(type).endpoint, id)
      .pipe(take(1))
      .subscribe(() => this.operationSuccess$.next());
  }

  masterToggle() {
    this.isAllSelected
      ? this.selectionModel.clear()
      : this.dataSource.data.forEach((row) =>
          this.selectionModel.select(row.id)
        );
  }

  placeholderWhen(index: number, _: any) {
    return index === 0;
  }

  onOperationSuccess(event: OperationResult) {
    if (event?.succeeded) {
      this.operationSuccess$.next();
    }
  }

  private initSources() {
    this.initialized = false;
    this.productSource = this.masterDataConfig.getSource('Product');
    this.productGroupSource = this.masterDataConfig.getSource('ProductGroup');
    this.displayedColumns = this.productSource.metadata.map(
      (x) => x.property as string
    );
    this.columns = this.productSource.metadata.map(
      ({ property: p, label }) => ({
        key: p as string,
        name: label,
      })
    );

    this.destroy$.next();
    this.listenTableInteraction();
  }

  private getDataSourceByNodeType(type: ProductNodeType) {
    return type === ProductNodeType.Sku
      ? this.productSource
      : this.productGroupSource;
  }

  private listenTableInteraction() {
    this.requestProgress.start();

    const query = new QueryRequestBuilder();
    query.setPageSize(Infinity);

    const sort = this.sort.sortChange.pipe(
      map(
        ({ active, direction }) =>
          query.setPage(0).sort(active, direction as SortDirection).request
      )
    );

    const operationSuccess = this.operationSuccess$
      .asObservable()
      .pipe(map(() => query.request));

    const filters = this.filtersChange$.asObservable().pipe(
      map((filtersArray) => {
        query.setFilter(dataFilter(Operator.And, filtersArray).toString());
        return query.request;
      })
    );

    const productGroups = this.masterData.query<ProductGroup>(
      this.productGroupSource.endpoint,
      new QueryRequestBuilder().setPageSize(Infinity).request
    );

    const products = merge(sort, filters, operationSuccess).pipe(
      startWith(query.request),
      switchMap((request) =>
        forkJoin([
          this.masterData.query<Product>(this.productSource.endpoint, request),
          productGroups,
        ])
      )
    );

    products
      .pipe(
        tap(() => this.requestProgress.start()),
        takeUntil(this.destroy$)
      )
      .subscribe(
        ([productsResults, groupsResults]) => {
          const flattenNodes = makeNodes(
            groupsResults.results,
            productsResults.results
          );
          const tree = makeTree(flattenNodes);
          console.log(tree);
          this.initialized = true;
          this.dataSource.data = tree as any;
          this.requestProgress.stop(!productsResults.count);
          this.treeControl.expandAll();
        },
        (error) => {
          console.log(error);
          this.initialized = true;
          this.requestProgress.stop(true);
          this.information.error(RequestProgress.formatError(error));
        }
      );
  }
}
