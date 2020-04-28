import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { OrderStatusSelectComponent } from './order-status-select.component';

@NgModule({
  declarations: [OrderStatusSelectComponent],
  exports: [OrderStatusSelectComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
  ],
})
export class OrderStatusSelectModule {}
