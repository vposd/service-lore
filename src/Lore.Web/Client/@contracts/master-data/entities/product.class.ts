import { Column } from '@common/utils/decorators/column.decorator';
import { Type, DataType } from '@common/utils/decorators/data-type.decorator';

import { Entity } from '../entity.class';

export class Product extends Entity {
  @Column('Идентификатор')
  id: string;

  @Column('Артикул')
  article: string;

  @Column('Краткое наименование')
  name: string;

  @Column('Группа')
  @Type({ type: DataType.Entity, referenceTo: 'productGroups' })
  group: string;
}
