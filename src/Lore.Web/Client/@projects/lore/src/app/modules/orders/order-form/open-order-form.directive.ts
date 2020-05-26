import { Directive, HostListener, Input, Attribute } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Order } from '@contracts/orders';
import { ProcessAction } from '../../master-data/models/process-action.enum';
import { OrderFormComponent } from './order-form.component';

@Directive({
  selector: '[appOpenOrderForm]',
})
export class OpenOrderFormDirective {
  @Input() order: Order;
  @Input() processAction: ProcessAction;

  constructor(readonly dialog: MatDialog) {}

  @HostListener('click')
  onClick() {
    return this.dialog.open(OrderFormComponent, {
      width: '500px',
      data: {
        order: this.order,
        processAction: this.processAction,
      },
    });
  }
}
