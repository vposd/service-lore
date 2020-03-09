import 'reflect-metadata';

const ColumnMetadataKey = 'Metadata:ColumnMetadataKey';

export const Column = (displayName: string = null) => <T>(
  target: T,
  key: keyof T
) => {
  const cols =
    Reflect.getMetadata(ColumnMetadataKey, target) || new Map<string, string>();
  cols.set(key, displayName);
  Reflect.defineMetadata(ColumnMetadataKey, cols, target);
};

export const getColumns = <T>(target: T) =>
  Reflect.getMetadata(ColumnMetadataKey, target) as Map<string, string>;
export const getColumnsKeys = <T>(target: T) =>
  Array.from(getColumns(target).keys());
