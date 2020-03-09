import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ModalDialogsModule } from '@common/dialogs/dialogs.module';
import { PasswordModule } from '@common/form-controls/password/password.module';

import { AuthInterceptor } from './auth-interceptor/auth-interceptor.service';
import { AuthSplashComponent } from './auth-splash/auth-splash.component';
import { AuthenticationComponent } from './authentication.component';
import { LoginFormComponent } from './auth-login-form/auth-login-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    PasswordModule,
    ModalDialogsModule
  ],
  exports: [AuthSplashComponent, LoginFormComponent],
  declarations: [
    AuthenticationComponent,
    AuthSplashComponent,
    LoginFormComponent
  ]
})
export class AuthenticationModule {
  constructor(@Optional() @SkipSelf() parentModule: AuthenticationModule) {
    if (parentModule) {
      throw new Error(
        'AuthenticationModule is already loaded. Import it in the AppModule only.'
      );
    }
  }

  static forRoot(): ModuleWithProviders<AuthenticationModule> {
    return {
      ngModule: AuthenticationModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    };
  }
}
