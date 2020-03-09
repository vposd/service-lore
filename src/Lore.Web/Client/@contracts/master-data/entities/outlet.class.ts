import { Column } from '@common/utils/decorators/column.decorator';
import { Type, DataType } from '@common/utils/decorators/data-type.decorator';

import { Entity } from '../entity.class';

export class Outlet extends Entity {
  @Column('Идентификатор')
  id: string;

  @Column('Имя')
  name: string;

  @Column('Код')
  code: string;

  @Column('Территория')
  @Type({ type: DataType.Entity })
  territory: string;

  @Column('Клиент')
  @Type({ type: DataType.Entity, referenceTo: 'clients' })
  client: string;
}
