import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { configureTestSuite } from 'lib/test-utils';

import { AppShellModule } from '@common/app-shell/app-shell.module';
import {
  AppShellOptions,
  APP_SHELL_CONFIG
} from '@common/app-shell/config/app-shell.config.service';
import { ModalDialogsModule } from '@common/dialogs/dialogs.module';
import { PasswordInputModule } from '@common/form-controls/password-input/password-input.module';

import { PasswordManagementModule } from './password-management/password-management.module';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationService } from './auth-service/authentication.service';
import { LoginFormComponent } from './auth-login-form/auth-login-form.component';

describe('[Core] AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        PasswordInputModule,
        NoopAnimationsModule,
        PasswordManagementModule,
        ModalDialogsModule,
        AppShellModule.forRoot()
      ],
      declarations: [AuthenticationComponent, LoginFormComponent],
      providers: [
        AuthenticationService,
        { provide: APP_SHELL_CONFIG, useValue: new AppShellOptions() }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
