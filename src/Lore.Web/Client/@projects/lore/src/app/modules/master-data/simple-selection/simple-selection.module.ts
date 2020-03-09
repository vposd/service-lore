import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { HighlightModule } from '@common/utils/highlight/highlight.module';
import { SelectModule } from '@common/form-controls/select/select.module';

import { SimpleSelectionComponent } from './simple-selection.component';

@NgModule({
  declarations: [SimpleSelectionComponent],
  exports: [SimpleSelectionComponent],
  imports: [
    CommonModule,
    HighlightModule,
    FormsModule,
    ScrollingModule,
    MatInputModule,
    MatProgressSpinnerModule,
    NgxMatSelectSearchModule,
    SelectModule,
    MatSelectModule
  ]
})
export class SimpleSelectionModule { }
