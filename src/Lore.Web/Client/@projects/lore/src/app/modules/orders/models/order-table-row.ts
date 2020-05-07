import { Order, AttributeValue } from '@contracts/orders';
import { OrderState } from '@contracts/order-states';

export class OrderTableRow extends Order {
  status: OrderState;
}

export class AttributeModel {
  id: string;
  name: string;
  values: AttributeValue[];
}
