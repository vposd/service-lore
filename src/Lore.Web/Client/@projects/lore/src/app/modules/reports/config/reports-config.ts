import { Injectable } from '@angular/core';

import { Entity } from '@contracts/master-data/entity.class';

export enum ReportParamType {
  EntityRef = 'EntityRef',
  DatePeriod = 'DatePeriod'
}

export interface ParamData {
  key: string;
  value: string;
}

export type ParamMapper<T> = (model: T) => ParamData[];

export class ReportParam<T> {
  type: ReportParamType;
  name: string;
  label: string;

  private mapper: ParamMapper<T>;

  constructor(params?: Partial<ReportParam<T>>) {
    Object.assign(this, params || {});
  }

  /** Register params mapper for format params by value */

  registerParamsMapper(mapper: ParamMapper<T>) {
    this.mapper = mapper;
    return this;
  }

  /** Returns params by provided value */
  getParamsByValue(value: T) {
    return this.mapper(value);
  }
}

export class EntityRefParam extends ReportParam<Entity> {
  type = ReportParamType.EntityRef;
  multiple = false;
  source: string;

  constructor(params: Partial<EntityRefParam>) {
    super(params);
  }
}

export class DatePeriodParam extends ReportParam<[Date, Date]> {
  type = ReportParamType.DatePeriod;

  constructor(params?: Partial<DatePeriodParam>) {
    super(params);
  }
}

export class ReportMetadata {
  name: string;
  label: string;
  endpoint: string;
  params: ReportParam<any>[];

  constructor(params: Partial<ReportMetadata>) {
    Object.assign(this, params);
  }
}

@Injectable()
export class ReportsConfig {
  reports: ReportMetadata[];

  setup(reports: ReportMetadata[]) {
    this.reports = reports;
    return this;
  }

  getReport(name: string) {
    return this.reports.find(r => r.name === name);
  }
}
