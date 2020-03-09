import { Column } from '@common/utils/decorators/column.decorator';
import { Type, DataType } from '@common/utils/decorators/data-type.decorator';

import { Entity } from '../entity.class';
import { SimpleEntity } from '../simplie-entity.class';

export class Client extends Entity {
  @Column('Идентификатор')
  id: string;

  @Column('Наименование')
  name: string;

  @Column('Тип клиента')
  @Type({ type: DataType.Entity })
  clientType: SimpleEntity;
}
