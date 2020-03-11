import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellUserDetailsComponent } from './shell-user-details.component';

@NgModule({
  declarations: [ShellUserDetailsComponent],
  exports: [ShellUserDetailsComponent],
  imports: [
    CommonModule
  ]
})
export class ShellUserDetailsModule { }
