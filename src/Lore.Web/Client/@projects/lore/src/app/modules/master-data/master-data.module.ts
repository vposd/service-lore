import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MasterDataComponent } from './master-data.component';
import { DataTableModule } from './data-table/data-table.module';

@NgModule({
  declarations: [MasterDataComponent],
  imports: [
    CommonModule,
    DataTableModule,
    RouterModule.forChild([
      {
        path: ':source',
        component: MasterDataComponent
      }
    ])
  ]
})
export class MasterDataModule {}
