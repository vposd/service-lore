import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, tap, takeUntil, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { AppShellService } from '../../app-shell.service';
import { SidebarAnimations } from '../app-shell-sidebar.animation';
import { AppShellConfig } from '../../../config/app-shell.config.service';
import { MenuItem, SidebarConfig } from '../../../models/sidebar-config.class';
import { SidebarSubMenuListComponent } from './sidebar-submenu-list/sidebar-submenu-list.component';

@Component({
  selector: 'sidebar-menu-item',
  styleUrls: ['./sidebar-menu-item.component.scss'],
  templateUrl: './sidebar-menu-item.component.html',
  animations: [SidebarAnimations.TransformHeight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarMenuItemComponent implements OnInit, OnDestroy {
  @Input() item: MenuItem;
  @Output() selectedChange = new EventEmitter();

  @ViewChild(SidebarSubMenuListComponent)
  submenu: SidebarSubMenuListComponent;

  config: SidebarConfig;
  isRouteActive$: Observable<boolean>;

  private readonly destroy$ = new Subject();

  constructor(
    private appShellService: AppShellService,
    private router: Router,
    private appShellConfig: AppShellConfig,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const navigationEnd$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );
    this.isRouteActive$ = navigationEnd$.pipe(
      map(() => this.isActiveRoute(this.item.href))
    );

    navigationEnd$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.checkActiveRoute());

    this.config = this.appShellConfig.sidebarConfig;
    this.checkActiveRoute();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigate() {
    this.router.navigate([this.item.href]);
  }

  toggleCollapse(event?: UIEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.item.isCollapsed = !this.item.isCollapsed;
  }

  onSelectItem() {
    this.selectedChange.emit();
  }

  isActiveRoute(url: string) {
    return url && this.router.isActive(url, false);
  }

  onItemClick(item: MenuItem, event?: UIEvent, onlyFocus?: boolean) {
    if (item.children) {
      this.toggleCollapse(event);
      return;
    }
    if (item.href) {
      this.router.navigate([item.href]);
    }
    if (item.onClick && !onlyFocus) {
      item.onClick.call(this);
    }
    this.selectedChange.emit();
  }

  private containActiveRoute() {
    const children = this.item.children;
    if (!children) {
      return;
    }

    return children.some(c => this.isActiveRoute(c.href));
  }

  private checkActiveRoute() {
    const shouldExpand = this.containActiveRoute();
    if (shouldExpand) {
      this.item.isCollapsed = false;
      this.cdr.markForCheck();
    }
  }
}
