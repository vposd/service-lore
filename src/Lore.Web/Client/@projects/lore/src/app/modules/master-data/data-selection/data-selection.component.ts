import {
  Component,
  Input,
  ChangeDetectionStrategy,
  forwardRef,
  HostListener,
  ChangeDetectorRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { filter, tap, take } from 'rxjs/operators';
import { isEmpty } from 'lodash/fp';

import { DialogsService } from '@common/dialogs/components/dialogs.service';
import { Entity } from '@contracts/master-data/entity.class';
import { CustomInput } from '@common/form-controls/custom-input/custom-input.class';

import {
  DataSelectionTableComponent,
  DataSelection
} from './data-selection-table/data-selection-table.component';
import {
  MasterDataConfig,
  MasterDataSource
} from '../config/master-data-config.service';

@Component({
  selector: 'app-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DataSelectionComponent),
      multi: true
    }
  ]
})
export class DataSelectionComponent<T extends Entity> extends CustomInput<
  string[]
> {
  isDeleted: boolean;

  get isEmpty() {
    return isEmpty(this.value);
  }

  get viewValue() {
    if (this.isEmpty) {
      return '';
    }

    return this.getPluralElementsValue(this.value.length);
  }

  @Input() set source(source: string) {
    if (!source) {
      throw new Error('[DataSelection]: Missing source');
    }
    this.sourceParams = this.masterDataConfig.getSource(source);
  }

  @Input() label = '';
  @Input() multipleSelection = false;
  @Input() forbidden = false;

  private sourceParams: MasterDataSource<T>;

  constructor(
    private readonly masterDataConfig: MasterDataConfig,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialogs: DialogsService
  ) {
    super();
    this.innerModelChanged.subscribe(model => {
      this.onChange(model);
      this.onTouched();
    });
  }

  @HostListener('keyup.delete')
  clearModel() {
    this.innerModel = null;
    this.innerModelChanged.next(null);
  }

  @HostListener('keyup.enter')
  openSelection() {
    this.dialogs
      .open<DataSelectionTableComponent<T>, DataSelection<T>>({
        component: DataSelectionTableComponent,
        size: 'lg',
        data: {
          sourceParams: this.sourceParams,
          multipleSelection: this.multipleSelection,
          selected: this.value || []
        }
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((value: string[]) => (this.value = value)),
        take(1)
      )
      .subscribe(() => this.cdr.markForCheck());
  }

  private getPluralElementsValue(count: number) {
    if (!count) {
      return '';
    }

    if (count === 1) {
      return `1 элемент`;
    }

    return count < 5 ? `${count} элемента` : `${count} элементов`;
  }
}
