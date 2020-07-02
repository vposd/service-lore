import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

import { Entity, SimpleEntity } from '@contracts/common';
import {
  ObjectPropertyType,
  ObjectPropertyMetadata,
} from '@contracts/master-data/common/metadata.class';

import { MasterDataSource } from '../../../config/master-data-config.service';

@Component({
  selector: 'app-data-cell',
  templateUrl: './data-cell.component.html',
  styleUrls: ['./data-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataCellComponent<T extends Entity> implements OnInit {
  @Input() sourceParams: MasterDataSource<T>;
  @Input() value: string | number | boolean | SimpleEntity;
  @Input() set property(value: keyof T) {
    this.metadata = this.sourceParams.metadata.find(
      (x) => x.property === value
    );
  }

  metadata: ObjectPropertyMetadata<T>;

  readonly dataType = ObjectPropertyType;

  constructor() {}

  ngOnInit(): void {}
}
