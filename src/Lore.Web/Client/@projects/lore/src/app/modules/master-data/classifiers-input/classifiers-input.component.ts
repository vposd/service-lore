import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  forwardRef,
  Input
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { map, switchMap, pluck, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { reject } from 'lodash';
import { Observable, fromEvent, merge, Subject } from 'rxjs';
import { MatChipInput } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { FadeIn } from '@common/animations/fade-in-out.animation';
import { Entity } from '@contracts/master-data/entity.class';
import { CustomInput } from '@common/form-controls/custom-input/custom-input.class';
import { Classifier } from '@contracts/master-data/entities/classifier.class';

import { ClassifiersSelectionDirective } from '../classifiers-selection/classifiers-selection.directive';
import { MasterDataService } from '../master-data-service/master-data.service';
import {
  MasterDataSource,
  MasterDataConfig
} from '../config/master-data-config.service';

const includes = (left: string, right: string) =>
  left.toLowerCase().includes(right.toLowerCase());

@Component({
  selector: 'app-classifiers-input',
  templateUrl: './classifiers-input.component.html',
  styleUrls: ['./classifiers-input.component.scss'],
  animations: [FadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClassifiersInputComponent),
      multi: true
    }
  ]
})
export class ClassifiersInputComponent extends CustomInput<Classifier[]>
  implements OnInit {
  @Input()
  set source(source: string) {
    if (!source) {
      throw new Error('[DataSelection]: Missing source');
    }
    this._source = source;
    this.sourceParams = this.masterDataConfig.getSource(source);
  }
  get source() {
    return this._source;
  }

  @Input() placeholder: string;

  innerModel = [];
  separatorKeysCodes = [ENTER, COMMA];
  groupLookupControl = new FormControl();
  lookupValues$: Observable<Classifier[]>;
  query = '';

  @ViewChild('lookupInput', { static: true }) lookupInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild(ClassifiersSelectionDirective, { static: true })
  classifiersSelection: ClassifiersSelectionDirective;
  @ViewChild(MatChipInput, { static: true })
  chipInput: MatChipInput;

  private sourceParams: MasterDataSource<Entity>;
  private _source: string;
  private readonly clearInputValueBroadcast = new Subject<string>();

  constructor(
    private readonly masterData: MasterDataService,
    private readonly masterDataConfig: MasterDataConfig
  ) {
    super();
    this.innerModelChanged.subscribe(model => {
      this.onChange(model);
      this.onTouched();
    });
  }

  ngOnInit() {
    this.lookupValues$ = merge(
      fromEvent(this.lookupInput.nativeElement, 'input').pipe(
        map(event => (event.target as HTMLInputElement).value)
      ),
      this.clearInputValueBroadcast.asObservable()
    ).pipe(
      startWith(''),
      switchMap(query => {
        this.query = query;
        return this.masterData
          .getClassifiers(this.sourceParams.entityName)
          .pipe(
            pluck('results'),
            map(classifiers =>
              this.query
                ? classifiers
                    .filter(c =>
                      c.values.some(v => includes(v.name, this.query))
                    )
                    .map(c => ({
                      ...c,
                      values: c.values.filter(v => includes(v.name, this.query))
                    }))
                : classifiers
            )
          );
      })
    );
  }

  remove(value: Classifier) {
    this.value = reject(this.value, x => x.id === value.id);
    this.clearValue();
  }

  select(event: MatAutocompleteSelectedEvent) {
    const [group, value] = event.option.value;
    const selected = { ...group, values: [value] };

    this.add(selected);
  }

  private add(item: Classifier) {
    const index = this.value.findIndex(x => x.id === item.id);
    this.value =
      index < 0
        ? this.value.concat({ ...item, values: [item.values[0]] })
        : this.value.map((x, i) =>
            i === index ? { ...item, values: [item.values[0]] } : x
          );

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
