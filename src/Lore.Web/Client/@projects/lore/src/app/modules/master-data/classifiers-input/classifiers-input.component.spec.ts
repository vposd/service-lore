import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionSkuSelectionComponent } from './loretion-sku-selection.component';

describe('PromotionStockPartComponent', () => {
  let component: PromotionSkuSelectionComponent;
  let fixture: ComponentFixture<PromotionSkuSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionSkuSelectionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionSkuSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
