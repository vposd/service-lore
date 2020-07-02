import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrderFormModule } from './order-form/order-form.module';
import { OrdersComponent } from './orders.component';
import { OrdersTableModule } from './orders-table/orders-table.module';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersTableModule,
    OrderFormModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrdersComponent,
      },
    ]),
  ],
})
export class OrdersModule {}
