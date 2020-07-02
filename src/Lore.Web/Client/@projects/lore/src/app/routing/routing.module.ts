import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { GlobalAuthGuard } from '@common/authentication/auth-guard/global-auth-guard.service';

import { routes } from './routes';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [GlobalAuthGuard],
})
export class RoutingModule {}
