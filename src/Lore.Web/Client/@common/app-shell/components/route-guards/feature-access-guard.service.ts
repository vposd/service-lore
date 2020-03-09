import {
  Router,
  CanLoad,
  UrlSegment,
  Route,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { some, first } from 'lodash';

import { AppShellService } from '../app-shell.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureAccessGuard implements CanLoad, CanActivate {
  constructor(
    private appShellService: AppShellService,
    private router: Router
  ) {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.appShellService.menuItems$.pipe(
      take(1),
      map(items => {
        const isAllow = some(items, i => state.url.includes(i.href));

        if (isAllow) {
          return isAllow;
        }

        const href = first(items) ? first(items).href : '/';
        this.router.navigate([href]);
      })
    );
  }

  canLoad(route: Route, _: UrlSegment[]) {
    return true;
  }
}
