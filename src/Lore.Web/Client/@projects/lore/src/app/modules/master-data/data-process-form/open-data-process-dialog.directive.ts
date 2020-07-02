import {
  Directive,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Entity, OperationResult } from '@contracts/common';

import {
  MasterDataConfig,
  MasterDataSource,
} from '../config/master-data-config.service';
import { DataProcessFormDialogComponent } from './data-process-form-dialog/data-process-form-dialog.component';
import { ProcessAction } from '../models/process-action.enum';

@Directive({
  selector: '[appOpenDataProcessDialog]',
})
export class OpenDataProcessDialogDirective<T extends Entity> {
  @Input()
  set source(value: string) {
    this.sourceParams = this.masterDataConfig.getSource(value);
  }

  @Input() process = ProcessAction.Edit;
  @Input() item: T;

  @Output() operationResult = new EventEmitter<OperationResult>();

  sourceParams: MasterDataSource<T>;

  constructor(
    private readonly dialog: MatDialog,
    private masterDataConfig: MasterDataConfig
  ) {}

  @HostListener('click')
  openForm() {
    const dialogRef = this.dialog.open(DataProcessFormDialogComponent, {
      data: {
        sourceParams: this.sourceParams,
        processAction: this.process,
        item: this.item,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.operationResult.emit(result);
    });
  }
}
