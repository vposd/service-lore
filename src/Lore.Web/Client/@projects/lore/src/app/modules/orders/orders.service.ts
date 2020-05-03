import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

import { ENABLED_CACHE_OPTIONS } from '@common/utils/http-cache/http-cache-constant';
import { OrderState } from '@contracts/order-states';
import { QueryResult, QueryRequest } from '@contracts/common';
import { map } from 'rxjs/operators';
import { Order } from '@contracts/orders';

import { endpoints, format } from '../../../environments/endpoints';
import { MasterDataService } from '../master-data/master-data-service/master-data.service';
import { OrderTableRow } from './models/order-table-row';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(
    private readonly http: HttpClient,
    private readonly masterData: MasterDataService
  ) {}

  getOrders(request: HttpParams): Observable<QueryResult<OrderTableRow>> {
    return forkJoin([
      this.masterData.query<Order>(endpoints.orders.root, request),
      this.masterData.query<OrderState>(
        endpoints.orderStates.root,
        new HttpParams(),
        true
      ),
    ]).pipe(
      map(([orders, orderStates]) => ({
        ...orders,
        results: orders.results.map((x) => ({
          ...x,
          status: orderStates.results.find((s) => s.id === x.statusId),
        })),
      }))
    );
  }

  getOrderState(id: string) {
    return this.http.get<OrderState>(
      format(endpoints.orderStates.single, { id }),
      ENABLED_CACHE_OPTIONS
    );
  }

  updateState(orderId: string, stateId: string) {
    return this.http.post(
      format(endpoints.orders.updateState, { orderId, stateId }),
      null
    );
  }
}
