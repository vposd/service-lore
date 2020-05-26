import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { RequestProgress } from '@common/utils/request-progress/request-progress.class';
import { Attribute } from '@contracts/master-data/attribute.class';

import { ProcessAction } from '../../master-data/models/process-action.enum';
import { OrdersService } from '../orders.service';

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
    @Inject(MAT_DIALOG_DATA) readonly params: any,
    readonly dialogRef: MatDialogRef<OrderFormComponent>,
    private readonly orders: OrdersService,
    fb: FormBuilder
  ) {
    this.form = fb.group({});
    this.attributes$ = this.orders.getAttributes();
  }

  ngOnInit() {}

  save() {}
}
