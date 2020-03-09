import 'reflect-metadata';

const DataTypeMetadataKey = 'Metadata:DataTypeMetadataKey';

export enum DataType {
  Date = 0,
  DateTime = 1,
  String = 2,
  Number = 3,
  Entity = 4
}

export interface TypeParams {
  type: DataType;
  referenceTo?: string;
}

export const Type = (params: TypeParams) => <T>(target: T, key: keyof T) => {
  const cols =
    Reflect.getMetadata(DataTypeMetadataKey, target) ||
    new Map<string, string>();
  cols.set(key, params || { type: DataType.String });
  Reflect.defineMetadata(DataTypeMetadataKey, cols, target);
};

export const getDataTypes = <T>(target: T) =>
  (Reflect.getMetadata(DataTypeMetadataKey, target) as Map<
    keyof T,
    TypeParams
  >) || new Map<keyof T, TypeParams>();

export const getDataType = <T>(target: T, property: string) =>
  getDataTypes(target).get(property as keyof T);
