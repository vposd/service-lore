import { DeletableEntity } from '@contracts/common';

import { ObjectPropertyMetadata, ObjectPropertyType } from './metadata.class';

const deleted: ObjectPropertyMetadata<DeletableEntity> = {
  property: 'deleted',
  type: ObjectPropertyType.Boolean,
  formValidators: [],
  label: 'Deleted',
};

export { deleted };
