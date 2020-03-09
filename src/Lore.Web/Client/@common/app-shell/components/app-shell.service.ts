import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { find, filter as lodashFilter } from 'lodash';
import { pluck, filter, map, switchMap } from 'rxjs/operators';
import { CdkScrollable } from '@angular/cdk/overlay';

import { DialogsService } from '@common/dialogs/components/dialogs.service';
import { AuthenticationService } from '@common/authentication/auth-service/authentication.service';
import { Store } from '@common/utils/store/store.class';

import { MenuItem } from '../models/sidebar-config.class';
import { AppShellConfig } from '../config/app-shell.config.service';
import { SidebarState } from '../models/sidebar-state.enum';

@Injectable({
  providedIn: 'root'
})
export class AppShellService {
  scrollableContent: CdkScrollable;

  get isEnabled$() {
    return this.authService.isAuthenticated$;
  }

  get productSettings$() {
    return this.authService.user$.pipe(
      filter(user => !!user),
      pluck('productSettings')
    );
  }

  set sidebarState(state: SidebarState) {
    this.sidebarStateStore.state = state;
  }

  get sidebarState() {
    return this.sidebarStateStore.state;
  }

  get sidebarState$() {
    return this.sidebarStateStore.state$;
  }

  get menuItems$() {
    return this.featuresListBroadcast.asObservable().pipe(
      switchMap(items =>
        this.authService.user$.pipe(
          filter(user => !!user),
          map(user =>
            items.filter(item =>
              item.forRoles
                ? item.forRoles.every(role => user.roles.includes(role))
                : true
            )
          )
        )
      )
    );
  }

  get linksList$(): Observable<MenuItem[]> {
    return this.linkListBroadcast.asObservable();
  }

  private set featuresList(values: MenuItem[]) {
    this.featuresListBroadcast.next(values);
  }

  private get featuresList() {
    return this.featuresListBroadcast.getValue();
  }

  private readonly featuresListBroadcast = new BehaviorSubject<MenuItem[]>([]);
  private readonly linkListBroadcast = new BehaviorSubject<MenuItem[]>([]);
  private readonly sidebarStateStore = new Store<SidebarState>(
    SidebarState.Hidden
  );

  constructor(
    private appShellConfig: AppShellConfig,
    private authService: AuthenticationService,
    private dialogs: DialogsService
  ) {
    this.linkListBroadcast.next(
      lodashFilter(
        this.appShellConfig.sidebarConfig.menuItems,
        i => !!i.onClick
      )
    );
    this.featuresList = this.appShellConfig.sidebarConfig.menuItems;
  }

  addMenuItem(item: Partial<MenuItem>) {
    this.appShellConfig.sidebarConfig.menuItems.push(item);
    this.featuresList.push(item);
    this.featuresListBroadcast.next(this.featuresList);
  }

  updateMenuItem(featureId: string, options: MenuItem) {
    const feature = find(this.featuresList, f => f.featureId === featureId);
    if (feature) {
      Object.assign(feature, options);
      this.featuresListBroadcast.next(this.featuresList);
      return;
    }
    const link = find(
      this.appShellConfig.sidebarConfig.menuItems,
      i => i.featureId === featureId
    );
    if (link) {
      Object.assign(link, options);
      this.linkListBroadcast.next(this.linkListBroadcast.getValue());
      return;
    }
  }

  setNextSidebarState() {
    this.sidebarStateStore.state =
      (((this.sidebarStateStore.state as number) + 1) % 3) + 1;
  }

  async showUpdateAlert() {
    return this.dialogs
      .info({
        title: 'Обновление',
        message: `${this.appShellConfig.productOptions.productName} был обновлен на новую версию.\n Страница будет перезагружена`,
        closeLabel: 'OK'
      })
      .afterClosed()
      .toPromise();
  }
}
