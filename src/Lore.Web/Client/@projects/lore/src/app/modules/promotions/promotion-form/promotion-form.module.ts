import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ScrollingHelpersModule } from '@common/utils/scrolling-helpers/scrolling-helpers.module';

import { PromotionFormComponent } from './loretion-form.component';
import { PromotionPlanningTableModule } from './loretion-planning-table/loretion-planning-table.module';
import { PromotionAddressProgramModule } from './loretion-address-program/loretion-address-program.module';
import { PromotionDetailsModule } from './loretion-details/loretion-details.module';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatDividerModule,
    MatButtonModule,
    ScrollingHelpersModule,
    RouterModule,
    PromotionDetailsModule,
    PromotionPlanningTableModule,
    PromotionAddressProgramModule
  ],
  exports: [PromotionFormComponent],
  declarations: [PromotionFormComponent]
})
export class PromotionFormModule {}
