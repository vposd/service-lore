import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ReportMetadata, ReportParamType } from '../config/reports-config';

@Component({
  selector: 'app-report-params-form',
  templateUrl: './report-params-form.component.html',
  styleUrls: ['./report-params-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportParamsFormComponent implements OnInit {
  form: FormGroup;
  readonly paramType = ReportParamType;

  @Input()
  set reportMetadata(value: ReportMetadata) {
    if (!value) {
      return;
    }
    this._reportMetadata = value;
    value.params.forEach(param => {
      this.form.addControl(param.name, new FormControl());
    });
  }
  get reportMetadata() {
    return this._reportMetadata;
  }

  @Output() formChange = new EventEmitter<FormGroup>();

  private _reportMetadata: ReportMetadata;

  constructor(fb: FormBuilder) {
    this.form = fb.group({});
  }

  ngOnInit() {
    this.form.get('promotion').valueChanges.subscribe(promotion => {
      this.form.get('period').setValue({
        begin: promotion.startDate,
        end: promotion.endDate
      });
    });

    this.form.valueChanges.subscribe(() => this.formChange.emit(this.form));
  }
}
