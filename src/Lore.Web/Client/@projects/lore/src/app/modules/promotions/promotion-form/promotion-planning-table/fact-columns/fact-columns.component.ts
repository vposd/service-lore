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
  selector: 'app-fact-columns',
  templateUrl: './fact-columns.component.html',
  styleUrls: [
    '../loretion-planning-table.component.scss',
    './fact-columns.component.scss'
  ]
})
export class FactColumnsComponent extends ColumnsGroup implements OnInit {
  @Input() form: FormArray;

  constructor(
    @Optional() table: MatTable<Row>,
    @Optional() appTable: TableDirective,
    cdRef: ChangeDetectorRef
  ) {
    super(table, appTable, cdRef);
  }
}
