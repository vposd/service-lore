import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProcessFormDialogComponent } from './data-process-form-dialog.component';

describe('DataProcessFormDialogComponent', () => {
  let component: DataProcessFormDialogComponent;
  let fixture: ComponentFixture<DataProcessFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataProcessFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataProcessFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
