import { NgModule, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { ModalDialogsModule } from '@common/dialogs/dialogs.module';

import { DataTableModule } from '../../master-data/data-table/data-table.module';
import { PromotionsGridComponent } from './loretions-grid.component';
import { PromotionsGridExpandedModule } from './loretions-grid-expanded/loretions-grid-expanded.module';

@NgModule({
  exports: [PromotionsGridComponent],
  declarations: [PromotionsGridComponent],
  imports: [
    CommonModule,
    DataTableModule,
    MatButtonModule,
    MatTableModule,
    ModalDialogsModule,
    PromotionsGridExpandedModule,
    RouterModule
  ]
})
export class PromotionsGridModule {}
