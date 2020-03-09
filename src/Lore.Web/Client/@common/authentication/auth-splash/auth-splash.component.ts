import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { RequestProgressState } from '@common/utils/request-progress/request-progress.class';

import { AuthenticationService } from '../auth-service/authentication.service';

@Component({
  selector: 'auth-splash',
  templateUrl: './auth-splash.component.html'
})
export class AuthSplashComponent implements OnInit, OnDestroy {
  authProgress = new RequestProgressState();

  @HostBinding('style.display') get display() {
    return this.authProgress.progress ? '' : 'none';
  }

  private readonly destroy$ = new Subject();

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.state$
      .pipe(tap(({ authProgress }) => (this.authProgress = authProgress)))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
