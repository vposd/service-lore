import {
  Component,
  OnInit,
  Optional,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import { MatTable } from '@angular/material/table';

import { TableDirective } from '@common/utils/table-helpers/cell/table.directive';
import { ColumnsGroup } from '@common/utils/table-helpers/cell/columns-group';

import { Row } from '../../../models/row.class';
import { Summary } from '../../../models/summary.class';

@Component({
  selector: 'app-summary-columns',
  templateUrl: './summary-columns.component.html',
  styleUrls: [
    './summary-columns.component.scss',
    '../loretion-planning-table.component.scss'
  ]
})
export class SummaryColumnsComponent extends ColumnsGroup implements OnInit {
  @Input() summary: Summary;

  constructor(
    @Optional() table: MatTable<Row>,
    @Optional() appTable: TableDirective,
    cdRef: ChangeDetectorRef
  ) {
    super(table, appTable, cdRef);
  }
}
