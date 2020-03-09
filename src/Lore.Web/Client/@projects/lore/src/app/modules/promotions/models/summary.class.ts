import {
  PromotionBaseline,
  PromotionPlan,
  PromotionFact,
  PromotionPlanFact
} from '@contracts/loretions/loretion-detail-item.class';
import { Row } from './row.class';

export class Summary {
  baseline: PromotionBaseline = {
    volume: 0,
    netCostAmount: 0,
    revenue: 0,
    margin: 0
  };
  plan: PromotionPlan = {
    volume: 0,
    netCostAmount: 0,
    revenue: 0,
    margin: 0,
    roi: 0,
    upliftVolume: 0,
    upliftAmount: 0
  };
  fact: PromotionFact = {
    volume: 0,
    netCostAmount: 0,
    revenue: 0,
    margin: 0,
    upliftVolume: 0,
    upliftAmount: 0
  };
  planfact: PromotionPlanFact = {
    volume: 0,
    netCostAmount: 0,
    revenue: 0,
    margin: 0,
    upliftVolume: 0,
    upliftAmount: 0,
    roiPlan: 0,
    roiFact: 0
  };

  calc(rows: Row[]) {
    return rows.reduce((summary: Summary, item: Row) => {
      // baseline
      summary.baseline.volume += item.baseline.volume;
      summary.baseline.netCostAmount += item.baseline.netCostAmount;
      summary.baseline.revenue += item.baseline.revenue;
      summary.baseline.margin += item.baseline.margin;
      // plan
      summary.plan.volume += item.plan.volume;
      summary.plan.netCostAmount += item.plan.netCostAmount;
      summary.plan.revenue += item.plan.revenue;
      summary.plan.margin += item.plan.margin;
      summary.plan.upliftVolume += item.plan.upliftVolume;
      summary.plan.upliftAmount += item.plan.upliftAmount;
      // fact
      summary.fact.volume += item.fact.volume;
      summary.fact.netCostAmount += item.fact.netCostAmount;
      summary.fact.revenue += item.fact.revenue;
      summary.fact.margin += item.fact.margin;
      summary.fact.upliftVolume += item.fact.upliftVolume;
      summary.fact.upliftAmount += item.fact.upliftAmount;
      // plan fact
      summary.planfact.volume += item.planFact.volume;
      summary.planfact.netCostAmount += item.planFact.netCostAmount;
      summary.planfact.revenue += item.planFact.revenue;
      summary.planfact.margin += item.planFact.margin;
      summary.planfact.upliftVolume += item.planFact.upliftVolume;
      summary.planfact.upliftAmount += item.planFact.upliftAmount;
      return summary;
    }, new Summary());
  }
}
