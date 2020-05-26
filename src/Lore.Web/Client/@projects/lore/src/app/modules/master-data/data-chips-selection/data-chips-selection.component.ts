import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  forwardRef,
  Input,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { map, switchMap, pluck, startWith, debounceTime } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { reject } from 'lodash';
import { Observable, fromEvent, merge, Subject } from 'rxjs';
import { MatChipInput } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { FadeIn } from '@common/animations/fade-in-out.animation';
import { CustomInput } from '@common/form-controls/custom-input/custom-input.class';
import { Entity } from '@contracts/common';

import { MasterDataService } from '../master-data-service/master-data.service';
import {
  MasterDataSource,
  MasterDataConfig,
} from '../config/master-data-config.service';
import { QueryRequestBuilder } from '../master-data-service/query-request-builder.class';
import { property } from '../master-data-service/filter-expression';

@Component({
  selector: 'app-data-chips-selection',
  templateUrl: './data-chips-selection.component.html',
  styleUrls: ['./data-chips-selection.component.scss'],
  animations: [FadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DataChipsSelectionComponent),
      multi: true,
    },
  ],
})
export class DataChipsSelectionComponent<T extends Entity>
  extends CustomInput<T[]>
  implements OnInit {
  @Input()
  set source(source: string) {
    if (!source) {
      throw new Error('[DataSelection]: Missing source');
    }
    this._source = source;
    this.sourceParams = this.masterDataConfig.getSource(source);
    console.log(this);
  }
  get source() {
    return this._source;
  }

  @Input() viewValuePath: string;
  @Input() placeholder: string;

  innerModel = [];
  separatorKeysCodes = [ENTER, COMMA];
  groupLookupControl = new FormControl();
  lookupValues$: Observable<T[]>;
  query = '';

  @ViewChild('lookupInput', { static: true }) lookupInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild(MatChipInput, { static: true })
  chipInput: MatChipInput;

  private sourceParams: MasterDataSource<T>;
  private _source: string;
  private readonly clearInputValueBroadcast = new Subject<string>();

  constructor(
    private readonly masterData: MasterDataService,
    private readonly masterDataConfig: MasterDataConfig
  ) {
    super();
    this.innerModelChanged.subscribe((model) => {
      this.onChange(model);
      this.onTouched();
    });
  }

  ngOnInit() {
    this.lookupValues$ = merge(
      fromEvent(this.lookupInput.nativeElement, 'input').pipe(
        map((event) => (event.target as HTMLInputElement).value)
      ),
      this.clearInputValueBroadcast.asObservable()
    ).pipe(
      startWith(''),
      debounceTime(250),
      switchMap((query) => {
        this.query = query;
        const builder = query
          ? new QueryRequestBuilder().setFilter(
              property(this.viewValuePath).contains(query)
            )
          : new QueryRequestBuilder();
        const request = builder.setPageSize(20).request;
        return this.masterData
          .query<T>(this.sourceParams.endpoint, request)
          .pipe(map(({ results }) => results));
      })
    );
  }

  remove(value: T) {
    this.value = reject(this.value, (x) => x.id === value.id);
    this.clearValue();
  }

  select(event: MatAutocompleteSelectedEvent) {
    this.add(event.option.value as T);
  }

  private add(item: T) {
    const index = this.value.findIndex((x) => x.id === item.id);
    this.value =
      index < 0
        ? this.value.concat(item)
        : this.value.map((x, i) => (i === index ? item : x));

    this.clearValue();
  }

  setDisabledState(disabled: boolean) {
    super.setDisabledState(disabled);
    this.chipInput.disabled = disabled;
    if (disabled) {
      return this.groupLookupControl.disable();
    }
    return this.groupLookupControl.enable();
  }

  private clearValue() {
    this.clearInputValueBroadcast.next('');
    this.lookupInput.nativeElement.value = '';
    this.groupLookupControl.setValue(null);
  }
}
