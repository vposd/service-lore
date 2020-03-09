import { Product } from '@contracts/master-data/entities/product.class';
import { ToDto } from '@common/utils/mapping/to-dto.interface';
import {
  PromotionDetailProcessItem,
  PromotionDetailItem
} from '@contracts/loretions/loretion-detail-item.class';
import { FromDto } from '@common/utils/mapping/from-dto.interface';

import { BaselineModel } from './baseline.class';
import { PlanModel } from './plan.class';
import { Price } from './price.class';
import { FactModel } from './fact.class';
import { PlanFactModel } from './plan-fact.class';

export class Row
  implements ToDto<PromotionDetailProcessItem>, FromDto<PromotionDetailItem> {
  baseline: BaselineModel;
  plan: PlanModel;
  fact: FactModel;
  planFact: PlanFactModel;

  constructor(public product: Product, readonly price: Price) {
    this.baseline = new BaselineModel(price);
    this.plan = new PlanModel(this.baseline, price);
    this.fact = new FactModel(this.baseline, this.price);
    this.planFact = new PlanFactModel(
      this.baseline,
      this.plan,
      this.fact,
      this.price
    );
  }

  toDto(): PromotionDetailProcessItem {
    return {
      productId: this.product.id,
      baseline: this.baseline.toDto(),
      plan: this.plan.toDto()
    };
  }

  fromDto(source: PromotionDetailItem) {
    this.product = source.product;
    this.baseline = new BaselineModel(this.price).fromDto(source.baseline);
    this.plan = new PlanModel(this.baseline, this.price).fromDto(source.plan);
    this.fact = new FactModel(this.baseline, this.price).fromDto(source.fact);
    this.planFact = new PlanFactModel(
      this.baseline,
      this.plan,
      this.fact,
      this.price
    );
    return this;
  }
}
