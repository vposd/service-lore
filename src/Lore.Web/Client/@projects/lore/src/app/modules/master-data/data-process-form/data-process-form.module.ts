import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DataProcessFormComponent } from './data-process-form.component';
import { DataProcessFormDialogComponent } from './data-process-form-dialog/data-process-form-dialog.component';
import { OpenDataProcessDialogDirective } from './open-data-process-dialog.directive';
import { DataChipsSelectionModule } from '../data-chips-selection/data-chips-selection.module';
import { SimpleSelectionModule } from '../simple-selection/simple-selection.module';

@NgModule({
  declarations: [
    DataProcessFormComponent,
    DataProcessFormDialogComponent,
    OpenDataProcessDialogDirective,
  ],
  exports: [OpenDataProcessDialogDirective],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    SimpleSelectionModule,
    DataChipsSelectionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class DataProcessFormModule {}
