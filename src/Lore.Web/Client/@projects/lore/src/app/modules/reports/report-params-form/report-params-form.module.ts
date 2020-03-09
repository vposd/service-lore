import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

import { ReportParamsFormComponent } from './report-params-form.component';
import { SimpleSelectionModule } from '../../master-data/simple-selection/simple-selection.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ReportParamsFormComponent],
  exports: [ReportParamsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    SimpleSelectionModule,
    SatDatepickerModule,
    SatNativeDateModule
  ]
})
export class ReportParamsFormModule {}
