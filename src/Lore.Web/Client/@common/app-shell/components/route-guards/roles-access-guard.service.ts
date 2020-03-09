import { CanLoad, UrlSegment, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, tap, shareReplay, take } from 'rxjs/operators';

import { UserRole } from '@contracts/authentication/user';
import { AuthenticationService } from '@common/authentication/auth-service/authentication.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesAccessGuard implements CanLoad {
  constructor(private auth: AuthenticationService) {}

  canLoad(route: Route, _: UrlSegment[]) {
    const roles: UserRole[] = route.data.forRoles;

    if (!roles) {
      return true;
    }

    return this.auth.user$.pipe(
      map(user => user && roles.every(role => user.roles.includes(role))),
      take(1)
    );
  }
}
