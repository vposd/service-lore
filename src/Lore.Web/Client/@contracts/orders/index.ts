import { Entity, SimpleEntity } from '../common';
import { AttributeValueType } from '@contracts/enums';

export class Customer {
  id: string;
  name: string;
  phone: string;
}

export class OrderItem {
  id: string;
  product: SimpleEntity;
  quantity: number;
  amount: number;
}

export class Attribute {
  id: string;
  name: string;
  type: AttributeValueType;
  value: AttributeValue;
}

export class AttributeValue {
  id: string;
  value: string;
}

export class Device {
  id: string;
  attributes: Attribute[];
  name: string;
  serialNumber: string;
}

export class Order extends Entity {
  id: string;
  customer: Customer;
  statusId: string;
  device: Device;
  dateIn: string;
  dateOut: string;
  description: string;
  failures: SimpleEntity[];
  items: OrderItem[];
}
