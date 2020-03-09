import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { TableHelpersModule } from '@common/utils/table-helpers/table-helpers.module';

import { PlanFactColumnsComponent } from './planfact-columns.component';

@NgModule({
  declarations: [PlanFactColumnsComponent],
  exports: [PlanFactColumnsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    TableHelpersModule
  ]
})
export class PlanFactColumnsModule {}
