import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ENABLED_CACHE_OPTIONS } from '@common/utils/http-cache/http-cache-constant';
import { QueryResult } from '@contracts/common';
import { Order, OrderSaveRequest } from '@contracts/orders';
import { OrderStatus } from '@contracts/master-data/order-state.class';
import { Attribute } from '@contracts/master-data/attribute.class';
import { environment } from '@projects/lore/src/environments/environment';
import { AttributeObject } from '@contracts/enums';

import { endpoints, makeHref } from '../../../environments/endpoints';
import { MasterDataService } from '../master-data/master-data-service/master-data.service';
import { OrderTableRow } from './models/order-table-row';
import { QueryRequestBuilder } from '../master-data/master-data-service/query-request-builder.class';
import {
  dataFilter,
  Operator,
  property,
} from '../master-data/master-data-service/filter-expression';
import { MasterDataConfig } from '../master-data/config/master-data-config.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(
    private readonly http: HttpClient,
    private readonly masterDataConfig: MasterDataConfig,
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

  getOrder(orderId: string): Observable<OrderTableRow> {
    return forkJoin([
      this.masterData.get<Order>(endpoints.orders.root, orderId),
      this.masterData.query<OrderStatus>(
        endpoints.orderStatuses.root,
        new HttpParams(),
        true
      ),
    ]).pipe(
      map(([order, orderStatuses]) => ({
        ...order,
        status: orderStatuses.results.find((s) => s.id === order.statusId),
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

  getAttributes(objectType: AttributeObject) {
    const query = new QueryRequestBuilder();
    if (objectType) {
      query.setFilter(
        dataFilter(Operator.And, [
          property('deleted').equals(false),
          property('objectType').equals(objectType),
        ]).toString()
      );
    }
    return this.http
      .get<QueryResult<Attribute>>(endpoints.attributes.root, {
        params: query.request,
      })
      .pipe(pluck('results'));
  }

  createOrder(order: OrderSaveRequest) {
    return this.http.post(environment.endpoints.orders.root, order);
  }

  updateOrder(order: OrderSaveRequest) {
    return this.http.patch(
      makeHref(environment.endpoints.orders.single, { orderId: order.id }),
      order
    );
  }
}
