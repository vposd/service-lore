import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

import { ReactiveFormsModule } from '@angular/forms';
import { TableHelpersModule } from '@common/utils/table-helpers/table-helpers.module';

import { BaselineColumnsModule } from './baseline-columns/baseline-columns.module';
import { FactColumnsModule } from './fact-columns/fact-columns.module';
import { PlanColumnsModule } from './plan-columns/plan-columns.module';
import { PlanFactColumnsModule } from './planfact-columns/planfact-columns.module';
import { ProductColumnsModule } from './product-columns/product-columns.module';
import { PromotionPlanningTableComponent } from './loretion-planning-table.component';
import { SummaryColumnsModule } from './summary-columns/summary-columns.module';

@NgModule({
  imports: [
    BaselineColumnsModule,
    CommonModule,
    FactColumnsModule,
    MatMenuModule,
    MatTableModule,
    PlanColumnsModule,
    PlanFactColumnsModule,
    ProductColumnsModule,
    ReactiveFormsModule,
    SummaryColumnsModule,
    TableHelpersModule
  ],
  exports: [PromotionPlanningTableComponent],
  declarations: [PromotionPlanningTableComponent]
})
export class PromotionPlanningTableModule {}
