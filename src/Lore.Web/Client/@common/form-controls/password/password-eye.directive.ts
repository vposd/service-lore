import {
  Directive,
  HostListener,
  Output,
  ElementRef,
  EventEmitter
} from '@angular/core';

@Directive({ selector: '[appPasswordEye]' })
export class PasswordEyeDirective {
  private _visible = false;

  @Output() visible = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.stopPropagation();

    this._visible = !this._visible;
    this.updateIcon();
    this.visible.emit(this._visible);
  }

  private updateIcon() {
    if (this._visible) {
      this.elementRef.nativeElement.classList.remove('mdi-eye');
      this.elementRef.nativeElement.classList.add('mdi-eye-off');
    } else {
      this.elementRef.nativeElement.classList.remove('mdi-eye-off');
      this.elementRef.nativeElement.classList.add('mdi-eye');
    }
  }
}
