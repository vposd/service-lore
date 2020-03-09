import { Directive, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[isCapsLock]'
})
export class IsCapsLockDirective {
  private isElementFocused = false;

  @Output() isCapsLock = new EventEmitter<boolean>();

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.emitCapsLockState(event);
  }

  @HostListener('focusin', ['$event'])
  onFocusIn(event: KeyboardEvent): void {
    this.isElementFocused = true;
  }

  @HostListener('focusout', ['$event'])
  onFocusOut(event: KeyboardEvent): void {
    this.isElementFocused = false;
  }

  capsLockState(event: KeyboardEvent) {
    return event.getModifierState && event.getModifierState('CapsLock');
  }

  emitCapsLockState(event: KeyboardEvent) {
    if (this.isElementFocused) {
      this.isCapsLock.emit(this.capsLockState(event));
    }
  }
}
