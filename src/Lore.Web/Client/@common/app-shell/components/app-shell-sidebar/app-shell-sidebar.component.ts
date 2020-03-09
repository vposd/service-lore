import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter as observableFilter, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SidebarState } from '@common/app-shell/models/sidebar-state.enum';
import { FadeInOut } from '@common/animations/fade-in-out.animation';

import { AppShellService } from '../app-shell.service';
import { AppShellConfig } from '../../config/app-shell.config.service';
import { MenuItem, SidebarConfig } from '../../models/sidebar-config.class';
import { SlideInOutTop } from '../../../animations/slide-in-out.animation';
import { SidebarAnimations } from './app-shell-sidebar.animation';

@Component({
  selector: 'app-shell-sidebar',
  animations: [
    SidebarAnimations.TransformHeight,
    SidebarAnimations.SlideInOut,
    SlideInOutTop,
    FadeInOut
  ],
  styles: [':host { display: flex; width: auto; z-index: 1070 }'],
  templateUrl: './app-shell-sidebar.component.html'
})
export class AppShellSidebarComponent implements OnInit {
  config: SidebarConfig;
  menuModules$: Observable<MenuItem[]>;
  isEnabled$: Observable<boolean>;
  phoneModeEnabled: boolean;
  sidebarAnimationState = 'hidden';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appShellService: AppShellService,
    private appShellConfig: AppShellConfig
  ) {}

  ngOnInit() {
    this.config = this.appShellConfig.sidebarConfig;
    this.isEnabled$ = this.appShellService.isEnabled$;
    this.menuModules$ = this.appShellService.menuItems$.pipe(
      map(list => list.filter(i => !i.onClick))
    );

    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .pipe(
        tap(breakpoints => (this.phoneModeEnabled = breakpoints.matches)),
        observableFilter(breakpoints => breakpoints.matches)
      )
      .subscribe(
        () => (this.appShellService.sidebarState = SidebarState.Hidden)
      );

    this.breakpointObserver
      .observe([Breakpoints.TabletLandscape])
      .pipe(observableFilter(breakpoints => breakpoints.matches))
      .subscribe(
        () => (this.appShellService.sidebarState = SidebarState.Collapsed)
      );

    this.appShellService.sidebarState$.subscribe(state =>
      this.onSidebarStateChanged(state)
    );
  }

  closeSidebar() {
    if (this.phoneModeEnabled && this.sidebarAnimationState === 'full') {
      this.appShellService.sidebarState = SidebarState.Hidden;
    }
  }

  private onSidebarStateChanged(state: SidebarState) {
    this.sidebarAnimationState =
      state === SidebarState.Hidden
        ? 'hidden'
        : state === SidebarState.Collapsed
        ? 'collapsed'
        : 'full';
  }
}
