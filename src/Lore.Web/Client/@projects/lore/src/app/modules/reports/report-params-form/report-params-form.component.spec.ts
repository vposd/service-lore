import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportParamsFormComponent } from './report-params-form.component';

describe('ReportParamsFormComponent', () => {
  let component: ReportParamsFormComponent;
  let fixture: ComponentFixture<ReportParamsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportParamsFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportParamsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
