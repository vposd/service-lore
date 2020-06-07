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
import { Observable, of } from 'rxjs';
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

interface RetrieveDataStrategy<T> {
  getData(): Observable<T[]>;
}

class QueryRequestDataStrategy<T extends Entity>
  implements RetrieveDataStrategy<T> {
  constructor(
    private readonly masterData: MasterDataService,
    private filterExpression = dataFilter(),
    private ignorePagination: boolean,
    private sourceParams: MasterDataSource<T>,
    private requestProgress: RequestProgress
  ) {}

  getData() {
    if (!this.sourceParams) {
      this.requestProgress.stop(true);
      return of([]);
    }

    const query = new QueryRequestBuilder().setFilter(
      this.filterExpression.toString()
    );

    if (this.ignorePagination) {
      query.setPageSize(Infinity);
    }
    return this.masterData
      .query<T>(this.sourceParams.endpoint, query.request, true)
      .pipe(pluck('results'));
  }
}

class DefinedValuesDataStrategy<T extends Entity>
  implements RetrieveDataStrategy<T> {
  constructor(private readonly values: T[]) {}

  getData() {
    return of(this.values);
  }
}

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
    this.retrieveDataStrategy = new QueryRequestDataStrategy(
      this.masterData,
      this.filterExpression,
      this.ignorePagination,
      this.sourceParams,
      this.requestProgress
    );
  }

  @Input() set values(values: T[]) {
    this.retrieveDataStrategy = new DefinedValuesDataStrategy<T>(values);
  }

  @Input() required = false;
  @Input() ignorePagination = false;
  @Input() viewValue = 'name';

  /** External additional params for query data request */
  @Input() filterExpression = dataFilter();
  @Output() propertyExpressionChange = new EventEmitter<PropertyExpression>();

  values$: Observable<T[]>;
  retrievedValues = [];
  requestProgress = new RequestProgress();

  private retrieveDataStrategy: RetrieveDataStrategy<T>;
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
    this.openChange(false);
  }

  openChange(event: boolean) {
    this.values$ = this.retrieveDataStrategy.getData().pipe(
      tap(
        (values) => {
          this.requestProgress.stop(!!values.length);
          this.retrievedValues = values;
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
