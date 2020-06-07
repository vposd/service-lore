import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
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
export class AttributesInputComponent implements OnInit {
  readonly attributes$: Observable<Attribute[]>;
  readonly objectTypeEnum = AttributeValueType;
  readonly form: FormGroup;

  constructor(
    private readonly orders: OrdersService,
    fb: FormBuilder,
    cdr: ChangeDetectorRef
  ) {
    this.form = fb.group({});
    this.attributes$ = this.orders.getAttributes().pipe(
      tap((attrs) => {
        attrs.forEach((a) => this.form.addControl(a.id, new FormControl()));
      })
    );
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(console.log);
  }
}
