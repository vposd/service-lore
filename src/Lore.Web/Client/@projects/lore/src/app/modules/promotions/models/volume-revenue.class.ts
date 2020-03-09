import { round } from 'lodash';

import { VolumeRevenue } from '@contracts/loretions/loretion-detail-item.class';
import { Price } from './price.class';
import { ToDto } from '@common/utils/mapping/to-dto.interface';
import { FromDto } from '@common/utils/mapping/from-dto.interface';

export class VolumeRevenueModel extends VolumeRevenue
  implements ToDto<VolumeRevenue>, FromDto<VolumeRevenue> {
  set volume(volume: number) {
    this._volume = volume;
    this._netCostAmount = this.calcNetCostAmount();
    this._revenue = this.calcRevenue();
    this._margin = this.calcMargin();
    this.listeners.forEach(f => f());
  }
  get volume() {
    return round(this._volume, 2);
  }

  get netCostAmount() {
    return round(this._netCostAmount, 2);
  }

  get margin() {
    return round(this._margin, 2);
  }

  set revenue(revenue: number) {
    this._revenue = revenue || 0;
    this._netCostAmount = this.calcNetCostAmount();
    this._volume = revenue / this.price.regular;
    this._margin = this.calcMargin();
    this.listeners.forEach(f => f());
  }
  get revenue() {
    return round(this._revenue, 2);
  }

  get isEmpty() {
    return !this.volume;
  }

  protected _volume = 0;
  protected _netCostAmount = 0;
  protected _revenue = 0;
  protected _margin = 0;
  protected readonly listeners: (() => any)[] = [];

  constructor(protected readonly price: Price) {
    super();
  }

  onChange(f: () => any) {
    this.listeners.push(f);
  }

  fromDto(source: VolumeRevenue) {
    this._volume = source.volume;
    this._netCostAmount = source.netCostAmount;
    this._revenue = source.revenue;
    this._margin = source.margin;
    return this;
  }

  toDto(): VolumeRevenue {
    return {
      volume: this.volume,
      netCostAmount: this.netCostAmount,
      revenue: this.revenue,
      margin: this.margin
    };
  }

  protected calcNetCostAmount() {
    return this.volume * this.price.net;
  }

  protected calcRevenue() {
    return this.price.regular * this.volume;
  }

  protected calcMargin() {
    return this.revenue - this._netCostAmount;
  }
}
