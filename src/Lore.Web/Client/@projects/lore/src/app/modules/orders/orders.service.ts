import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ENABLED_CACHE_OPTIONS } from '@common/utils/http-cache/http-cache-constant';
import { QueryResult } from '@contracts/common';
import { Order } from '@contracts/orders';
import { OrderStatus } from '@contracts/master-data/order-state.class';
import { Attribute } from '@contracts/master-data/attribute.class';

import { endpoints, makeHref } from '../../../environments/endpoints';
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
      this.masterData.query<OrderStatus>(
        endpoints.orderStatuses.root,
        new HttpParams(),
        true
      ),
    ]).pipe(
      map(([orders, orderStatuses]) => ({
        ...orders,
        results: orders.results.map((x) => ({
          ...x,
          status: orderStatuses.results.find((s) => s.id === x.statusId),
        })),
      }))
    );
  }

  getOrderStatus(id: string) {
    return this.http.get<OrderStatus>(
      makeHref(endpoints.orderStatuses.single, { id }),
      ENABLED_CACHE_OPTIONS
    );
  }

  updateState(orderId: string, stateId: string) {
    return this.http.post(
      makeHref(endpoints.orders.updateState, { orderId, stateId }),
      null
    );
  }

  getAttributes() {
    return this.http
      .get<QueryResult<Attribute>>(
        endpoints.attributes.root,
        ENABLED_CACHE_OPTIONS
      )
      .pipe(pluck('results'));
  }
}
