import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'lib/test-utils';

import { DialogFooterComponent } from './dialog-footer.component';

describe('[Core] DialogFooterComponent', () => {
  let component: DialogFooterComponent;
  let fixture: ComponentFixture<DialogFooterComponent>;
  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFooterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
