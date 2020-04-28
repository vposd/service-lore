import { Order } from '@contracts/orders';
import { OrderState } from '@contracts/order-states';

export class OrderTableRow extends Order {
  status: OrderState;
}
