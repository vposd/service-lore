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
import {
  Order,
  Attribute as OrderAttribute,
  Customer,
  OrderSaveRequest,
  DeviceSaveRequest,
} from '@contracts/orders';
import { normalizeDate } from '@common/utils/date';
import { AttributeObject } from '@contracts/enums';
import { InformationService } from '@common/information/information.service';
import { AttributeValue } from '@contracts/master-data/attribute-value.class';

import { ProcessAction } from '../../master-data/models/process-action.enum';
import { OrdersService } from '../orders.service';
import { AttributesModel } from './attributes-input/attributes-input.component';
import { isArray, values } from 'lodash';
import { Value } from '../../master-data/autocomplete-selection/autocomplete-selection.component';

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
  readonly attributeObjectType = AttributeObject;
  readonly deviceAttributes$: Observable<Attribute[]>;
  readonly orderDeviceAttributes$: Observable<Attribute[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly params: OrderFormParams,
    readonly dialogRef: MatDialogRef<OrderFormComponent>,
    private readonly info: InformationService,
    private readonly orders: OrdersService,
    fb: FormBuilder
  ) {
    this.deviceAttributes$ = this.orders.getAttributes(AttributeObject.Device);
    this.orderDeviceAttributes$ = this.orders.getAttributes(
      AttributeObject.OrderDevice
    );

    const { order = new Order() } = params;
    console.log(order);
    const customer = fb.group({
      model: new FormControl(order.customer, Validators.required),
      phone: new FormControl(order.customer?.phone, Validators.required),
    });

    customer.get('model').valueChanges.subscribe((x) => {
      if (x) {
        customer.get('phone').setValue(x.phone, { emitEvent: false });
      }
    });

    customer.get('phone').valueChanges.subscribe((x) => {
      customer.get('model').setValue(
        {
          ...(customer.value.model || {}),
          phone: x,
        },
        { emitEvent: false }
      );
    });

    const deviceAttributes = new FormControl(
      this.normalizeAttributes(order.device?.attributes),
      Validators.required
    );
    const deviceAttributesModels = new FormControl([], Validators.required);
    deviceAttributes.valueChanges.subscribe((x) =>
      deviceAttributesModels.setValue(this.coerceAttributes(x), {
        emitEvent: false,
      })
    );

    const orderDeviceAttributes = new FormControl(
      this.normalizeAttributes(order.deviceAttributes),
      Validators.required
    );
    const orderDeviceAttributesModel = new FormControl([], Validators.required);
    orderDeviceAttributes.valueChanges.subscribe((x) =>
      orderDeviceAttributesModel.setValue(this.coerceAttributes(x), {
        emitEvent: false,
      })
    );

    const failures = new FormControl(order.failures, Validators.required);
    const failuresModel = new FormControl(order.failures, Validators.required);

    failures.valueChanges.subscribe((x) =>
      failuresModel.setValue(
        x.map((i) =>
          i.adding ? { ...i, adding: undefined, id: undefined } : i
        ),
        { emitEvent: false }
      )
    );

    this.form = fb.group({
      customer,
      device: fb.group({
        name: new FormControl(order.device?.name, Validators.required),
        serialNumber: new FormControl(order.device?.serialNumber),
        attributes: deviceAttributes,
        attributesModel: deviceAttributesModels,
      }),
      deviceAttributes: orderDeviceAttributes,
      deviceAttributesModel: orderDeviceAttributesModel,
      failures,
      failuresModel,
      dateIn: new FormControl(
        normalizeDate(order.dateIn || new Date()),
        Validators.required
      ),
      dateOut: new FormControl(
        order.dateOut ? normalizeDate(order.dateOut) : null
      ),
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((x) => console.log(x, this.form));
  }

  save() {
    const value = this.form.value;
    const model = new OrderSaveRequest();

    model.id = this.params.order?.id;
    model.customer = value.customer.model.adding
      ? { ...value.customer.model, id: null, adding: null }
      : value.customer.model;

    model.dateIn = value.dateIn;
    model.dateOut = value.dateOut;
    model.description = value.description;

    model.device = new DeviceSaveRequest();
    model.device.id = value.device?.id;
    model.device.name = value.device?.name;
    model.device.serialNumber = value.device?.serialNumber;
    model.device.attributes = value.device?.attributesModel?.existing;
    model.device.attributesToCreate = value.device?.attributesModel?.creating;

    model.failures = value.failuresModel;

    model.deviceAttributes = value.deviceAttributesModel?.existing;
    model.deviceAttributesToCreate = value.deviceAttributesModel?.creating;
    model.items = value.items || [];

    let saving = this.orders.updateOrder(model);
    if (this.params.processAction !== ProcessAction.Edit) {
      saving = this.orders.createOrder(model);
    }

    this.requestProgress.start();
    saving.subscribe(
      () => {
        this.requestProgress.stop();
        this.dialogRef.close();
      },
      (error) => {
        this.info.error('Error', error.name);
        this.requestProgress.error(error);
      }
    );
  }

  private coerceAttributes(model: AttributesModel) {
    const fillOutput = (output, attributeId: string) => (
      x: Value<AttributeValue>
    ) => {
      if (!x) {
        return;
      }
      return x.adding
        ? output.creating.push({
            attributeId,
            value: x.value,
          })
        : output.existing.push({
            attributeId,
            valueId: x.id,
          });
    };
    return Object.keys(model).reduce(
      (output, attributeId) => {
        const value = model[attributeId];
        const handleValue = fillOutput(output, attributeId);
        if (isArray(value)) {
          value.forEach(handleValue);
          return output;
        }
        handleValue(value as Value<AttributeValue>);
        return output;
      },
      { existing: [], creating: [] }
    );
  }

  private normalizeAttributes(attributes: OrderAttribute[]) {
    return attributes?.reduce((out, i) => ({ ...out, [i.id]: i.value }), {});
  }
}
