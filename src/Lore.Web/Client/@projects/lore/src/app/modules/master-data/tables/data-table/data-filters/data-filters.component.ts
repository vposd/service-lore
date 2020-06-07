import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators';

import { DataFilter } from '../../../models/filter-metadata.class';
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

  constructor(fb: FormBuilder) {
    this.form = fb.group({});
  }

  ngOnInit(): void {
    this.filters.forEach(({ property }) =>
      this.form.addControl(property, new FormControl(false))
    );

    this.form.valueChanges.pipe(startWith(this.form.value)).subscribe((x) => {
      const expressions = this.filters.map((f) =>
        f.expressionFactory(x[f.property])
      );
      this.expressionsChange.emit(expressions);
    });
  }
}
