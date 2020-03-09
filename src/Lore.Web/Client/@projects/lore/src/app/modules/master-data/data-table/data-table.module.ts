import { NgModule, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { RequestProgressModule } from '@common/utils/request-progress/request-progress/request-progress.module';

import { DataTableComponent } from './data-table.component';
import { FormatByTypePile } from './format-by-type/format-by-type.pipe';
import { ExpandableRowDirective } from './expandable-row/expandable-row.directive';
import { ExpandableRowHostDirective } from './expandable-row/expandable-row-host.directive';

@NgModule({
  declarations: [
    DataTableComponent,
    FormatByTypePile,
    ExpandableRowDirective,
    ExpandableRowHostDirective
  ],
  exports: [
    DataTableComponent,
    ExpandableRowDirective,
    ExpandableRowHostDirective
  ],
  imports: [
    CommonModule,
    RequestProgressModule,
    FormsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
  ]
})
export class DataTableModule {}
