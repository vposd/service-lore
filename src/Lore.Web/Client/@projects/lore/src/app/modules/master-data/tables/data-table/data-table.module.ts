import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';

import { RequestProgressModule } from '@common/utils/request-progress/request-progress/request-progress.module';

import { DataCellModule } from './data-cell/data-cell.module';
import { DataFiltersModule } from './data-filters/data-filters.module';
import { DataProcessFormModule } from '../../data-process-form/data-process-form.module';
import { DataTableComponent } from './data-table.component';
import { ExpandableRowDirective } from './expandable-row/expandable-row.directive';
import { ExpandableRowHostDirective } from './expandable-row/expandable-row-host.directive';

@NgModule({
  declarations: [
    DataTableComponent,
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
    DataProcessFormModule,
    FormsModule,
    DataFiltersModule,
    MatButtonModule,
    MatCheckboxModule,
    DataCellModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    RequestProgressModule,
  ],
})
export class DataTableModule {}
