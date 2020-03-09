import { Promotion } from '@contracts/master-data/entities/loretion.class';
import { PromotionDetailItem } from './loretion-detail-item.class';

export class PromotionDetail extends Promotion {
  addressProgram: string[];
  items: PromotionDetailItem[];
}
