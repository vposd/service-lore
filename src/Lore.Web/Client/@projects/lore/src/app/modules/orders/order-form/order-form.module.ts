import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderFormComponent } from './order-form.component';

@NgModule({
  declarations: [OrderFormComponent],
  exports: [OrderFormComponent],
  imports: [CommonModule],
})
export class OrderFormModule {}
