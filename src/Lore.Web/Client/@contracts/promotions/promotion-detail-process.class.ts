import { PromotionDetailProcessItem } from './loretion-detail-item.class';

export class PromotionDetailProcessRequest {
  id?: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  clientId: string;
  statusId: string;
  mechanicId: string;
  territoryId: string;
  addressProgram: string[];
  items: PromotionDetailProcessItem[];
}
