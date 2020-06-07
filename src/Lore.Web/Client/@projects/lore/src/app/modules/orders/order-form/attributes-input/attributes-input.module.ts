import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { AttributesInputComponent } from './attributes-input.component';
import { DataChipsSelectionModule } from '../../../master-data/data-chips-selection/data-chips-selection.module';
import { SimpleSelectionModule } from '../../../master-data/simple-selection/simple-selection.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataChipsSelectionModule,
    MatSelectModule,
    SimpleSelectionModule,
  ],
  declarations: [AttributesInputComponent],
  exports: [AttributesInputComponent],
})
export class AttributesInputModule {}
