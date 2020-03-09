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
import { pluck, tap } from 'rxjs/operators';
import { isEmpty, first } from 'lodash';
import { isArray } from 'util';

import { Entity } from '@contracts/master-data/entity.class';
import { Classifier } from '@contracts/master-data/entities/classifier.class';
import { RequestProgress } from '@common/utils/request-progress/request-progress.class';
import { CustomInput } from '@common/form-controls/custom-input/custom-input.class';

import { MasterDataSource } from '../../config/master-data-config.service';
import { MasterDataService } from '../../master-data-service/master-data.service';

export class SelectionParams<T extends Entity> {
  sourceParams: MasterDataSource<T>;
  model: Classifier[];
}

@Component({
  selector: 'app-classifiers-selection-filter',
  templateUrl: './classifiers-selection-filter.component.html',
  styleUrls: ['./classifiers-selection-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClassifiersSelectionFilterComponent),
      multi: true
    }
  ]
})
export class ClassifiersSelectionFilterComponent<T extends Entity>
  extends CustomInput<Classifier[]>
  implements OnInit {
  classifiers$: Observable<Classifier[]>;
  requestProgress = new RequestProgress();
  form: FormGroup;

  private classifiers: Classifier[];

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly params: SelectionParams<T>,
    readonly dialogRef: MatDialogRef<ClassifiersSelectionFilterComponent<T>>,
    private readonly masterData: MasterDataService,
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

    this.form.valueChanges.subscribe(value => {
      this.value = Object.keys(value)
        .filter(key => !isEmpty(value[key]))
        .map(key => {
          const classifier = this.classifiers.find(c => c.id === key);
          if (!classifier) {
            return;
          }

          return {
            ...classifier,
            values: isArray(value[key]) ? value[key] : [value[key]]
          };
        });
    });
  }

  select() {
    this.dialogRef.close(this.value);
  }

  compareWith(a: T, b: T) {
    return (a && a.id) === (b && b.id);
  }

  private createForm(classifiers: Classifier[]) {
    this.classifiers = classifiers;

    classifiers.forEach(classifier => {
      const found = this.params.model.find(x => x.id === classifier.id);
      const values = found ? found.values : [];
      this.form.addControl(classifier.id, new FormControl(first(values)));
    });
  }
}
