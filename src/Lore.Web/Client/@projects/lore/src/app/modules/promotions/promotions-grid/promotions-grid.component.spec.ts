import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsGridComponent } from './loretions-grid.component';

describe('PromotionsGridComponent', () => {
  let component: PromotionsGridComponent;
  let fixture: ComponentFixture<PromotionsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionsGridComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
