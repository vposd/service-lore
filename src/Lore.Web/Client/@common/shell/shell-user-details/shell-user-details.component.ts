import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '@contracts/authentication/user';
import { AuthenticationService } from '@common/authentication/auth-service/authentication.service';
import { ChevronAnimation } from '@common/animations/chevron-animation';

@Component({
  selector: 'app-shell-user-details',
  templateUrl: './shell-user-details.component.html',
  styleUrls: ['./shell-user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ChevronAnimation],
})
export class ShellUserDetailsComponent implements OnInit {
  user$: Observable<User>;

  constructor(private readonly auth: AuthenticationService) {}

  ngOnInit() {
    this.user$ = this.auth.user$;
  }

  logout() {
    this.auth.signOut();
  }
}
