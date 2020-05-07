import { Routes } from '@angular/router';

import { AuthenticationComponent } from '@common/authentication/authentication.component';
import { GlobalAuthGuard } from '@common/authentication/auth-guard/global-auth-guard.service';
import { UserRole } from '@contracts/authentication/user';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthenticationComponent,
    data: {
      title: 'Authentication',
    },
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('../modules/orders/orders.module').then((x) => x.OrdersModule),
    canActivate: [GlobalAuthGuard],
    data: {
      title: 'Orders',
    },
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('../modules/settings/settings.module').then(
        (x) => x.SettingsModule
      ),
    canActivate: [GlobalAuthGuard],
    data: {
      forRoles: [UserRole.Admin],
      title: 'Settings',
    },
  },
  {
    path: 'references',
    loadChildren: () =>
      import('../modules/master-data/master-data.module').then(
        (x) => x.MasterDataModule
      ),
    canActivate: [GlobalAuthGuard],
    data: {
      forRoles: [UserRole.Admin],
      title: 'Order states',
    },
  },
  {
    path: '**',
    redirectTo: '/orders',
    canActivate: [GlobalAuthGuard],
    data: {
      title: '',
    },
  },
];
