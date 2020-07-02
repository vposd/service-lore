import { HttpParams } from '@angular/common/http';
import { isArray } from 'lodash/fp';
import { isUndefined } from 'lodash';
import {
  ObjectPropertyMetadata,
  ObjectPropertyType,
} from '@contracts/master-data/common/metadata.class';
import { Entity } from '@contracts/common';

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

/**
 * Provides methods for build query data request
 */
export class QueryRequestBuilder {
  static readonly PageSizeDefault = 30;

  private params: HttpParams;
  private pageSize = QueryRequestBuilder.PageSizeDefault;
  private _pageNo = 0;
  private _sortProp = null;
  private _sortDir: SortDirection = null;

  get request() {
    let request =
      this.pageSize === Infinity
        ? this.params
        : this.params
            .set('take', this.pageSize.toString())
            .set('skip', (this.pageSize * this._pageNo).toString());

    if (this._sortProp) {
      const desc = this._sortDir === SortDirection.Desc;
      const prefix = desc ? '-' : '';
      request = request.set('sort', `${prefix}${this._sortProp}`);
    }

    return request;
  }

  get requestParams() {
    return this.params;
  }

  constructor() {
    this.params = new HttpParams();
  }

  setFilter(expression: string) {
    if (!expression) {
      return this;
    }
    this.setParam('filter', expression);
    return this;
  }

  getFilter() {
    return this.params.get('filter');
  }

  setParam(key: string, value: string | string[]) {
    if (isUndefined(value)) {
      return this;
    }
    const paramValue = isArray(value) ? value.join(',') : value;
    this.params = this.params.set(key, paramValue);
    return this;
  }

  setParams(params: Map<string, string | string[]>) {
    if (!params) {
      return this;
    }
    params.forEach((value, key) => this.setParam(key, value));
    return this;
  }

  setPageSize(count: number) {
    this.pageSize = count;
    return this;
  }

  setPage(pageNo: number) {
    this._pageNo = pageNo;
    return this;
  }

  sortByProperty<T extends Entity>(
    metadata: ObjectPropertyMetadata<T>[],
    property: keyof T,
    dir: SortDirection
  ) {
    const propertyMeta = metadata.find((x) => x.property === property);
    const propertyPath =
      propertyMeta.type === ObjectPropertyType.Entity
        ? `${property}/id`
        : (property as string);
    return this.sort(propertyPath, dir);
  }

  sort(propertyPath: string, dir: SortDirection) {
    if (!dir) {
      this._sortDir = null;
      this._sortProp = null;
      return this;
    }
    this._sortProp = propertyPath;
    this._sortDir = dir;
    return this;
  }
}
