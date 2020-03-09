import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionStatusComponent } from './selection-status.component';

describe('SelectionStatusComponent', () => {
  let component: SelectionStatusComponent;
  let fixture: ComponentFixture<SelectionStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectionStatusComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
