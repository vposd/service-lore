import { floor } from 'lodash';

export class OrderItemModel {
  skuId: string = null;

  set qty(qty: number) {
    this._qty = qty || 0;
    this._amount = floor(this._qty * this.price, 2);
  }
  get qty() {
    return this._qty;
  }

  set price(price: number) {
    this._price = price || 0;
    this._amount = floor(this._qty * this.price, 2);
  }
  get price() {
    return this._price;
  }

  set amount(amount: number) {
    this._amount = amount || 0;
    this._price = floor(amount / this._qty);
  }
  get amount() {
    return this._amount;
  }

  private _qty = 1;
  private _price = 0;
  private _amount = this._qty * this._price;
}
