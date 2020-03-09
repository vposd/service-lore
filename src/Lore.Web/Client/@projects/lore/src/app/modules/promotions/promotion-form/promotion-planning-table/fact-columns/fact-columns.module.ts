import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { TableHelpersModule } from '@common/utils/table-helpers/table-helpers.module';

import { FactColumnsComponent } from './fact-columns.component';

@NgModule({
  declarations: [FactColumnsComponent],
  exports: [FactColumnsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    TableHelpersModule
  ]
})
export class FactColumnsModule {}
