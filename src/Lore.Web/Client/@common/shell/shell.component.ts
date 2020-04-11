import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable, Subject, combineLatest } from 'rxjs';
import { Router, ResolveEnd } from '@angular/router';
import { tap, takeUntil } from 'rxjs/operators';
import { isUndefined } from 'lodash';

import { AuthenticationService } from '@common/authentication/auth-service/authentication.service';
import { RequestProgress } from '@common/utils/request-progress/request-progress.class';
import { FadeIn } from '@common/animations/fade-in-out.animation';

import { DrawerChange, DrawerContentChange } from './drawer-state-animations';

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
  menuCollapsed = true;

  @Output() userLogin = new EventEmitter();
  @Output() userLogout = new EventEmitter();
  @Output() settingsSync = new EventEmitter();
  @ViewChild(MatDrawer) drawer: MatDrawer;

  private readonly destroy$ = new Subject();

  constructor(
    cdr: ChangeDetectorRef,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.authService.getCurrentUser();

    this.listenDocumentTitleUpdates();
    this.listenAuth();
    this.listenOnlineStatus();
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
            // this.close();
            return this.userLogout.emit();
          }
          this.userLogin.emit();
        })
      )
      .subscribe();
  }
}
