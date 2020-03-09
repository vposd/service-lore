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
import { LimitPipeModule } from '@common/utils/limitPipe/limit-pipe.module';

import { ClassifiersInputComponent } from './classifiers-input.component';
import { ClassifiersSelectionModule } from '../classifiers-selection/classifiers-selection.module';

@NgModule({
  imports: [
    A11yModule,
    ClassifiersSelectionModule,
    CommonModule,
    FormsModule,
    HighlightModule,
    MatChipsModule,
    LimitPipeModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ScrollingModule
  ],
  exports: [ClassifiersInputComponent],
  declarations: [ClassifiersInputComponent]
})
export class ClassifiersInputModule {}
