import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { ModalDialogsModule } from '@common/dialogs/dialogs.module';
import { SelectModule } from '@common/form-controls/select/select.module';
import { RequestProgressModule } from '@common/utils/request-progress/request-progress/request-progress.module';

import { DataSelectionModule } from '../data-selection/data-selection.module';
import { ClassifiersSelectionDirective } from './classifiers-selection.directive';
import { ClassifiersSelectionFilterComponent } from './classifiers-selection-filter/classifiers-selection-filter.component';

@NgModule({
  declarations: [
    ClassifiersSelectionDirective,
    ClassifiersSelectionFilterComponent
  ],
  exports: [ClassifiersSelectionDirective],
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
export class ClassifiersSelectionModule {}
