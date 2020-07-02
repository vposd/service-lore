import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProcessFormComponent } from './data-process-form.component';

describe('DataProcessFormComponent', () => {
  let component: DataProcessFormComponent;
  let fixture: ComponentFixture<DataProcessFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataProcessFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataProcessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
