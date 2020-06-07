import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { DataFiltersComponent } from './data-filters.component';

@NgModule({
  declarations: [DataFiltersComponent],
  exports: [DataFiltersComponent],
  imports: [CommonModule, ReactiveFormsModule, MatSlideToggleModule],
})
export class DataFiltersModule {}
