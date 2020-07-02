import { Component, OnInit, Self, Optional, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AttributeValueType, AttributeObject } from '@contracts/enums';
import { Attribute } from '@contracts/master-data/attribute.class';
import { FadeIn } from '@common/animations/fade-in-out.animation';
import { AttributeValue } from '@contracts/master-data/attribute-value.class';

import { OrdersService } from '../../orders.service';
import { SelectionItem } from '../../../master-data/autocomplete-selection/autocomplete-selection.component';

export type AttributesModel = {
  [attributeId: string]: SelectionItem<AttributeValue>;
};

@Component({
  selector: 'app-attributes-input',
  templateUrl: './attributes-input.component.html',
  styleUrls: ['./attributes-input.component.scss'],
  animations: [FadeIn],
})
export class AttributesInputComponent implements ControlValueAccessor, OnInit {
  readonly valueType = AttributeValueType;
  readonly objectType = AttributeObject;
  readonly form: FormGroup;

  @Input() type: AttributeObject.Device;

  disabled: boolean;
  attributes$: Observable<Attribute[]>;
  value: AttributesModel;

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
    this.form.valueChanges.subscribe((x) => {
      this.writeValue(x);
    });

    this.attributes$ = this.orders.getAttributes(this.type).pipe(
      tap((attrs) => {
        const value = { ...this.value };
        attrs.forEach((a) => this.form.addControl(a.id, new FormControl()));
        this.form.patchValue(value);
      })
    );
  }

  writeValue(value: AttributesModel) {
    this.value = value;
    this.onChange(value);
  }

  registerOnChange(fn: (value: AttributesModel) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChange = (value: AttributesModel) => {};

  onTouched = () => {};

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
