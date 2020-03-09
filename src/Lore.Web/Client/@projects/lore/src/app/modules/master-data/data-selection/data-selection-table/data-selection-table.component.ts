import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Entity } from '@contracts/master-data/entity.class';

import { MasterDataSource } from '../../config/master-data-config.service';
import { DataTableComponent } from '../../data-table/data-table.component';

export class DataSelection<T extends Entity> {
  sourceParams: MasterDataSource<T>;
  selected: string[];
  multipleSelection: boolean;
}

@Component({
  selector: 'app-data-selection-table',
  templateUrl: './data-selection-table.component.html',
  styleUrls: ['./data-selection-table.component.scss']
})
export class DataSelectionTableComponent<T extends Entity> implements OnInit {
  @ViewChild(DataTableComponent, { static: true })
  dataTable: DataTableComponent<T>;

  constructor(
    readonly dialogRef: MatDialogRef<DataSelectionTableComponent<T>>,
    @Inject(MAT_DIALOG_DATA) readonly dataSelection: DataSelection<T>
  ) {}

  ngOnInit() {}

  select() {
    this.dialogRef.close(this.dataTable.selectionModel.selected);
  }
}
