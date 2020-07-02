import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { isNil } from 'lodash';

import { DataFilter, FilterType } from '../../../models/filter-metadata.class';
import { FilterExpression } from '../../../master-data-service/filter-expression';

@Component({
  selector: 'app-data-filters',
  templateUrl: './data-filters.component.html',
  styleUrls: ['./data-filters.component.scss'],
})
export class DataFiltersComponent implements OnInit {
  @Input() filters: DataFilter<any>[];
  @Output() expressionsChange = new EventEmitter<FilterExpression[]>();

  readonly form: FormGroup;
  readonly filterType = FilterType;

  constructor(fb: FormBuilder) {
    this.form = fb.group({});
  }

  ngOnInit(): void {
    this.filters.forEach(({ property, type }) =>
      this.form.addControl(
        property,
        new FormControl(this.getDefaultValueByType(type))
      )
    );

    this.form.valueChanges.pipe(startWith(this.form.value)).subscribe((x) => {
      const expressions = this.filters
        .filter((f) => !isNil(x[f.property]))
        .map((f) => f.expressionFactory(x[f.property]));
      this.expressionsChange.emit(expressions);
    });
  }

  private getDefaultValueByType(filterType: FilterType) {
    if (filterType === FilterType.Boolean) {
      return false;
    }
    return;
  }
}
