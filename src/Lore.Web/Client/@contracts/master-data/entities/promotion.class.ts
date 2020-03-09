import { Column } from '@common/utils/decorators/column.decorator';
import { Type, DataType } from '@common/utils/decorators/data-type.decorator';

import { Entity } from '../entity.class';
import { SimpleEntity } from '../simplie-entity.class';

export class Promotion extends Entity {
  @Column('Идентификатор')
  id: string;

  @Column('Наименование')
  name: string;

  @Column('Описание')
  description: string;

  @Column('Дата начала')
  @Type({ type: DataType.Date })
  startDate: string;

  @Column('Дата окончания')
  @Type({ type: DataType.Date })
  endDate: string;

  @Column('Клиент')
  @Type({ type: DataType.Entity, referenceTo: 'clients' })
  client: SimpleEntity;

  @Column('Статус')
  @Type({ type: DataType.Entity, referenceTo: 'promotionStatuses' })
  status: SimpleEntity;

  @Column('Механика')
  @Type({ type: DataType.Entity, referenceTo: 'promotionMechanics' })
  mechanic: SimpleEntity;
}
