import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShellComponent } from './shell.component';
import { ShellUserDetailsModule } from './shell-user-details/shell-user-details.module';

@NgModule({
  declarations: [ShellComponent],
  exports: [ShellComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatButtonModule,
    RouterModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    ShellUserDetailsModule,
  ]
})
export class ShellModule { }
