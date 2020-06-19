import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { RequestProgress } from '@common/utils/request-progress/request-progress.class';
import { Attribute } from '@contracts/master-data/attribute.class';

import { ProcessAction } from '../../master-data/models/process-action.enum';
import { OrdersService } from '../orders.service';
import { Order, Attribute as OrderAttribute } from '@contracts/orders';
import { isEmptyDate, normalizeDate } from '@common/utils/date';

interface OrderFormParams {
  order: Order;
  processAction: ProcessAction;
}

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  readonly form: FormGroup;
  readonly requestProgress = new RequestProgress();
  readonly processActionEnum = ProcessAction;
  readonly attributes$: Observable<Attribute[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly params: OrderFormParams,
    readonly dialogRef: MatDialogRef<OrderFormComponent>,
    private readonly orders: OrdersService,
    fb: FormBuilder
  ) {
    this.attributes$ = this.orders.getAttributes();

    const { order = new Order() } = params;
    this.form = fb.group({
      customer: fb.group({
        model: new FormControl(order.customer, Validators.required),
        phone: new FormControl(order.customer?.phone, Validators.required),
      }),
      device: fb.group({
        name: new FormControl(order.device?.name, Validators.required),
        serialNumber: new FormControl(order.device?.serialNumber),
        attributes: new FormControl(
          this.normalizeAttributes(order.device?.attributes),
          Validators.required
        ),
      }),
      failures: new FormControl(order.failures, Validators.required),
      dateIn: new FormControl(
        normalizeDate(order.dateIn || new Date()),
        Validators.required
      ),
      dateOut: new FormControl(normalizeDate(order.dateOut)),
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((x) => console.log(this.form));
  }

  save() {
    console.log(this.form.value);
    return;
    if (this.params.processAction === ProcessAction.Edit) {
      this.orders.createOrder(this.form.value).subscribe(console.log);
    } else {
      this.orders.updateOrder(this.form.value).subscribe(console.log);
    }
  }

  private normalizeAttributes(attributes: OrderAttribute[]) {
    return attributes?.reduce((out, i) => ({ ...out, [i.id]: i.value }), {});
  }
}
