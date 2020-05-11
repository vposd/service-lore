import {
  Component,
  OnInit,
  ElementRef,
  Optional,
  Self,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { NgControl, ControlValueAccessor } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

import {
  SelectComponent,
  SelectValue,
} from '@common/form-controls/select/select.component';
import { RequestProgress } from '@common/utils/request-progress/request-progress.class';
import { Entity } from '@contracts/common';

import {
  MasterDataConfig,
  MasterDataSource,
} from '../config/master-data-config.service';
import { MasterDataService } from '../master-data-service/master-data.service';
import { QueryRequestBuilder } from '../master-data-service/query-request-builder.class';
import {
  dataFilter,
  PropertyExpression,
} from '../master-data-service/filter-expression';

@Component({
  selector: 'app-simple-selection',
  templateUrl: './simple-selection.component.html',
  styleUrls: ['./simple-selection.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: SimpleSelectionComponent,
    },
  ],
})
export class SimpleSelectionComponent<T extends Entity>
  extends SelectComponent<SelectValue<T>>
  implements OnInit, ControlValueAccessor, MatFormFieldControl<SelectValue<T>> {
  @Input()
  set source(source: string) {
    if (!source) {
      throw new Error('[DataSelection]: Missing source');
    }
    this.sourceParams = this.masterDataConfig.getSource(source);
  }

  @Input() required = false;
  @Input() ignorePagination = false;

  /** External additional params for query data request */
  @Input() filterExpression = dataFilter();
  @Output() propertyExpressionChange = new EventEmitter<PropertyExpression>();

  values$: Observable<T[]>;
  values = [];
  requestProgress = new RequestProgress();

  private sourceParams: MasterDataSource<T>;

  constructor(
    @Optional() @Self() ngControl: NgControl,
    _focusMonitor: FocusMonitor,
    _elementRef: ElementRef<HTMLElement>,
    private readonly masterDataConfig: MasterDataConfig,
    private readonly masterData: MasterDataService
  ) {
    super(_focusMonitor, _elementRef, ngControl);
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.requestProgress.start();
    super.ngOnInit();
  }

  openChange(event: boolean) {
    const query = new QueryRequestBuilder().setFilter(
      this.filterExpression.toString()
    );

    if (this.ignorePagination) {
      query.setPageSize(Infinity);
    }
    if (!this.sourceParams) {
      this.requestProgress.stop(true);
      return;
    }
    this.values$ = this.masterData
      .query<T>(this.sourceParams.endpoint, query.request, true)
      .pipe(
        pluck('results'),
        tap(
          (values) => {
            this.requestProgress.stop(!!values.length);
            this.values = values;
            this.virtualScrollEnabled = values.length > 50;
          },
          (error) => this.requestProgress.error(error)
        )
      );
    super.openChange(event);
  }

  compareWith(a: T, b: T) {
    return (a && a.id) === (b && b.id);
  }
}
