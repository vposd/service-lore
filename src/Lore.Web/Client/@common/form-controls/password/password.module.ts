import { NgModule } from '@angular/core';

import { PasswordDirective } from './password.directive';
import { PasswordEyeDirective } from './password-eye.directive';
import { IsCapsLockDirective } from './is-caps-lock.directive';

@NgModule({
  imports: [],
  exports: [IsCapsLockDirective, PasswordDirective, PasswordEyeDirective],
  declarations: [IsCapsLockDirective, PasswordDirective, PasswordEyeDirective],
  providers: []
})
export class PasswordModule {}
