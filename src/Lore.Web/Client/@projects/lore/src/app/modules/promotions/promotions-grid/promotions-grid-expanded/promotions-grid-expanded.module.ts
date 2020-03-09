import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { RequestProgressModule } from '@common/utils/request-progress/request-progress/request-progress.module';

import { PromotionsGridExpandedComponent } from './loretions-grid-expanded.component';
import { PromotionPlanningTableModule } from '../../loretion-form/loretion-planning-table/loretion-planning-table.module';

@NgModule({
  exports: [PromotionsGridExpandedComponent],
  declarations: [PromotionsGridExpandedComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RequestProgressModule,
    PromotionPlanningTableModule,
    MatProgressSpinnerModule
  ]
})
export class PromotionsGridExpandedModule {}
