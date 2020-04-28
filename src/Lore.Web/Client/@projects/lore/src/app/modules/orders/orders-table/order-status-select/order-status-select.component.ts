import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { pluck } from 'rxjs/operators';

import { OrderState } from '@contracts/order-states';

import { MasterDataService } from '../../../master-data/master-data-service/master-data.service';
import { endpoints } from '../../../../../environments/endpoints';

@Component({
  selector: 'app-order-status-select',
  templateUrl: './order-status-select.component.html',
  styleUrls: ['./order-status-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderStatusSelectComponent implements OnInit {
  orderStates$: Observable<OrderState[]>;
  selected;

  constructor(private readonly masterData: MasterDataService) {}

  ngOnInit() {
    this.orderStates$ = this.masterData
      .query<OrderState>(endpoints.orderStates.root, new HttpParams(), true)
      .pipe(pluck('results'));
  }
}
