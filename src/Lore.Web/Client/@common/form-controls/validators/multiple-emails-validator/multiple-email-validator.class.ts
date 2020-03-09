import { Validators, FormControl } from '@angular/forms';

export class EmailValidator extends Validators {
  /**
   * Validate email group separated by ;
   */
  static get multipleEmail() {
    return (control: FormControl) => {
      if (!control.value) {
        return null;
      }

      const emails = control.value.split(';') as string[];
      const errors = emails.map(e =>
        Validators.email({ value: e } as FormControl)
      );

      return errors.some(e => e && e.email) ? { email: true } : null;
    };
  }
}
