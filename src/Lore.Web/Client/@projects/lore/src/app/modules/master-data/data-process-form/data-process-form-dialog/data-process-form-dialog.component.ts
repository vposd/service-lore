import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { InformationService } from '@common/information/information.service';
import { Entity, OperationResult } from '@contracts/common';
import { RequestProgress } from '@common/utils/request-progress/request-progress.class';

import { MasterDataSource } from '../../config/master-data-config.service';
import { ProcessAction } from '../../models/process-action.enum';
import { FormState } from '../../models/form-state.class';
import { MasterDataService } from '../../master-data-service/master-data.service';

export class DataProcessFormData<T extends Entity> {
  sourceParams: MasterDataSource<T>;
  processAction: ProcessAction;
  item: T;
}

@Component({
  selector: 'app-data-process-form-dialog',
  templateUrl: './data-process-form-dialog.component.html',
  styleUrls: ['./data-process-form-dialog.component.scss'],
})
export class DataProcessFormDialogComponent<T extends Entity>
  implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) readonly params: DataProcessFormData<T>,
    readonly dialogRef: MatDialogRef<DataProcessFormDialogComponent<T>>,
    private readonly masterData: MasterDataService,
    private readonly info: InformationService
  ) {}

  readonly processActionEnum = ProcessAction;
  readonly requestProgress = new RequestProgress();
  formState: FormState<T>;

  ngOnInit(): void {
    console.log(this.params);
  }

  onFormChange(formState: FormState<T>) {
    this.formState = formState;
  }

  save() {
    if (!this.formState.valid) {
      return;
    }

    let saving: Observable<OperationResult>;
    if (this.params.processAction === ProcessAction.Edit) {
      saving = this.masterData.update(
        this.params.sourceParams.endpoint + `/${this.formState.value.id}`,
        this.formState.value
      );
    }

    if (
      this.params.processAction === ProcessAction.Create ||
      this.params.processAction === ProcessAction.Clone
    ) {
      saving = this.masterData.create(
        this.params.sourceParams.endpoint,
        this.formState.value
      );
    }

    this.requestProgress.start();
    return saving
      .pipe(
        take(1),
        tap(
          (x) => {
            this.requestProgress.stop();
            this.dialogRef.close(x);
          },
          (error) => {
            this.requestProgress.error(error);
            this.info.error(this.requestProgress.state.error);
          }
        )
      )
      .subscribe();
  }
}
