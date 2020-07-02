import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { SimpleSelectionModule } from '../../../master-data/simple-selection/simple-selection.module';
import { OrderItemsInputComponent } from './order-items-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SimpleSelectionModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [OrderItemsInputComponent],
  exports: [OrderItemsInputComponent],
})
export class OrderItemsInputModule {}
