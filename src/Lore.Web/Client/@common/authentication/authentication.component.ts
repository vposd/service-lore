import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { DialogsService } from '@common/dialogs/components/dialogs.service';
import { FadeInOut } from '@common/animations/fade-in-out.animation';
import { User } from '@contracts/authentication/user';

import { AuthenticationService } from './auth-service/authentication.service';

@Component({
  selector: 'lib-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  animations: [FadeInOut]
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  isAuthenticated$: Observable<boolean>;
  private readonly destroy$ = new Subject();

  constructor(
    private router: Router,
    private dialogs: DialogsService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.authService.state$.pipe(takeUntil(this.destroy$)).subscribe(state => {
      this.checkLoggerAccess(state.user);
      if (state.isAuthenticated) {
        this.router.navigate([this.authService.reference]);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkLoggerAccess(user: User) {}

  private showLoggerNotification() {
    this.dialogs.info({
      title: 'Отсутствует доступ к Graylog',
      message: `Запись системных событий не производится.
                  Отстутствует доступ к системе логирования Graylog.\n
                  Обратитесь к администратору или другому специалисту,
                  сопровождающему систему, для устранения проблемы.`
    });
  }
}
