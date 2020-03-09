import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take, filter, switchMap } from 'rxjs/operators';

import {
  ReportsConfig,
  ReportMetadata,
  ParamData
} from './config/reports-config';
import { ReportsService } from './reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  reportMetadata$: Observable<ReportMetadata>;
  isFormInvalid = true;

  private params$: Observable<{
    endpoint: string;
    name: string;
    httpParams: HttpParams;
  }>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly reportsConfig: ReportsConfig,
    private readonly reports: ReportsService
  ) {}

  ngOnInit() {
    this.reportMetadata$ = this.route.params.pipe(
      map(({ reportName }) => this.reportsConfig.getReport(reportName))
    );
  }

  onFormChange(form: FormGroup) {
    this.isFormInvalid = form.invalid;
    this.params$ = this.reportMetadata$.pipe(
      take(1),
      filter(() => form.valid),
      map(({ endpoint, name, params }) => {
        const httpParams = params
          .reduce(
            (acc, p) => [...acc, ...p.getParamsByValue(form.value[p.name])],
            []
          )
          .reduce(
            (hp: HttpParams, p: ParamData) => hp.set(p.key, p.value),
            new HttpParams()
          );
        return { endpoint, name, httpParams };
      })
    );
  }

  getReport() {
    return this.params$
      .pipe(
        switchMap(({ endpoint, httpParams }) =>
          this.reports.get(endpoint, httpParams)
        )
      )
      .subscribe();
  }

  export() {
    return this.params$
      .pipe(
        switchMap(({ endpoint, name, httpParams }) =>
          this.reports.export(name, endpoint, httpParams.set('export', 'true'))
        )
      )
      .subscribe(console.log);
  }
}
