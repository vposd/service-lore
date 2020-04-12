import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ContentChild,
  ContentChildren,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable, Subject, combineLatest } from 'rxjs';
import { Router, ResolveEnd } from '@angular/router';
import { tap, takeUntil, pluck } from 'rxjs/operators';
import { isUndefined } from 'lodash';

import { AuthenticationService } from '@common/authentication/auth-service/authentication.service';
import {
  RequestProgress,
  RequestProgressState,
} from '@common/utils/request-progress/request-progress.class';
import { FadeIn } from '@common/animations/fade-in-out.animation';

import { DrawerChange, DrawerContentChange } from './drawer-state-animations';
import { ShellConfig } from './config/shell-config.service';
import { ShellToolbarStartDirective } from './shell-toolbar-start.directive';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [DrawerChange, DrawerContentChange, FadeIn],
})
export class ShellComponent implements OnInit {
  isOnline: boolean;
  settingsSyncProgress = new RequestProgress();
  isHandset$: Observable<BreakpointState>;
  isAuthenticated$: Observable<boolean>;
  authProgress$: Observable<RequestProgressState>;
  menuCollapsed = true;

  @Output() userLogin = new EventEmitter();
  @Output() userLogout = new EventEmitter();
  @Output() settingsSync = new EventEmitter();
  @ViewChild(MatDrawer) drawer: MatDrawer;
  @ContentChildren(ShellToolbarStartDirective)
  toolbarStartItems: QueryList<ShellToolbarStartDirective>;

  private readonly destroy$ = new Subject();

  constructor(
    readonly shellConfig: ShellConfig,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.authProgress$ = this.authService.state$.pipe(pluck('authProgress'));
    this.authService.getCurrentUser();

    this.listenDocumentTitleUpdates();
    this.listenAuth();
    this.listenOnlineStatus();
  }

  ngAfterContentInit() {
    console.log(this);
  }

  toggleMenu() {
    this.menuCollapsed = !this.menuCollapsed;
  }

  close() {
    this.drawer.close();
  }

  private updateOnlineStatus() {
    if (!isUndefined(navigator.onLine)) {
      this.isOnline = navigator.onLine;
    }
  }

  private listenOnlineStatus() {
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
  }

  private listenDocumentTitleUpdates() {
    combineLatest([this.router.events, this.authService.user$])
      .pipe(
        tap(([event, user]) => {
          const userName = user ? `(${user.displayName})` : '';
          if (event instanceof ResolveEnd) {
            const routeData = event.state.root.firstChild.data;
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private listenAuth() {
    this.authService.state$
      .pipe(
        tap(async ({ isAuthenticated }) => {
          if (!isAuthenticated) {
            return this.userLogout.emit();
          }
          this.userLogin.emit();
        })
      )
      .subscribe();
  }
}
