import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';

import { OrderItemModel } from '../../models/order-item';

@Component({
  selector: 'app-order-items-input',
  templateUrl: './order-items-input.component.html',
  styleUrls: ['./order-items-input.component.scss'],
})
export class OrderItemsInputComponent implements OnInit {
  @Input() values: [];

  readonly form: FormArray;
  total = 0;

  constructor(private readonly fb: FormBuilder) {
    this.form = fb.array([]);
  }

  ngOnInit() {
    if (!this.values) {
      this.insert();
    }
    this.form.valueChanges.subscribe((values) => {
      this.total = values.reduce((total, item) => (total += item.amount), 0);
    });
  }

  insert() {
    const item = new OrderItemModel();
    const row = this.fb.group({});
    const updateRow = this.orderItemFormUpdate(row);

    const skuId = new FormControl(null);
    skuId.valueChanges.subscribe((x) => {
      item.skuId = x;
      updateRow(item);
    });
    row.addControl('skuId', skuId);

    const quantity = new FormControl(0);
    quantity.valueChanges.subscribe((x) => {
      item.qty = x;
      updateRow(item);
    });
    row.addControl('quantity', quantity);

    const price = new FormControl(0);
    price.valueChanges.subscribe((x) => {
      item.price = x;
      updateRow(item);
    });
    row.addControl('price', price);

    const amount = new FormControl(0);
    amount.valueChanges.subscribe((x) => {
      item.amount = x;
      updateRow(item);
    });
    row.addControl('amount', amount);

    row.valueChanges.subscribe((x) => console.log(item));

    this.form.insert(this.form.length - 1, row);
  }

  remove(index: number) {
    this.form.removeAt(index);
  }

  private orderItemFormUpdate(rowForm: FormGroup) {
    return (orderItem: OrderItemModel) => {
      rowForm.setValue(
        {
          skuId: orderItem.skuId,
          quantity: orderItem.qty,
          price: orderItem.price,
          amount: orderItem.amount,
        },
        { emitEvent: false }
      );
    };
  }
}
