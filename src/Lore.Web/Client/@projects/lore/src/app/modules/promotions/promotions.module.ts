import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PromotionsComponent } from './loretions.component';
import { PromotionsGridModule } from './loretions-grid/loretions-grid.module';
import { PromotionFormModule } from './loretion-form/loretion-form.module';
import { PromotionFormComponent } from './loretion-form/loretion-form.component';
import { PromotionsService } from './loretions-service/loretions.service';

@NgModule({
  declarations: [PromotionsComponent],
  imports: [
    CommonModule,
    PromotionsGridModule,
    PromotionFormModule,
    RouterModule.forChild([
      {
        path: '',
        component: PromotionsComponent
      },
      {
        path: 'create',
        component: PromotionFormComponent
      }
    ])
  ],
  providers: [PromotionsService]
})
export class PromotionsModule {}
