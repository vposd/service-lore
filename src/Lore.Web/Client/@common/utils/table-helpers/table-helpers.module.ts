import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';

import { TableCellDirective } from './cell/table-cell.directive';
import { TableCellInputDirective } from './cell/table-cell-input.directive';
import { TableRowDirective } from './cell/table-row.directive';
import { TableDirective } from './cell/table.directive';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [A11yModule, MatTableModule],
  exports: [TableCellDirective, TableCellInputDirective, TableRowDirective, TableDirective],
  declarations: [TableCellDirective, TableCellInputDirective, TableRowDirective, TableDirective]
})
export class TableHelpersModule { }
