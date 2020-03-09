import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  AbstractControl,
  Validators,
  FormArray
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { isEmpty } from 'lodash';

import { FadeIn } from '@common/animations/fade-in-out.animation';
import { FormState } from '@common/utils/form-helpers/form-state.class';
import { PromotionDetail } from '@contracts/loretions/loretion-detail.class';

import {
  HIGH_LEVEL_COLUMNS,
  SKU_COLUMNS,
  BASELINE_COLUMNS,
  PLAN_COLUMNS,
  FACT_COLUMNS,
  PLANFACT_COLUMNS
} from './common/table-columns-constants';
import { PromotionAddressProgram } from '../loretion-address-program/loretion-address-program.component';
import { Row } from '../../models/row.class';
import { Price } from '../../models/price.class';
import { Summary } from '../../models/summary.class';

@Component({
  selector: 'app-promotion-planning-table',
  templateUrl: './loretion-planning-table.component.html',
  styleUrls: ['./loretion-planning-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [FadeIn]
})
export class PromotionPlanningTableComponent implements OnInit {
  dataSource: MatTableDataSource<AbstractControl>;
  form: FormGroup;
  summary$: Observable<Summary>;

  @Output() formState = new EventEmitter<FormState<any>>();

  @Input()
  set selectionData(value: PromotionAddressProgram) {
    this._selectionData = isEmpty(value)
      ? new PromotionAddressProgram([], [], [], [])
      : value;
    const rows = this.selectionData.products.map(
      p => new Row(p, new Price(150, 375, 300))
    );
    this.updateColumns(rows);
    this.configureDataSource(rows);
  }
  get selectionData() {
    return this._selectionData;
  }

  @Input()
  set promotionDetail(promotionDetail: PromotionDetail) {
    const rows = promotionDetail.items.map(x =>
      new Row(x.product, new Price(150, 375, 300)).fromDto(x)
    );
    this.updateColumns(rows);
    this.configureDataSource(rows);
  }

  @Input() stickyHeader = true;
  @Input() readonly = false;

  highLevelColumns = HIGH_LEVEL_COLUMNS;
  columns = [
    ...SKU_COLUMNS,
    ...BASELINE_COLUMNS,
    ...PLAN_COLUMNS,
    ...FACT_COLUMNS,
    ...PLANFACT_COLUMNS
  ];
  summaryColumns = [
    ...BASELINE_COLUMNS,
    ...PLAN_COLUMNS,
    ...FACT_COLUMNS,
    ...PLANFACT_COLUMNS
  ].map(c => `${c}-summary`);

  private _selectionData: PromotionAddressProgram;

  constructor(private readonly fb: FormBuilder) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {}

  private updateColumns(rows: Row[]) {
    const withoutFact = rows.every(row => row.fact.isEmpty);
    if (!withoutFact) {
      return;
    }
    this.highLevelColumns = ['product', 'baseline', 'plan'];
    this.columns = [...SKU_COLUMNS, ...BASELINE_COLUMNS, ...PLAN_COLUMNS];
    this.summaryColumns = [...BASELINE_COLUMNS, ...PLAN_COLUMNS].map(
      c => `${c}-summary`
    );
  }

  private configureDataSource(rows: Row[]) {
    const array = this.fb.array(
      rows.map(r => {
        const group = this.fb.group({
          row: r,
          baselineVolume: new FormControl(r.baseline.volume, Validators.min(0)),
          baselineRevenue: new FormControl(
            r.baseline.revenue,
            Validators.min(0)
          ),
          planVolume: new FormControl(r.plan.volume, Validators.min(0)),
          planRevenue: new FormControl(r.plan.revenue, Validators.min(0))
        });

        group.valueChanges.subscribe(v => {
          const row: Row = v.row;
          const baselineVolume = Number(v.baselineVolume);
          const baselineRevenue = Number(v.baselineRevenue);
          const planVolume = Number(v.planVolume);
          const planRevenue = Number(v.planRevenue);

          if (
            row.baseline.volume !== baselineVolume &&
            !isNaN(baselineVolume)
          ) {
            row.baseline.volume = baselineVolume;
            group.get('baselineRevenue').setValue(row.baseline.revenue);
            return;
          }
          if (
            row.baseline.revenue !== baselineRevenue &&
            !isNaN(baselineRevenue)
          ) {
            row.baseline.revenue = baselineRevenue;
            group.get('baselineVolume').setValue(row.baseline.volume);
          }

          if (row.plan.volume !== planVolume) {
            row.plan.volume = planVolume;
            group.get('planRevenue').setValue(row.plan.revenue);
            return;
          }
          if (row.plan.revenue !== planRevenue) {
            row.plan.revenue = planRevenue;
            group.get('planVolume').setValue(row.plan.volume);
          }
        });

        return group;
      })
    );
    this.dataSource.data = array.controls;
    this.form = this.fb.group({
      table: array
    });

    this.configureSummator(array);
  }

  private configureSummator(rowsControls: FormArray) {
    this.summary$ = rowsControls.valueChanges.pipe(
      tap(values => this.formState.emit(new FormState(this.form))),
      map(values => new Summary().calc(values.map(r => r.row as Row))),
      startWith(new Summary().calc(rowsControls.value.map(r => r.row as Row)))
    );
  }
}
