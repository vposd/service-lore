import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDialogsModule } from '@common/dialogs/dialogs.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DataSelectionComponent } from './data-selection.component';
import { DataSelectionTableComponent } from './data-selection-table/data-selection-table.component';
import { DataTableModule } from '../data-table/data-table.module';

@NgModule({
  declarations: [DataSelectionComponent, DataSelectionTableComponent],
  exports: [DataSelectionComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    DataTableModule,
    MatButtonModule,
    MatTooltipModule,
    ModalDialogsModule
  ]
})
export class DataSelectionModule {}
