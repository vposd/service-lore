import {
  Directive,
  Optional,
  ElementRef,
  OnInit,
  HostListener
} from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Directive({
  selector: '[coreDialogClose]'
})
export class DialogCloseDirective implements OnInit {
  constructor(
    @Optional() public dialogRef: MatDialogRef<any>,
    private elementRef: ElementRef<HTMLElement>,
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (!this.dialogRef) {
      this.dialogRef = this.getClosestDialog();
    }
  }

  private getClosestDialog() {
    let parent: HTMLElement | null = this.elementRef.nativeElement
      .parentElement;

    while (parent && !parent.classList.contains('mat-dialog-container')) {
      parent = parent.parentElement;
    }

    return parent
      ? this.dialog.openDialogs.find(dialog => dialog.id === parent.id)
      : null;
  }
}
