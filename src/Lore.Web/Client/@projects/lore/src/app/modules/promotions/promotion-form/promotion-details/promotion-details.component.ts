import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { tap } from 'rxjs/operators';

import { FormState } from '@common/utils/form-helpers/form-state.class';

@Component({
  selector: 'app-promotion-details',
  templateUrl: './loretion-details.component.html',
  styleUrls: ['./loretion-details.component.scss']
})
export class PromotionDetailsComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  @Output() formState = new EventEmitter<FormState<any>>();

  ngOnInit() {
    this.form = this.fb.group({
      client: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      description: new FormControl(''),
      mechanic: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      territory: new FormControl('')
    });

    this.form.valueChanges.subscribe(() =>
      this.formState.emit(new FormState(this.form))
    );
  }
}
