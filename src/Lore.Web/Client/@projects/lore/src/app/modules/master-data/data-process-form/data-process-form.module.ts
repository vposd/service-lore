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
import { SimpleSelectionModule } from '../simple-selection/simple-selection.module';
import { AutocompleteSelectionModule } from '../autocomplete-selection/autocomplete-selection.module';

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
    AutocompleteSelectionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class DataProcessFormModule {}
