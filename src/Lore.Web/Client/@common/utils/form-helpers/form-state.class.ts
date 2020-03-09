import { FormGroup } from '@angular/forms';

export class FormState<T> {
  get value() {
    return this.form.value as T;
  }

  get invalid() {
    return this.form.invalid;
  }

  constructor(readonly form: FormGroup) {}
}
