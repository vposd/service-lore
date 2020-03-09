import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { configureTestSuite } from 'lib/test-utils';

import { AppShellModule } from '@common/app-shell/app-shell.module';
import {
  AppShellOptions,
  APP_SHELL_CONFIG
} from '@common/app-shell/config/app-shell.config.service';
import { ModalDialogsModule } from '@common/dialogs/dialogs.module';
import { PasswordInputModule } from '@common/form-controls/password-input/password-input.module';

import { LoginFormComponent } from './auth-login-form.component';
import { PasswordManagementModule } from '../password-management/password-management.module';
import { AuthenticationService } from '../auth-service/authentication.service';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ModalDialogsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        PasswordManagementModule,
        PasswordInputModule,
        AppShellModule.forRoot()
      ],
      providers: [
        AuthenticationService,
        { provide: APP_SHELL_CONFIG, useValue: new AppShellOptions() }
      ],
      declarations: [LoginFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
