import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AttributesInputComponent } from './attributes-input.component';
import { SimpleSelectionModule } from '../../../master-data/simple-selection/simple-selection.module';
import { AutocompleteSelectionModule } from '../../../master-data/autocomplete-selection/autocomplete-selection.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutocompleteSelectionModule,
    MatSelectModule,
    MatFormFieldModule,
    SimpleSelectionModule,
  ],
  declarations: [AttributesInputComponent],
  exports: [AttributesInputComponent],
})
export class AttributesInputModule {}
