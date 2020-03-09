import { PromotionBaseline } from '@contracts/loretions/loretion-detail-item.class';
import { ToDto } from '@common/utils/mapping/to-dto.interface';
import { FromDto } from '@common/utils/mapping/from-dto.interface';

import { VolumeRevenueModel } from './volume-revenue.class';

export class BaselineModel extends VolumeRevenueModel
  implements ToDto<PromotionBaseline>, FromDto<PromotionBaseline> {
  toDto(): PromotionBaseline {
    return {
      ...super.toDto()
    };
  }

  fromDto(source: PromotionBaseline) {
    super.fromDto(source);
    return this;
  }
}
