import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';

import { PromotionAddressProgramComponent } from './loretion-address-program.component';
import { ClassifiersInputModule } from '../../../master-data/classifiers-input/classifiers-input.module';
import { SelectionStatusComponent } from './selection-status/selection-status.component';

@NgModule({
  imports: [
    FormsModule,
    A11yModule,
    CommonModule,
    ClassifiersInputModule,
    MatTooltipModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  exports: [PromotionAddressProgramComponent, SelectionStatusComponent],
  declarations: [PromotionAddressProgramComponent, SelectionStatusComponent]
})
export class PromotionAddressProgramModule {}
