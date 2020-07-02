import { Order, AttributeValue } from '@contracts/orders';
import { OrderStatus } from '@contracts/master-data/order-state.class';

export class OrderTableRow extends Order {
  status: OrderStatus;
  attributesView?: { [key: string]: AttributeValue[] };

  static fromDto(order: Order): OrderTableRow {
    return Object.assign(new OrderTableRow(), {
      ...order,
      attributesView: [order.device.attributes, order.deviceAttributes].reduce(
        (acc, item) => ({
          ...acc,
          ...item.reduce(
            (a, i) => ((a[i.name] = [...(a[i.name] || []), i.value]), a),
            {}
          ),
        }),
        {}
      ),
    });
  }
}

export class AttributeModel {
  id: string;
  name: string;
  values: AttributeValue[];
}
