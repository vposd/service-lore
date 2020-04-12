import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { GlobalSearchComponent } from './global-search.component';

@NgModule({
  declarations: [GlobalSearchComponent],
  exports: [GlobalSearchComponent],
  imports: [CommonModule, MatInputModule, MatFormFieldModule],
})
export class GlobalSearchModule {}
