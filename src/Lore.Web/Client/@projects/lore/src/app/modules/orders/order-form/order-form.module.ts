import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AttributesInputModule } from './attributes-input/attributes-input.module';
import { OpenOrderFormDirective } from './open-order-form.directive';
import { OrderFormComponent } from './order-form.component';
import { OrderItemsInputModule } from './order-items-input/order-items-input.module';

@NgModule({
  declarations: [OrderFormComponent, OpenOrderFormDirective],
  exports: [OpenOrderFormDirective],
  imports: [
    AttributesInputModule,
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    OrderItemsInputModule,
    ReactiveFormsModule,
  ],
})
export class OrderFormModule {}
