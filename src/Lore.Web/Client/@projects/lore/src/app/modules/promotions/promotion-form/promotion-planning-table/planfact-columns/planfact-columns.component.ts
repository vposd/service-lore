import {
  Component,
  OnInit,
  Optional,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { FormArray } from '@angular/forms';

import { TableDirective } from '@common/utils/table-helpers/cell/table.directive';
import { ColumnsGroup } from '@common/utils/table-helpers/cell/columns-group';

import { Row } from '../../../models/row.class';

@Component({
  selector: 'app-planfact-columns',
  templateUrl: './planfact-columns.component.html',
  styleUrls: [
    '../loretion-planning-table.component.scss',
    './planfact-columns.component.scss'
  ]
})
export class PlanFactColumnsComponent extends ColumnsGroup implements OnInit {
  @Input() form: FormArray;

  constructor(
    @Optional() table: MatTable<Row>,
    @Optional() appTable: TableDirective,
    cdRef: ChangeDetectorRef
  ) {
    super(table, appTable, cdRef);
  }
}
