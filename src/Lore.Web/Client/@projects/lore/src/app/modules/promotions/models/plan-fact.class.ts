import { BaselineModel } from './baseline.class';
import { Price } from './price.class';
import { VolumeRevenueModel } from './volume-revenue.class';
import { PlanModel } from './plan.class';
import { FactModel } from './fact.class';

export class PlanFactModel extends VolumeRevenueModel {
  upliftAmount = 0;
  upliftVolume = 0;
  roiPlan = 0;
  roiFact = 0;

  get isEmpty() {
    return !this.fact.volume;
  }

  constructor(
    private readonly baseline: BaselineModel,
    private readonly plan: PlanModel,
    private readonly fact: FactModel,
    price: Price
  ) {
    super(price);
    this.baseline.onChange(() => {
      this.update();
    });
    this.plan.onChange(() => {
      this.update();
    });
    this.update();
  }

  updateUplift() {
    this.upliftAmount = this.fact.upliftAmount - this.plan.upliftAmount;
    this.upliftVolume = this.fact.upliftVolume - this.plan.upliftVolume;
  }

  update() {
    if (this.isEmpty) {
      this._volume = 0;
      this._revenue = 0;
      this._margin = 0;
      this.roiPlan = 0;
      this.roiFact = 0;
      this.upliftAmount = 0;
      this.upliftVolume = 0;
      return;
    }
    this._volume = this.fact.volume - this.plan.volume;
    this._netCostAmount = this.fact.netCostAmount - this.plan.netCostAmount;
    this._revenue = this.calcRevenue();
    this._margin = this.calcMargin();
    this.roiPlan = this.calcPlanRoi();
    this.roiFact = this.calcFactRoi();
    this.updateUplift();
  }

  calcRevenue() {
    return this.fact.revenue - this.plan.revenue;
  }

  calcMargin() {
    return this.fact.margin - this.plan.margin;
  }

  calcPlanRoi() {
    const deltaMargin =
      (this.price.regular - this.price.promo) * this.plan.volume;
    return deltaMargin
      ? (this.plan.margin - this.baseline.margin) / deltaMargin
      : 0;
  }

  calcFactRoi() {
    const deltaMargin =
      (this.price.regular - this.price.promo) * this.fact.volume;
    return deltaMargin
      ? (this.fact.margin - this.baseline.margin) / deltaMargin
      : 0;
  }
}
