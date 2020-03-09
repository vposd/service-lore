import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportGridComponent } from './report-grid.component';

@NgModule({
  declarations: [ReportGridComponent],
  exports: [ReportGridComponent],
  imports: [CommonModule]
})
export class ReportGridModule {}
