import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusSelectComponent } from './order-status-select.component';

describe('OrderStatusSelectComponent', () => {
  let component: OrderStatusSelectComponent;
  let fixture: ComponentFixture<OrderStatusSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatusSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
