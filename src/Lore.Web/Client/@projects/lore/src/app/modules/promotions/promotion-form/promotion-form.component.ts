import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { tap, take } from 'rxjs/operators';

import { Promotion } from '@contracts/master-data/entities/loretion.class';
import { InformationService } from '@common/information/information.service';
import { RequestProgress } from '@common/utils/request-progress/request-progress.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormState } from '@common/utils/form-helpers/form-state.class';
import { PromotionDetailProcessRequest } from '@contracts/loretions/loretion-detail-process.class';

import {
  MasterDataSource,
  MasterDataConfig
} from '../../master-data/config/master-data-config.service';
import { PromotionsService } from '../loretions-service/loretions.service';
import { Row } from '../models/row.class';

@Component({
  selector: 'app-promotion-form',
  templateUrl: './loretion-form.component.html',
  styleUrls: ['./loretion-form.component.scss']
})
export class PromotionFormComponent implements OnInit {
  sourceParams: MasterDataSource<Promotion>;
  savingProgress = new RequestProgress();

  form = new FormGroup({
    details: new FormControl('', Validators.required),
    addressProgram: new FormControl('', Validators.required),
    items: new FormControl('', Validators.required)
  });

  constructor(
    private readonly masterDataConfig: MasterDataConfig,
    private readonly promotions: PromotionsService,
    private cdr: ChangeDetectorRef,
    private readonly information: InformationService
  ) {}

  ngOnInit() {
    this.sourceParams = this.masterDataConfig.getSource('promotions');
  }

  rowsChanged(formState: FormState<{ table: { row: Row }[] }>) {
    const rows = formState.value.table.map(x => x.row);
    const control = this.form.get('items');

    control.setValue(rows);
    control.setErrors(null);
    if (formState.invalid) {
      control.setValue(null);
      control.setErrors({ ...(formState.form.errors || {}), invalid: true });
    }
  }

  save() {
    this.savingProgress.start();
    this.promotions
      .createPromotion(this.getSavingModel())
      .pipe(
        tap(
          () => {
            this.savingProgress.stop();
            this.information.success('Промоакция создана');
            this.cdr.detectChanges();
          },
          error => {
            this.savingProgress.error(error);
            this.information.error(this.savingProgress.state.error);
          }
        ),
        take(1)
      )
      .subscribe();
  }

  onDetailsChanged(formState: FormState<any>) {
    const control = this.form.get('details');
    control.setValue(formState.value);
    control.setErrors(null);
    if (formState.invalid) {
      control.setErrors({ ...(formState.form.errors || {}), invalid: true });
    }
  }

  onSelect(addressProgram) {
    this.form.get('addressProgram').setValue(addressProgram);
  }

  private getSavingModel(): PromotionDetailProcessRequest {
    const addressProgram = this.form
      .get('addressProgram')
      .value.outlets.map(o => o.id);
    const rows = this.form.get('items').value as Row[];
    const details = this.form.get('details').value;
    const items = rows.map(row => row.toDto());

    return {
      name: details.name,
      description: details.description,
      startDate: details.startDate,
      endDate: details.endDate,
      clientId: details.client?.id,
      territoryId: details.territoryId?.id,
      statusId: details.status?.id,
      mechanicId: details.mechanic?.id,
      addressProgram,
      items: items.filter(x => x.baseline.volume && x.plan.volume) // temporary remove empty rows
    };
  }
}
