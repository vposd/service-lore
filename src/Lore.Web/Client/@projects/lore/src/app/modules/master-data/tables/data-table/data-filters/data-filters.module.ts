import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DataFiltersComponent } from './data-filters.component';
import { SimpleSelectionModule } from '../../../simple-selection/simple-selection.module';

@NgModule({
  declarations: [DataFiltersComponent],
  exports: [DataFiltersComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    SimpleSelectionModule,
  ],
})
export class DataFiltersModule {}
