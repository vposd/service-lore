import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { ReportsComponent } from './reports.component';
import { ReportGridModule } from './report-grid/report-grid.module';
import { ReportParamsFormModule } from './report-params-form/report-params-form.module';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ReportParamsFormModule,
    MatExpansionModule,
    ReportGridModule,
    RouterModule.forChild([
      {
        path: ':reportName',
        component: ReportsComponent
      }
    ])
  ]
})
export class ReportsModule { }
