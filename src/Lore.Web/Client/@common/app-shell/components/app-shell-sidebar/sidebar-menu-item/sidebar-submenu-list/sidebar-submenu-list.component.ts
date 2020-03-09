import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';

import { AppShellService } from '../../../app-shell.service';
import { SidebarAnimations } from '../../app-shell-sidebar.animation';
import { AppShellConfig } from '../../../../config/app-shell.config.service';
import {
  MenuItem,
  SidebarConfig
} from '../../../../models/sidebar-config.class';

@Component({
  selector: 'sidebar-submenu-list',
  styleUrls: ['./sidebar-submenu-list.component.scss'],
  templateUrl: './sidebar-submenu-list.component.html',
  animations: [SidebarAnimations.TransformHeight]
})
export class SidebarSubMenuListComponent implements OnInit, OnChanges {
  @Input() menuItem: MenuItem;
  @Output() selected = new EventEmitter<boolean>();

  config: SidebarConfig;
  list: MenuItem[];

  constructor(private router: Router, private appShellConfig: AppShellConfig) {}

  ngOnChanges() {
    this.list = this.menuItem.children;
  }

  ngOnInit() {
    this.config = this.appShellConfig.sidebarConfig;
    this.list = this.menuItem.children;
  }

  navigate(item: MenuItem) {
    if (item.href) {
      this.router.navigate([item.href]);
    }
  }
}
