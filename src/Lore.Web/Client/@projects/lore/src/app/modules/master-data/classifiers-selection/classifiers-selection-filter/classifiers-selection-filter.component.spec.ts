import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElasticSelectionFilterComponent } from './elastic-selection-filter.component';

describe('ElasticSelectionFilterComponent', () => {
  let component: ElasticSelectionFilterComponent;
  let fixture: ComponentFixture<ElasticSelectionFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ElasticSelectionFilterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElasticSelectionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
