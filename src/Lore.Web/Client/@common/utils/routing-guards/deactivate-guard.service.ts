import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { of, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

export interface ProtectedDeactivate {
  canDeactivate: (
    currentRoute?: ActivatedRouteSnapshot,
    currentState?: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ) => Observable<boolean> | Promise<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuard implements CanDeactivate<ProtectedDeactivate> {
  deactivateBroadcast = new Subject<boolean>();

  canDeactivate(
    component: ProtectedDeactivate,
    currentRoute?: ActivatedRouteSnapshot,
    currentState?: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> {
    if (!component.canDeactivate) {
      return of(true);
    }

    const canDeactivate = component.canDeactivate(
      currentRoute,
      currentState,
      nextState
    );

    if (canDeactivate instanceof Promise) {
      return canDeactivate;
    }

    return canDeactivate.pipe(take(1));
  }
}
