import {
  Directive,
  Input,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';
import { take, filter } from 'rxjs/operators';

import { Entity } from '@contracts/master-data/entity.class';
import { DialogsService } from '@common/dialogs/components/dialogs.service';

import {
  MasterDataSource,
  MasterDataConfig
} from '../config/master-data-config.service';
import { FilterExpression } from '../master-data-service/filter-expression';
import {
  SelectionParams,
  ClassifiersSelectionFilterComponent
} from './classifiers-selection-filter/classifiers-selection-filter.component';
import { Classifier } from '@contracts/master-data/entities/classifier.class';

@Directive({
  selector: '[appClassifiersSelection]'
})
export class ClassifiersSelectionDirective {
  @Input()
  set source(source: string) {
    if (!source) {
      throw new Error('[DataSelection]: Missing source');
    }
    this.sourceParams = this.masterDataConfig.getSource(source);
  }

  @Input()
  set selection(value: Classifier[]) {
    this._selection = value;
    this.selectionChange.emit(value);
  }
  get selection() {
    return this._selection;
  }

  @Output() selectionChange = new EventEmitter<Classifier[]>();

  private sourceParams: MasterDataSource<any>;
  private _selection: Classifier[];

  constructor(
    private readonly masterDataConfig: MasterDataConfig,
    private readonly dialogs: DialogsService
  ) {}

  @HostListener('click')
  onClick() {
    this.dialogs
      .open<
        ClassifiersSelectionFilterComponent<Entity>,
        SelectionParams<Entity>
      >({
        component: ClassifiersSelectionFilterComponent,
        size: 'md',
        data: {
          sourceParams: this.sourceParams,
          model: this.selection
        }
      })
      .afterClosed()
      .pipe(take(1), filter(Boolean))
      .subscribe((value: Classifier[]) => (this.selection = value));
  }
}
