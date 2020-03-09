import { Column } from '@common/utils/decorators/column.decorator';

import { Entity } from '../entity.class';

export class Employee extends Entity {
  @Column('Идентификатор')
  id: string;

  @Column('Имя')
  firstName: string;

  @Column('Фамилия')
  lastName: string;
}
