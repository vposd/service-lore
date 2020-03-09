import { NgModule } from '@angular/core';

import { ProductColumnsComponent } from './product-columns.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [MatTableModule],
  exports: [ProductColumnsComponent],
  declarations: [ProductColumnsComponent]
})
export class ProductColumnsModule {}
