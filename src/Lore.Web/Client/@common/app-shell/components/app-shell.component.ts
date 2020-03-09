import {
  Component,
  OnInit,
  OnDestroy,
  ContentChild,
  ComponentRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Router, ResolveEnd } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { isUndefined, trim } from 'lodash';
import { takeUntil, tap } from 'rxjs/operators';

import { RequestProgress } from '@common/utils/request-progress/request-progress.class';
import { SlideInOutTop } from '@common/animations/slide-in-out.animation';
import { AuthenticationService } from '@common/authentication/auth-service/authentication.service';

import { AppShellConfig } from '../config/app-shell.config.service';
import { AppShellSidebarComponent } from './app-shell-sidebar/app-shell-sidebar.component';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  animations: [SlideInOutTop]
})
export class AppShellComponent implements OnInit, OnDestroy {
  isOnline: boolean;
  settingsSyncProgress = new RequestProgress();

  @Output() userLogin = new EventEmitter();
  @Output() userLogout = new EventEmitter();
  @Output() settingsSync = new EventEmitter();

  private readonly destroy$ = new Subject();

  get isProgressEnabled() {
    return this.appShellConfig.routeLoadingProgress;
  }

  @ContentChild(AppShellSidebarComponent, { static: true })
  sidebar: ComponentRef<AppShellSidebarComponent>;

  constructor(
    private appShellConfig: AppShellConfig,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser();

    this.listenDocumentTitleUpdates();
    this.listenAuth();
    this.listenOnlineStatus();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
    combineLatest(this.router.events, this.authService.user$)
      .pipe(
        tap(([event, user]) => {
          const userName = user ? `(${user.displayName})` : '';
          if (event instanceof ResolveEnd) {
            const routeData = event.state.root.firstChild.data;
            document.title = routeData.title
              ? trim(
                  `${this.appShellConfig.productOptions.productName} - ${routeData.title} ${userName}`
                )
              : trim(
                  `${this.appShellConfig.productOptions.productName} ${userName}`
                );
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
