import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { GlobalAuthGuard } from '@common/authentication/auth-guard/global-auth-guard.service';
import { RolesAccessGuard } from '@common/app-shell/components/route-guards/roles-access-guard.service';

import { routes } from './routes';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [GlobalAuthGuard, RolesAccessGuard]
})
export class RoutingModule {}
