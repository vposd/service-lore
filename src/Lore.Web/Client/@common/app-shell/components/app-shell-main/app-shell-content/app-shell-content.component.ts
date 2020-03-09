import {
  Component,
  OnInit,
  Inject,
  forwardRef,
  Input,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { every } from 'lodash/fp';
import { map } from 'rxjs/operators';
import { CdkScrollable } from '@angular/cdk/overlay';

import { RequestProgress } from '@common/utils/request-progress/request-progress.class';
import { AuthenticationService } from '@common/authentication/auth-service/authentication.service';

import { AppShellComponent } from '../../app-shell.component';
import { AppShellService } from '../../app-shell.service';

@Component({
  selector: 'app-shell-content',
  templateUrl: './app-shell-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellContentComponent implements OnInit {
  ready$: Observable<boolean>;
  isAuth$: Observable<boolean>;
  settingsSyncProgress: RequestProgress;

  @ViewChild(CdkScrollable, { static: true }) scrollableContent: CdkScrollable;

  @Input() set contextReady(value: boolean) {
    this.contextReady$.next(value);
  }

  private readonly contextReady$ = new BehaviorSubject(false);

  constructor(
    @Inject(forwardRef(() => AppShellComponent))
    private appShell: AppShellComponent,
    private authService: AuthenticationService,
    private appShellService: AppShellService
  ) {}

  ngOnInit() {
    this.settingsSyncProgress = this.appShell.settingsSyncProgress;
    this.isAuth$ = this.authService.isAuthenticated$;
    this.appShellService.scrollableContent = this.scrollableContent;

    this.configureReady();
  }

  private configureReady() {
    const contextReady$ = this.contextReady$.asObservable();
    this.ready$ = combineLatest(contextReady$).pipe(map(every(Boolean)));
  }
}
