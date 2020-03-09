import {
  Directive,
  ContentChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { MatInput } from '@angular/material/input';

import { IsCapsLockDirective } from './is-caps-lock.directive';
import { PasswordEyeDirective } from './password-eye.directive';

@Directive({ selector: '[appPassword]' })
export class PasswordDirective implements AfterViewInit {
  @ContentChild(MatInput, { static: true }) input: MatInput;
  @ContentChild(IsCapsLockDirective, { static: true })
  capsLock: IsCapsLockDirective;
  @ContentChild(PasswordEyeDirective, { static: true })
  passwordEye: PasswordEyeDirective;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.capsLock.isCapsLock.asObservable().subscribe(capsLockEnabled => {
      if (capsLockEnabled) {
        return this.setHintMessage('Caps Lock включен');
      }
      this.clearHint();
    });

    this.passwordEye.visible
      .asObservable()
      .subscribe(visible => (this.input.type = visible ? 'text' : 'password'));
  }

  private setHintMessage(message: string) {
    const hint = this.elementRef.nativeElement.querySelector(
      'mat-hint'
    ) as HTMLElement;
    if (hint) {
      hint.innerText = message;
      hint.style.fontWeight = '700';
    }
  }

  private clearHint() {
    const hint = this.elementRef.nativeElement.querySelector(
      'mat-hint'
    ) as HTMLElement;
    if (hint) {
      hint.innerText = '';
    }
  }
}
