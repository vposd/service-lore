import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { OrdersTableComponent } from './orders-table.component';
import { OrderStatusSelectModule } from './order-status-select/order-status-select.module';

@NgModule({
  declarations: [OrdersTableComponent],
  exports: [OrdersTableComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    OrderStatusSelectModule,
    ScrollingModule,
  ],
})
export class OrdersTableModule {}