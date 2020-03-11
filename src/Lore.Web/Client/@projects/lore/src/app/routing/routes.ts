import { Routes } from '@angular/router';

import { AuthenticationComponent } from '@common/authentication/authentication.component';
import { GlobalAuthGuard } from '@common/authentication/auth-guard/global-auth-guard.service';
import { UserRole } from '@contracts/authentication/user';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthenticationComponent
  },
  {
    path: 'data',
    loadChildren: () =>
      import('../modules/master-data/master-data.module').then(
        x => x.MasterDataModule
      ),
    canActivate: [GlobalAuthGuard],
    data: {
      title: ''
    }
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('../modules/reports/reports.module').then(x => x.ReportsModule),
    canActivate: [GlobalAuthGuard],
    data: {
      title: 'Отчеты'
    }
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('../modules/settings/settings.module').then(x => x.SettingsModule),
    data: {
      forRoles: [UserRole.Admin],
      title: 'Настройки'
    }
  },
  {
    path: '**',
    redirectTo: '',
    canActivate: [GlobalAuthGuard],
    data: {
      title: ''
    }
  }
];
