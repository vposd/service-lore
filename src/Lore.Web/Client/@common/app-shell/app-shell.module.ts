import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { InformationModule } from '@common/information/information.module';
import { ModalDialogsModule } from '@common/dialogs/dialogs.module';
import { RequestProgressModule } from '@common/utils/request-progress/request-progress/request-progress.module';

import { AppShellComponent } from './components/app-shell.component';
import { AppShellContentComponent } from './components/app-shell-main/app-shell-content/app-shell-content.component';
import { AppShellMainComponent } from './components/app-shell-main/app-shell-main.component';
import { AppShellSidebarComponent } from './components/app-shell-sidebar/app-shell-sidebar.component';
import { AppShellSupportComponent } from './components/app-shell-support/app-shell-support.component';
import { AppShellToolbarComponent } from './components/app-shell-main/app-shell-toolbar/app-shell-toolbar.component';
import { HeadersInterceptor } from './components/interceptors/headers-interceptor.service';
import { LicenceCheckInterceptor } from './components/interceptors/lisense-check-interceptor.service';
import { ServiceUnavailableInterceptor } from './components/interceptors/service-unavailable-interceptor.service';
import { SidebarMenuItemComponent } from './components/app-shell-sidebar/sidebar-menu-item/sidebar-menu-item.component';
import { SidebarSubMenuListComponent } from './components/app-shell-sidebar/sidebar-menu-item/sidebar-submenu-list/sidebar-submenu-list.component';
import { SupportService } from './components/app-shell-support/app-shell-support.service';
import { AppShellUserComponent } from './components/app-shell-user/app-shell-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    ModalDialogsModule,
    RequestProgressModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    ScrollingModule,
    InformationModule
  ],
  exports: [
    AppShellComponent,
    AppShellContentComponent,
    AppShellMainComponent,
    AppShellSidebarComponent,
    AppShellSupportComponent,
    AppShellToolbarComponent,
    AppShellUserComponent,
    SidebarMenuItemComponent,
    SidebarSubMenuListComponent
  ],
  declarations: [
    AppShellComponent,
    AppShellContentComponent,
    AppShellMainComponent,
    AppShellSidebarComponent,
    AppShellSupportComponent,
    AppShellToolbarComponent,
    AppShellUserComponent,
    SidebarMenuItemComponent,
    SidebarSubMenuListComponent
  ],
  providers: [SupportService]
})
export class AppShellModule {
  constructor(@Optional() @SkipSelf() parentModule: AppShellModule) {
    if (parentModule) {
      throw new Error(
        'AppShellModule is already loaded. Import it in the AppModule only.'
      );
    }
  }

  static forRoot(): ModuleWithProviders<AppShellModule> {
    return {
      ngModule: AppShellModule,
      providers: [
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: LicenceCheckInterceptor,
        //   multi: true
        // },
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: VersionCheckInterceptor,
        //   multi: true
        // },
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: ServiceUnavailableInterceptor,
        //   multi: true
        // },
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: HeadersInterceptor,
        //   multi: true
        // }
      ]
    };
  }
}
