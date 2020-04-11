import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { ShellUserDetailsComponent } from './shell-user-details.component';

@NgModule({
  declarations: [ShellUserDetailsComponent],
  exports: [ShellUserDetailsComponent],
  imports: [CommonModule, MatMenuModule, MatButtonModule],
})
export class ShellUserDetailsModule {}
