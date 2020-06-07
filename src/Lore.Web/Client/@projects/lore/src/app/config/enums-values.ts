import { AttributeObject, AttributeValueType } from '@contracts/enums';

export const enumsValues = {
  AttributeObject: [
    { id: AttributeObject.Device, name: 'Device' },
    { id: AttributeObject.OrderDevice, name: 'OrderDevice' },
  ],
  AttributeValueType: [
    {
      id: AttributeValueType.ListMultipleValue,
      name: 'Select multiple value',
    },
    {
      id: AttributeValueType.ListSingleValue,
      name: 'Select single value',
    },
  ],
};
