import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellUserDetailsComponent } from './shell-user-details.component';

describe('ShellUserDetailsComponent', () => {
  let component: ShellUserDetailsComponent;
  let fixture: ComponentFixture<ShellUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShellUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
