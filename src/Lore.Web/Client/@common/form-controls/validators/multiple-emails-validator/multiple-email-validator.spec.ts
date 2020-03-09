import { FormControl } from '@angular/forms';

import { EmailValidator } from './multiple-email-validator.class';

describe('[Core] EmailValidators', () => {
  describe('.multipleEmails', () => {
    it('should not return error if email is valid', () => {
      const control = new FormControl(
        'some@email.com',
        EmailValidator.multipleEmail
      );
      expect(control.errors).toEqual(null);
    });

    it('should return error if email is not valid', () => {
      const control = new FormControl('some.dd', EmailValidator.multipleEmail);
      expect(control.errors).toEqual({ email: true });
    });

    it('should return error if one email in group is not valid', () => {
      const control = new FormControl(
        'first@valid.email;not.valid',
        EmailValidator.multipleEmail
      );
      expect(control.errors).toEqual({ email: true });
    });

    it('should not return error if all emails in group is valid', () => {
      const control = new FormControl(
        'first@valid.email;super@valid',
        EmailValidator.multipleEmail
      );
      expect(control.errors).toEqual(null);
    });
  });
});
