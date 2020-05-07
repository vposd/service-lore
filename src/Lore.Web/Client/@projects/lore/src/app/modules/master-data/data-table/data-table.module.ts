import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';

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
    ExpandableRowHostDirective,
  ],
  exports: [
    DataTableComponent,
    ExpandableRowDirective,
    ExpandableRowHostDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    RequestProgressModule,
  ],
})
export class DataTableModule {}
