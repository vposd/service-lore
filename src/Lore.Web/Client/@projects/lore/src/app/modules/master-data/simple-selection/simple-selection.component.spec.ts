import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSelectionComponent } from './simple-selection.component';

describe('SimpleSelectionComponent', () => {
  let component: SimpleSelectionComponent;
  let fixture: ComponentFixture<SimpleSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
