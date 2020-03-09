import { FromDto } from '@common/utils/mapping/from-dto.interface';
import { PromotionFact } from '@contracts/loretions/loretion-detail-item.class';

import { BaselineModel } from './baseline.class';
import { Price } from './price.class';
import { VolumeRevenueModel } from './volume-revenue.class';

export class FactModel extends VolumeRevenueModel
  implements FromDto<PromotionFact> {
  upliftAmount = 0;
  upliftVolume = 0;

  constructor(private readonly baseline: BaselineModel, price: Price) {
    super(price);
    this.baseline.onChange(() => {
      if (this.isEmpty) {
        return;
      }
      this.updateUplift();
    });
  }

  updateUplift() {
    this.upliftAmount = this.revenue - this.baseline.revenue;
    this.upliftVolume = this.volume - this.baseline.volume;
  }

  fromDto(source: PromotionFact) {
    if (!source) {
      return this;
    }
    this._volume = source.volume;
    this._revenue = source.revenue;
    this._netCostAmount = this.calcNetCostAmount();
    this._margin = this.calcMargin();
    this.updateUplift();
    return this;
  }
}
