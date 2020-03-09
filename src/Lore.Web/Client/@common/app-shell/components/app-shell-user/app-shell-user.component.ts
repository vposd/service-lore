import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@common/authentication/auth-service/authentication.service';
import { DialogsService } from '@common/dialogs/components/dialogs.service';
import { SidebarState } from '@common/app-shell/models/sidebar-state.enum';
import { User } from '@contracts/authentication/user';

import { AppShellService } from '../app-shell.service';
import { AppShellConfig } from './../../config/app-shell.config.service';
import { MenuItem } from '../../models/sidebar-config.class';
import { AppShellSupportComponent } from '../app-shell-support/app-shell-support.component';

@Component({
  selector: 'app-shell-user',
  templateUrl: './app-shell-user.component.html',
  styleUrls: ['./app-shell-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellUserComponent implements OnInit {
  @Input() userMenuItems: MenuItem[] = [];

  isPopoverVisible = false;
  user$: Observable<User>;
  sidebarState$: Observable<SidebarState>;

  constructor(
    private dialogs: DialogsService,
    private authService: AuthenticationService,
    private appShellService: AppShellService,
    private appShellConfig: AppShellConfig
  ) {}

  ngOnInit() {
    this.user$ = this.authService.user$;
    this.sidebarState$ = this.appShellService.sidebarState$;

    this.userMenuItems = [
      ...this.userMenuItems,
      ...(this.appShellConfig.sidebarConfig.userMenuItems || [])
    ];
  }

  onShownPopover(isVisible: boolean) {
    this.isPopoverVisible = isVisible;
  }

  openSupportDialog() {
    this.dialogs.open({ component: AppShellSupportComponent });
  }

  logout() {
    this.authService.signOut();
  }
}
