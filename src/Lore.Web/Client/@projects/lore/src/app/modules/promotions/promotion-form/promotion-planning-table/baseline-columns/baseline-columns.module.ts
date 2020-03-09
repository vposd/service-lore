import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaselineColumnsComponent } from './baseline-columns.component';
import { TableHelpersModule } from '@common/utils/table-helpers/table-helpers.module';

@NgModule({
  declarations: [BaselineColumnsComponent],
  exports: [BaselineColumnsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    TableHelpersModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ]
})
export class BaselineColumnsModule {}
