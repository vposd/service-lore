import {
  ViewChildren,
  QueryList,
  Optional,
  ChangeDetectorRef,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { TableCellDirective } from '@common/utils/table-helpers/cell/table-cell.directive';
import { TableDirective } from '@common/utils/table-helpers/cell/table.directive';

export class ColumnsGroup implements OnInit, AfterViewInit {
  @ViewChildren(MatColumnDef) cols: QueryList<MatColumnDef>;
  @ViewChildren(TableCellDirective) cells: QueryList<TableCellDirective>;

  constructor(
    @Optional() public matTable: MatTable<any>,
    @Optional() public appTable: TableDirective,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.matTable) {
      this.cdRef.detectChanges();
      this.cols.forEach(col => this.matTable.addColumnDef(col));
    }
  }

  ngAfterViewInit() {
    if (this.appTable) {
      this.appTable.addCells(this.cells.toArray());
    }
  }
}
