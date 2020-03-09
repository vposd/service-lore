import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RegularDialogOptions } from '../../models/regular-dialog-options.class';

@Component({
  selector: 'core-regular-dialog',
  templateUrl: './regular.dialog.component.html'
})
export class RegularDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RegularDialogOptions,
    private dialogRef: MatDialogRef<RegularDialogComponent>
  ) {}

  close() {
    if (this.data.closeHandler) {
      this.data.closeHandler();
    }
    this.dialogRef.close();
  }

  save() {
    if (this.data.saveHandler) {
      this.data.saveHandler();
    }
    this.dialogRef.close(true);
  }
}
