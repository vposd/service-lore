import { Product } from '@contracts/master-data/entities/product.class';

class PromotionDetailValues {
  baseline: PromotionBaseline;
  plan: PromotionPlan;
  fact?: PromotionFact | null;
}

export class PromotionDetailProcessItem extends PromotionDetailValues {
  productId: string;
}

export class PromotionDetailItem extends PromotionDetailValues {
  product: Product;
}

export class VolumeRevenue {
  volume: number;
  netCostAmount: number;
  revenue: number;
  margin: number;
}

export class PromotionBaseline extends VolumeRevenue {}
export class VolumeRevenueUplift extends VolumeRevenue {
  upliftVolume: number;
  upliftAmount: number;
}

export class PromotionPlan extends VolumeRevenueUplift {
  roi: number;
}

export class PromotionFact extends VolumeRevenueUplift {
  productId?: string;
  volume: number;
  revenue: number;
}

export class PromotionPlanFact extends VolumeRevenueUplift {
  roiPlan: number;
  roiFact: number;
}
