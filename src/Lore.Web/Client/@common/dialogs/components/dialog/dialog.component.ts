import {
  Component,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'core-dialog',
  templateUrl: './dialog.component.html',
  host: {
    class: 'dialog'
  }
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  @Output() resize = new EventEmitter();

  private unsubscribe: () => void;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    // this.unsubscribe = new ResizeListener(
    //   this.elementRef.nativeElement
    // ).subscribe(() => this.resize.emit());
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
