import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionFormComponent } from './loretion-form.component';

describe('PromotionFormComponent', () => {
  let component: PromotionFormComponent;
  let fixture: ComponentFixture<PromotionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
