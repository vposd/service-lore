import {
  Directive,
  Input,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { take, filter } from 'rxjs/operators';

import { DialogsService } from '@common/dialogs/components/dialogs.service';
import { Entity } from '@contracts/common';

import {
  MasterDataSource,
  MasterDataConfig,
} from '../config/master-data-config.service';
import {
  ElasticSelectionFilterComponent,
  SelectionParams,
  ClassifierSelection,
} from './elastic-selection-filter/elastic-selection-filter.component';
import {
  FilterExpression,
  dataFilter,
} from '../master-data-service/filter-expression';

export class ElasticSelectionModel<T> {
  model: ClassifierSelection;
  results: T[];
}

@Directive({
  selector: '[appElasticSelection]',
})
export class ElasticSelectionDirective<T extends Entity> {
  @Input() set source(source: string) {
    if (!source) {
      throw new Error('[DataSelection]: Missing source');
    }
    this.sourceParams = this.masterDataConfig.getSource(source);
  }

  @Input() filterExpression = new FilterExpression();
  @Output() selectionChange = new EventEmitter<ElasticSelectionModel<T>>();

  private sourceParams: MasterDataSource<T>;
  private model: ClassifierSelection = {};

  constructor(
    private readonly masterDataConfig: MasterDataConfig,
    private readonly dialogs: DialogsService
  ) {}

  @HostListener('click')
  onClick() {
    this.dialogs
      .open<ElasticSelectionFilterComponent<T>, SelectionParams<T>>({
        component: ElasticSelectionFilterComponent,
        size: 'md',
        data: {
          sourceParams: this.sourceParams,
          filterExpression: this.filterExpression || dataFilter(),
          model: this.model,
        },
      })
      .afterClosed()
      .pipe(take(1), filter(Boolean))
      .subscribe(({ model, results }) => {
        this.model = model;
        this.selectionChange.emit({ model, results });
      });
  }
}
