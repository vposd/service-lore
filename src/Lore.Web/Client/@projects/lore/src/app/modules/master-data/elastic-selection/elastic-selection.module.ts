import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { ModalDialogsModule } from '@common/dialogs/dialogs.module';
import { SelectModule } from '@common/form-controls/select/select.module';
import { RequestProgressModule } from '@common/utils/request-progress/request-progress/request-progress.module';

import { ElasticSelectionDirective } from './elastic-selection.directive';
import { ElasticSelectionFilterComponent } from './elastic-selection-filter/elastic-selection-filter.component';
import { DataSelectionModule } from '../data-selection/data-selection.module';

@NgModule({
  declarations: [ElasticSelectionDirective, ElasticSelectionFilterComponent],
  exports: [ElasticSelectionDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalDialogsModule,
    MatSelectModule,
    RequestProgressModule,
    SelectModule,
    MatDividerModule,
    DataSelectionModule,
    MatButtonModule
  ]
})
export class ElasticSelectionModule {}
