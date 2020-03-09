import { Column } from '@common/utils/decorators/column.decorator';

import { Entity } from '../entity.class';

export class PromotionMechanic extends Entity {
  @Column('Идентификатор')
  id: string;

  @Column('Код')
  code: string;

  @Column('Наименование')
  name: string;

  @Column('Описание')
  description: string;
}
