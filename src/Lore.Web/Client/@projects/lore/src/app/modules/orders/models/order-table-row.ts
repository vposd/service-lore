import { Order, AttributeValue } from '@contracts/orders';
import { OrderStatus } from '@contracts/master-data/order-state.class';

export class OrderTableRow extends Order {
  status: OrderStatus;
}

export class AttributeModel {
  id: string;
  name: string;
  values: AttributeValue[];
}
