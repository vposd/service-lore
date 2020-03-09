import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
  forwardRef
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Observable } from 'rxjs';
import { pluck, take, tap } from 'rxjs/operators';
import { isEmpty, merge, flatMap, first } from 'lodash';

import { Entity } from '@contracts/master-data/entity.class';
import {
  getDataTypes,
  DataType
} from '@common/utils/decorators/data-type.decorator';
import { Classifier } from '@contracts/master-data/entities/classifier.class';
import { RequestProgress } from '@common/utils/request-progress/request-progress.class';
import { CustomInput } from '@common/form-controls/custom-input/custom-input.class';

import {
  MasterDataSource,
  MasterDataConfig
} from '../../config/master-data-config.service';
import { MasterDataService } from '../../master-data-service/master-data.service';
import { QueryRequestBuilder } from '../../master-data-service/query-request-builder.class';
import { FilterExpression } from '../../master-data-service/filter-expression';
import { isArray } from 'util';

export class SelectionParams<T extends Entity> {
  sourceParams: MasterDataSource<T>;
  filterExpression: FilterExpression;
  model: ClassifierSelection;
}

class PropertyReference<T extends Entity> {
  prop: keyof T;
  params: MasterDataSource<T>;
}

export class ClassifierSelection {
  [key: string]: Classifier;
}

@Component({
  selector: 'app-elastic-selection-filter',
  templateUrl: './elastic-selection-filter.component.html',
  styleUrls: ['./elastic-selection-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ElasticSelectionFilterComponent),
      multi: true
    }
  ]
})
export class ElasticSelectionFilterComponent<T extends Entity>
  extends CustomInput<ClassifierSelection>
  implements OnInit {
  refProps: PropertyReference<T>[];
  classifiers$: Observable<Classifier[]>;
  selectProgress = new RequestProgress();
  requestProgress = new RequestProgress();
  form: FormGroup;
  selectedIds: string[];

  private classifiers: Classifier[];

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly params: SelectionParams<T>,
    readonly dialogRef: MatDialogRef<ElasticSelectionFilterComponent<T>>,
    private readonly masterData: MasterDataService,
    private readonly masterDataConfig: MasterDataConfig,
    private formBuilder: FormBuilder
  ) {
    super();
    this.innerModelChanged.subscribe(model => {
      this.onChange(model);
      this.onTouched();
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.requestProgress.start();
    this.classifiers$ = this.masterData
      .getClassifiers(this.params.sourceParams.entityName)
      .pipe(
        pluck('results'),
        tap(values => this.createForm(values)),
        tap(() => this.requestProgress.stop())
      );

    this.refProps = Array.from(getDataTypes<T>(this.params.sourceParams.entity))
      .map(([prop, params]) => ({ prop, params }))
      .filter(v => v.params.type === DataType.Entity)
      .map(v => ({
        prop: v.prop,
        params: this.masterDataConfig.getSource(v.prop.toString())
      }))
      .filter(v => v.params);

    this.form.valueChanges.subscribe(value => {
      this.value = Object.keys(value)
        .filter(key => !isEmpty(value[key]))
        .map(key => {
          const classifier = this.classifiers.find(c => c.id === key);
          if (!classifier) {
            return;
          }

          return {
            [key]: {
              ...classifier,
              values: isArray(value[key]) ? value[key] : [value[key]]
            }
          };
        })
        .reduce(merge, {});
    });
  }

  select() {
    this.selectProgress.start();
    const selectedIds = flatMap(
      Object.values(this.value).map(x => x.values),
      x => x.map(v => v.id)
    );

    this.masterData
      .query<T>(
        this.params.sourceParams.endpoint,
        new QueryRequestBuilder()
          .setParam('classifiersIds', selectedIds)
          .setFilter(this.params.filterExpression.toString())
          .setPageSize(Infinity).request
      )
      .pipe(take(1))
      .subscribe(data => {
        this.selectProgress.stop();
        this.dialogRef.close({ model: this.value, results: data.results });
      });
  }

  compareWith(a: T, b: T) {
    return (a && a.id) === (b && b.id);
  }

  private createForm(classifiers: Classifier[]) {
    this.classifiers = classifiers;

    classifiers.forEach(classifier => {
      const values = this.params.model[classifier.id]
        ? this.params.model[classifier.id].values
        : [];
      this.form.addControl(classifier.id, new FormControl(first(values)));
    });
  }
}
