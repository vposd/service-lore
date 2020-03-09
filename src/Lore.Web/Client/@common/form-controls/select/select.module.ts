import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { HighlightModule } from '@common/utils/highlight/highlight.module';

import { SelectComponent } from './select.component';
import { SearchFilterPipe } from './search-filter.pipe';

@NgModule({
  declarations: [SelectComponent, SearchFilterPipe],
  exports: [SelectComponent, SearchFilterPipe],
  imports: [
    CommonModule,
    HighlightModule,
    NgxMatSelectSearchModule,
    FormsModule,
    ScrollingModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class SelectModule {}
