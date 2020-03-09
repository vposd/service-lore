import { Column } from '@common/utils/decorators/column.decorator';

import { Entity } from '../entity.class';

export class PromotionStatus extends Entity {
  @Column('Идентификатор')
  id: string;

  @Column('Наименование')
  name: string;
}
