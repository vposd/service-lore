import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Entity } from '@contracts/common';
import { ObjectPropertyType } from '@contracts/master-data/common/metadata.class';

import { MasterDataSource } from '../config/master-data-config.service';
import { ProcessAction } from '../models/process-action.enum';
import { FormState } from '../models/form-state.class';
import { tap } from 'rxjs/operators';

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

  constructor(fb: FormBuilder) {
    this.form = fb.group({});
  }

  ngOnInit(): void {
    this.sourceParams.metadata.forEach((x) =>
      this.form.addControl(
        x.property as string,
        new FormControl(
          {
            value: this.item ? this.item[x.property] : null,
            disabled: x.readonly,
          },
          x.formValidators
        )
      )
    );

    this.form.valueChanges
      .pipe(tap(console.log))
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
}
