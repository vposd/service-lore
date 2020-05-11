import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { pluck, map } from 'rxjs/operators';

import { OrderStatus } from '@contracts/master-data/order-state.class';

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

  orderStatuses$: Observable<OrderStatus[]>;

  get state$() {
    return this.orderStatuses$.pipe(
      map((x) => x.filter((v) => v.id === this.statusId)),
      map(([x]) => x)
    );
  }

  constructor(
    private readonly masterData: MasterDataService,
    private readonly orders: OrdersService
  ) {}

  ngOnInit() {
    this.orderStatuses$ = this.masterData
      .query<OrderStatus>(endpoints.orderStatuses.root, new HttpParams(), true)
      .pipe(pluck('results'));
  }

  setState(stateId: string) {
    this.orders.updateState(this.orderId, stateId).toPromise();
  }
}
