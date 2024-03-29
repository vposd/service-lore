import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { FormControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { map, switchMap, startWith, debounceTime } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { reject, uniqueId, isArray, isEmpty } from 'lodash';
import { Observable, fromEvent, merge, Subject } from 'rxjs';
import { MatChipInput, MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { FadeIn } from '@common/animations/fade-in-out.animation';
import { Entity } from '@contracts/common';

import { MasterDataService } from '../master-data-service/master-data.service';
import {
  MasterDataSource,
  MasterDataConfig,
} from '../config/master-data-config.service';
import { QueryRequestDataStrategy } from './query-request-data-strategy';
import { DefinedValuesDataStrategy } from './defined-values-data-strategy';
import { RetrieveDataStrategy } from './retrieve-data-strategy';

export type Value<T> = T & { adding: true };
export type SelectionItem<T extends Entity> = Value<T> | Value<T>[];

@Component({
  selector: 'app-autocomplete-selection',
  templateUrl: './autocomplete-selection.component.html',
  styleUrls: ['./autocomplete-selection.component.scss'],
  animations: [FadeIn],
})
export class AutocompleteSelectionComponent<T extends Entity>
  implements OnInit, ControlValueAccessor {
  @Input()
  set source(source: string) {
    if (!source) {
      throw new Error('[Data Selection]: Missing source');
    }
    this._source = source;
    this.sourceParams = this.masterDataConfig.getSource(source);
    this.retrieveDataStrategy = new QueryRequestDataStrategy<Value<T>>(
      this.masterData,
      this.sourceParams,
      this.viewValue
    );
  }
  get source() {
    return this._source;
  }

  @Input()
  set values(values: SelectionItem<T>) {
    this._values = values;
    this.retrieveDataStrategy = new DefinedValuesDataStrategy<Value<T>>(
      values as Value<T>[]
    );
  }
  get values() {
    return this._values;
  }

  get chips() {
    return this.multipleSelection
      ? this.value || []
      : isEmpty(this.value)
      ? []
      : [this.value];
  }

  @Input() viewValue: string;
  @Input() placeholder: string;
  @Input() label: string;
  @Input() multipleSelection = true;

  innerModel = [];
  disabled: boolean;
  separatorKeysCodes = [ENTER, COMMA];
  groupLookupControl = new FormControl();
  lookupValues$: Observable<SelectionItem<T>>;
  query = '';
  value: SelectionItem<T>;

  @ViewChild('lookupInput', { static: true }) lookupInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild(MatChipInput, { static: true })
  chipInput: MatChipInput;

  private sourceParams: MasterDataSource<T>;
  private _source: string;
  private _values: SelectionItem<T>;
  private retrieveDataStrategy: RetrieveDataStrategy<Value<T>>;
  private readonly clearInputValueBroadcast = new Subject<string>();

  constructor(
    @Optional() @Self() ngControl: NgControl,
    private readonly masterData: MasterDataService,
    private readonly masterDataConfig: MasterDataConfig
  ) {
    if (ngControl != null) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    if (this.multipleSelection && !isArray(this.value)) {
      this.value = this.value ? [this.value] : [];
    }
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
        return this.retrieveDataStrategy.getData(query);
      })
    );
  }

  remove(item: Value<T>) {
    if (!this.multipleSelection) {
      this.writeValue(null);
    }
    const value = this.value as Value<T>[];
    this.writeValue(reject(value, (x) => x.id === item.id));
    this.clearValue();
  }

  addItemToAdd(event: MatChipInputEvent) {
    if (!event.value) {
      return;
    }
    const value = ({
      id: event.value,
      [this.viewValue]: event.value,
      adding: true,
    } as unknown) as Value<T>;
    this.add(value);
  }

  select(event: MatAutocompleteSelectedEvent) {
    this.add(event.option.value as Value<T>);
  }

  registerOnChange(fn: (value: SelectionItem<T>) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChange = (value: SelectionItem<T>) => {};

  onTouched = () => {};

  setDisabledState(disabled: boolean) {
    this.chipInput.disabled = disabled;
    this.disabled = disabled;
    if (disabled) {
      return this.groupLookupControl.disable();
    }
    return this.groupLookupControl.enable();
  }

  writeValue(value: SelectionItem<T>) {
    this.value = value;
    this.onChange(this.value);
  }

  private add(item: Value<T>) {
    if (!this.multipleSelection) {
      this.writeValue(item);
      this.clearValue();
      return;
    }
    const value = (this.value as Value<T>[]) || [];
    const index = value?.findIndex((x) => x.id === item.id);
    this.writeValue(
      index < 0
        ? value.concat(item)
        : value.map((x, i) => (i === index ? item : x))
    );
    this.clearValue();
  }

  private clearValue() {
    this.clearInputValueBroadcast.next('');
    this.lookupInput.nativeElement.value = '';
    this.groupLookupControl.setValue(null);
  }
}
