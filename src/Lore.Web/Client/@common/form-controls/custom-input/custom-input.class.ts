import { ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';
import { isUndefined } from 'lodash';
import { ChangeDetectorRef } from '@angular/core';

export class CustomInput<T> implements ControlValueAccessor {
  innerModel: T;
  innerModelChanged = new Subject<T>();
  changeDetector?: ChangeDetectorRef;
  disabled: boolean;

  get value() {
    return this.innerModel;
  }

  set value(value: T) {
    this.innerModel = value;
    this.innerModelChanged.next(value);
  }

  onChange(v: T) {}

  onTouched() {}

  registerOnChange(fn: (v: T) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  writeValue(value: T) {
    if (!isUndefined(value)) {
      this.innerModel = value;
      if (this.changeDetector) {
        this.changeDetector.markForCheck();
      }
    }
  }

  /**
   * Implemented from ControlValueAccessor interface
   */
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
