import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Entity } from '@contracts/common';
import {
  ObjectPropertyType,
  ObjectPropertyMetadata,
} from '@contracts/master-data/common/metadata.class';

import { MasterDataSource } from '../config/master-data-config.service';
import { ProcessAction } from '../models/process-action.enum';
import { FormState } from '../models/form-state.class';
import { EnumsService } from '../enums/enums.service';

@Component({
  selector: 'app-data-process-form',
  templateUrl: './data-process-form.component.html',
  styleUrls: ['./data-process-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataProcessFormComponent<T extends Entity> implements OnInit {
  @Input() sourceParams: MasterDataSource<T>;
  @Input() process: ProcessAction;
  @Input() item: T;
  @Output() formChange = new EventEmitter<FormState<T>>();

  readonly dataType = ObjectPropertyType;
  readonly form: FormGroup;

  constructor(fb: FormBuilder, private readonly enums: EnumsService) {
    this.form = fb.group({});
  }

  ngOnInit(): void {
    this.sourceParams.metadata.forEach((x) =>
      this.form.addControl(
        x.property as string,
        new FormControl(
          {
            value: this.item ? this.getValue(x) : this.getDefaultValue(x.type),
            disabled: x.readonly,
          },
          x.formValidators
        )
      )
    );

    this.form.valueChanges
      .pipe(
        map((x) =>
          Object.keys(x).reduce((value, key) => {
            const meta = this.sourceParams.metadata.find(
              (m) => m.property === key
            );
            if (meta.type === ObjectPropertyType.Entity) {
              value[`${key}Id`] = x[key]?.id;
              return value;
            }
            value[key] =
              meta.type === ObjectPropertyType.Enum ? x[key]?.id : x[key];
            return value;
          }, {} as T)
        )
      )
      .subscribe((x) =>
        this.formChange.emit(
          new FormState(
            this.process === ProcessAction.Edit
              ? { id: this.item.id, ...x }
              : x,
            this.form.valid
          )
        )
      );
  }

  getEnumValues(enumName: string) {
    return this.enums.getValues(enumName);
  }

  private getValue(meta: ObjectPropertyMetadata<T>) {
    return meta.type === ObjectPropertyType.Enum
      ? this.getEnumValues(meta.enumName).find(
          (x) => x.id === this.item[meta.property as string]
        )
      : this.item[meta.property];
  }

  private getDefaultValue(type: ObjectPropertyType) {
    switch (type) {
      case ObjectPropertyType.String:
        return '';
      case ObjectPropertyType.Boolean:
        return false;

      default:
        return null;
    }
  }
}
