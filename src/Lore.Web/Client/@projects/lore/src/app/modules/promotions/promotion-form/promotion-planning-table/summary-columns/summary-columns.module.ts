import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import { SummaryColumnsComponent } from './summary-columns.component';

@NgModule({
  declarations: [SummaryColumnsComponent],
  exports: [SummaryColumnsComponent],
  imports: [CommonModule, MatMenuModule, MatTableModule]
})
export class SummaryColumnsModule {}
