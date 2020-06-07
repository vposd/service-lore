import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MasterDataComponent } from './master-data.component';
import { DataTableModule } from './tables/data-table/data-table.module';
import { ProductsDataTableModule } from './tables/products-data-table/products-data-table.module';

@NgModule({
  declarations: [MasterDataComponent],
  imports: [
    CommonModule,
    DataTableModule,
    ProductsDataTableModule,
    RouterModule.forChild([
      {
        path: ':source',
        component: MasterDataComponent,
      },
    ]),
  ],
})
export class MasterDataModule {}
