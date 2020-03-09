import { Component, Input, HostListener, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { property } from 'lodash/fp';

@Component({
  selector: 'core-dialog-header',
  templateUrl: './dialog-header.component.html',
  host: {
    class: 'dialog__header'
  }
})
export class DialogHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() canMaximize = true;
  @Input()
  set maximized(value: boolean) {
    if (!this.dialogRef.addPanelClass || !this.dialogRef.removePanelClass) {
      return;
    }
    value
      ? this.dialogRef.addPanelClass('dialog-fullscreen')
      : this.dialogRef.removePanelClass('dialog-fullscreen');
    this._maximized = value;
  }
  get maximized() {
    return this._maximized;
  }

  private _maximized: boolean;

  constructor(private dialogRef: MatDialogRef<DialogHeaderComponent>) {}

  ngOnInit() {
    this.maximized = property('_containerInstance._config.fullscreen')(
      this.dialogRef
    );
  }

  @HostListener('dblclick')
  toggleMaximize() {
    if (!this.canMaximize) {
      return;
    }

    this.maximized = !this.maximized;
  }
}
