import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RequestProgressModule } from '@common/utils/request-progress/request-progress/request-progress.module';

import { ShellComponent } from './shell.component';
import { ShellUserDetailsModule } from './shell-user-details/shell-user-details.module';
import { ShellToolbarStartDirective } from './shell-toolbar-start.directive';

@NgModule({
  declarations: [ShellComponent, ShellToolbarStartDirective],
  exports: [ShellComponent, ShellToolbarStartDirective],
  imports: [
    CommonModule,
    LayoutModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RequestProgressModule,
    RouterModule,
    ShellUserDetailsModule,
  ],
})
export class ShellModule {}
