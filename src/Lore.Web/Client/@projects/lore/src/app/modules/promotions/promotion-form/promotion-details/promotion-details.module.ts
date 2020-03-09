import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SimpleSelectionModule } from '../../../master-data/simple-selection/simple-selection.module';
import { PromotionDetailsComponent } from './loretion-details.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SimpleSelectionModule,
    MatDatepickerModule
  ],
  exports: [PromotionDetailsComponent],
  declarations: [PromotionDetailsComponent]
})
export class PromotionDetailsModule {}
