import { Component, OnInit, Optional, ChangeDetectorRef } from '@angular/core';
import { MatTable } from '@angular/material/table';

import { TableDirective } from '@common/utils/table-helpers/cell/table.directive';
import { ColumnsGroup } from '@common/utils/table-helpers/cell/columns-group';

import { Row } from '../../../models/row.class';

@Component({
  selector: 'app-product-columns',
  templateUrl: './product-columns.component.html',
  styleUrls: ['../loretion-planning-table.component.scss']
})
export class ProductColumnsComponent extends ColumnsGroup implements OnInit {
  constructor(
    @Optional() table: MatTable<Row>,
    @Optional() appTable: TableDirective,
    cdRef: ChangeDetectorRef
  ) {
    super(table, appTable, cdRef);
  }
}
