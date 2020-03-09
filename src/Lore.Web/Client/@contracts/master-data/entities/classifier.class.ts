import { Entity } from '../entity.class';
import { SimpleEntity } from '../simplie-entity.class';

export class Classifier extends Entity {
  name: string;
  values: SimpleEntity[];
}
