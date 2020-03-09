import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appTableCellInput]' })
export class TableCellInputDirective {
  constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('focus')
  onFocus() {
    if (this.elementRef.nativeElement.value === '0') {
      this.elementRef.nativeElement.value = '';
    }
  }

  @HostListener('focusout')
  onFocusOut() {
    if (this.elementRef.nativeElement.value === '') {
      this.elementRef.nativeElement.value = '0';
    }
  }
}
