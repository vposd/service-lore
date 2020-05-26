import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

import { OrderFormComponent } from './order-form.component';
import { OpenOrderFormDirective } from './open-order-form.directive';

@NgModule({
  declarations: [OrderFormComponent, OpenOrderFormDirective],
  exports: [OpenOrderFormDirective],
  imports: [
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
})
export class OrderFormModule {}
