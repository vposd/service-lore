import { PromotionPlan } from '@contracts/loretions/loretion-detail-item.class';
import { ToDto } from '@common/utils/mapping/to-dto.interface';
import { FromDto } from '@common/utils/mapping/from-dto.interface';

import { BaselineModel } from './baseline.class';
import { Price } from './price.class';
import { VolumeRevenueModel } from './volume-revenue.class';

export class PlanModel extends VolumeRevenueModel
  implements ToDto<PromotionPlan>, FromDto<PromotionPlan> {
  upliftAmount = 0;
  upliftVolume = 0;
  roi = 0;

  constructor(private readonly baseline: BaselineModel, price: Price) {
    super(price);

    this.onChange(() => {
      this.updateUplift();
      this.updateRoi();
    });
    this.baseline.onChange(() => {
      this.updateUplift();
      this.updateRoi();
    });
  }

  calcRevenue() {
    return this.volume * this.price.promo;
  }

  updateUplift() {
    this.upliftAmount = this.revenue - this.baseline.revenue;
    this.upliftVolume = this.volume - this.baseline.volume;
  }

  updateRoi() {
    const deltaMargin = (this.price.regular - this.price.promo) * this.volume;
    this.roi = deltaMargin
      ? (this.margin - this.baseline.margin) / deltaMargin
      : 0;
  }

  toDto(): PromotionPlan {
    return {
      ...super.toDto(),
      roi: this.roi,
      upliftAmount: this.upliftAmount,
      upliftVolume: this.upliftVolume
    };
  }

  fromDto(source: PromotionPlan) {
    super.fromDto(source);
    this.upliftAmount = source.upliftAmount;
    this.upliftVolume = source.upliftVolume;
    this.roi = source.roi;
    return this;
  }
}
