import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { configureTestSuite } from 'lib/test-utils';

import { RequestProgressModule } from './request-progress.module';
import { RequestProgressComponent } from './request-progress.component';

describe('[Modules] Component: RequestProgressComponent', () => {
  let component: RequestProgressComponent;
  let fixture: ComponentFixture<RequestProgressComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        RequestProgressModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestProgressComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have .display', () => {
    expect(component.display).toBe('');
  });

  it('should have .display = none only when request progress is success', () => {
    expect(component.display).toBe('');

    component.requestProgress.state = { done: true };
    expect(component.display).toBe('none');

    component.requestProgress.state = { done: true, error: '' };
    expect(component.display).toBe('none');

    component.requestProgress.state = { done: true, empty: true };
    expect(component.display).toBe('');

    component.requestProgress.state = { done: true, error: 'Error' };
    expect(component.display).toBe('');
  });
});
