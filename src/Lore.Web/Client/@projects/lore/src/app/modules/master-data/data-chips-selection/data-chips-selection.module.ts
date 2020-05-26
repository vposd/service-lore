import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { HighlightModule } from '@common/utils/highlight/highlight.module';

import { DataChipsSelectionComponent } from './data-chips-selection.component';

@NgModule({
  imports: [
    A11yModule,
    CommonModule,
    FormsModule,
    HighlightModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ScrollingModule,
  ],
  exports: [DataChipsSelectionComponent],
  declarations: [DataChipsSelectionComponent],
})
export class DataChipsSelectionModule {}
