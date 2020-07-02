import { NgModule } from '@angular/core';
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
import { ScrollingModule } from '@angular/cdk/scrolling';

import { RequestProgressModule } from '@common/utils/request-progress/request-progress/request-progress.module';

import { ProductsDataTableComponent } from './products-data-table.component';
import { DataFiltersModule } from '../data-table/data-filters/data-filters.module';
import { DataProcessFormModule } from '../../data-process-form/data-process-form.module';
import { DataCellModule } from '../data-table/data-cell/data-cell.module';
import { DataTableModule } from '../data-table/data-table.module';

@NgModule({
  imports: [
    CommonModule,
    DataProcessFormModule,
    FormsModule,
    DataFiltersModule,
    MatButtonModule,
    ScrollingModule,
    MatCheckboxModule,
    DataCellModule,
    DataTableModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    RequestProgressModule,
  ],
  declarations: [ProductsDataTableComponent],
  exports: [ProductsDataTableComponent],
})
export class ProductsDataTableModule {}
