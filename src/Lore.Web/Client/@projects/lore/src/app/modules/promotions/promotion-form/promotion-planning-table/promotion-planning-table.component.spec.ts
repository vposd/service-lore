import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionPlanningTableComponent } from './loretion-planning-table.component';

describe('PromotionPlanningTableComponent', () => {
  let component: PromotionPlanningTableComponent;
  let fixture: ComponentFixture<PromotionPlanningTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionPlanningTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionPlanningTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
