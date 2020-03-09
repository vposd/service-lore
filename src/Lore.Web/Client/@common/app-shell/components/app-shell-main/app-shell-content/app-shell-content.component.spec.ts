import { EventEmitter } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import {
  AppShellOptions,
  APP_SHELL_CONFIG
} from '@common/app-shell/config/app-shell.config.service';
import { RequestProgress } from '@common/utils/request-progress/request-progress.class';
import { RequestProgressModule } from '@common/utils/request-progress/request-progress/request-progress.module';

import { AppShellComponent } from '../../app-shell.component';
import { AppShellContentComponent } from './app-shell-content.component';

describe('[Core] AppShellContentComponent', () => {
  let component: AppShellContentComponent;
  let fixture: ComponentFixture<AppShellContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RequestProgressModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [AppShellComponent, AppShellContentComponent],
      providers: [
        { provide: APP_SHELL_CONFIG, useValue: new AppShellOptions() },
        {
          provide: AppShellComponent,
          useValue: {
            settingsSync: new EventEmitter(),
            settingsSyncProgress: new RequestProgress()
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppShellContentComponent);
    component = fixture.componentInstance;
    spyOnProperty(component['authService'], 'isAuthenticated$').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('.ready$', () => {
    it('should emit true if context ready and settings sync done', done => {
      component.ready$.subscribe(isReady => {
        expect(isReady).toBe(true);
        done();
      });

      fixture.detectChanges();

      component.contextReady = true;
      component['appShell'].settingsSync.emit();
    });

    it('should emit false if context is not ready and settings sync done', done => {
      component.ready$.subscribe(isReady => {
        expect(isReady).toBe(false);
        done();
      });

      fixture.detectChanges();

      component.contextReady = false;
      component['appShell'].settingsSync.emit();
    });
  });
});
