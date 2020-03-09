import { Router, CanActivate, CanLoad } from '@angular/router';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

import { AuthenticationService } from '../auth-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalAuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private location: Location
  ) {}

  canActivate(): Observable<boolean> {
    return this.canAction();
  }

  canLoad(): Observable<boolean> {
    return this.canAction();
  }

  private canAction() {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.authService.reference = this.location.path();
          this.router.navigate(['login']);
        }
        return isAuthenticated;
      })
    );
  }
}
