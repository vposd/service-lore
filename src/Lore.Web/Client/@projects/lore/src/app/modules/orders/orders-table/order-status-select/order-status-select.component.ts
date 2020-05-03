import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { pluck, map } from 'rxjs/operators';

import { OrderState } from '@contracts/order-states';

import { MasterDataService } from '../../../master-data/master-data-service/master-data.service';
import { endpoints } from '../../../../../environments/endpoints';
import { OrdersService } from '../../orders.service';

@Component({
  selector: 'app-order-status-select',
  templateUrl: './order-status-select.component.html',
  styleUrls: ['./order-status-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderStatusSelectComponent implements OnInit {
  @Input() orderId: string;
  @Input() statusId: string;

  orderStates$: Observable<OrderState[]>;

  get state$() {
    return this.orderStates$.pipe(
      map((x) => x.filter((v) => v.id === this.statusId)),
      map(([x]) => x)
    );
  }

  constructor(
    private readonly masterData: MasterDataService,
    private readonly orders: OrdersService
  ) {}

  ngOnInit() {
    this.orderStates$ = this.masterData
      .query<OrderState>(endpoints.orderStates.root, new HttpParams(), true)
      .pipe(pluck('results'));
  }

  setState(stateId: string) {
    this.orders.updateState(this.orderId, stateId).toPromise();
  }
}
