import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogOptions } from '../models/dialog-options.class';
import { RegularDialogComponent } from './regular-dialog-component/regular-dialog.component';
import { RegularDialogOptions } from '../models/regular-dialog-options.class';

const DIALOG_WIDTHS = {
  xs: '240px',
  sm: '360px',
  md: '600px',
  lg: '960px',
  xl: '1200px'
};

export const DIALOG_DEFAULT_PANEL_CLASS = 'dialog-overlay-pane';
export const DIALOG_FULLSCREEN_PANEL_CLASS = 'dialog-fullscreen';
export const DIALOG_POPOVER_PANEL_CLASS = 'mat-popover-dialog';
export const DIALOG_SELECT_PANEL_CLASS = 'mat-select-dialog';

@Injectable()
export class DialogsService {
  constructor(private dialog: MatDialog) {}

  closeAll() {
    this.dialog.closeAll();
  }

  open<T, D>(options: DialogOptions<D>) {
    if (!options.component) {
      return;
    }
    const width = options.width || this.getWidthBySize(options.size);
    const dialogRef = this.dialog.open<T, D>(
      options.component,
      Object.assign(new DialogOptions<D>(), options, {
        width,
        fullscreen: options.fullscreen,
        panelClass: options.panelClass || DIALOG_DEFAULT_PANEL_CLASS,
        data: options.data || {},
        closeOnNavigation: true
      })
    );
    return dialogRef;
  }

  info(options: RegularDialogOptions) {
    const dialogOptions = Object.assign(options, { type: 'info' });
    return this.openRegularDialog(dialogOptions);
  }

  danger(options: RegularDialogOptions) {
    const dialogOptions = Object.assign(options, { type: 'danger' });
    return this.openRegularDialog(dialogOptions);
  }

  success(options: RegularDialogOptions) {
    const dialogOptions = Object.assign(options, { type: 'success' });
    return this.openRegularDialog(dialogOptions);
  }

  warning(options: RegularDialogOptions) {
    const dialogOptions = Object.assign(options, { type: 'warning' });
    return this.openRegularDialog(dialogOptions);
  }

  confirm(options: RegularDialogOptions) {
    const dialogOptions = Object.assign(options, { type: 'confirm' });
    return this.openRegularDialog(dialogOptions);
  }

  private openRegularDialog(dialogOptions) {
    return this.open({
      component: RegularDialogComponent,
      data: dialogOptions
    });
  }

  private getWidthBySize(widthCode: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    return DIALOG_WIDTHS[widthCode];
  }
}
