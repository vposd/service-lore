import { Entity } from '../common';

export class Customer {
  id: string;
  name: string;
  phone: string;
}

export class Device {
  id: string;
  name: string;
}

export class OrderDevice {
  id: string;
  description: string;
  device: Device;
}

export class OrderDetails extends Entity {
  description: string;
  customer: Customer;
}

export class Order extends Entity {
  customerId: string;
  customerName: string;
  customerPhone: string;
  description: string;
  id: string;
  orderDeviceDescription: string;
  orderDeviceName: string;
  statusId: string;
}
