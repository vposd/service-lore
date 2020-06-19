import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Self,
  Optional,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AttributeValueType } from '@contracts/enums';
import { Attribute } from '@contracts/master-data/attribute.class';

import { OrdersService } from '../../orders.service';

@Component({
  selector: 'app-attributes-input',
  templateUrl: './attributes-input.component.html',
  styleUrls: ['./attributes-input.component.scss'],
})
export class AttributesInputComponent implements ControlValueAccessor, OnInit {
  readonly objectTypeEnum = AttributeValueType;
  readonly form: FormGroup;

  disabled: boolean;
  attributes$: Observable<Attribute[]>;
  value;

  constructor(
    private readonly orders: OrdersService,
    @Optional() @Self() readonly ngControl: NgControl,
    fb: FormBuilder
  ) {
    this.form = fb.group({});

    if (ngControl != null) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((x) => this.writeValue(x));

    const findAttributeValue = (attributeId: string) => {
      return this.value ? this.value[attributeId] : null;
    };

    this.attributes$ = this.orders.getAttributes().pipe(
      tap((attrs) => {
        const value = { ...this.value };
        attrs.forEach((a) => this.form.addControl(a.id, new FormControl()));
        this.form.patchValue(value, { emitEvent: false });
      })
    );
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {}
  registerOnTouched(fn: any) {}

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
