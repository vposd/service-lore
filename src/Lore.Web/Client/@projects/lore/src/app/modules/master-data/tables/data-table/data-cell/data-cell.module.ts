import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataCellComponent } from './data-cell.component';
import { FormatByTypePipe } from './format-by-type/format-by-type.pipe';

@NgModule({
  declarations: [DataCellComponent, FormatByTypePipe],
  exports: [DataCellComponent, FormatByTypePipe],
  imports: [CommonModule],
})
export class DataCellModule {}
