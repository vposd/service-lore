import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsGridExpandedComponent } from './loretions-grid-expanded.component';

describe('PromotionsGridExpandedComponent', () => {
  let component: PromotionsGridExpandedComponent;
  let fixture: ComponentFixture<PromotionsGridExpandedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionsGridExpandedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionsGridExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
