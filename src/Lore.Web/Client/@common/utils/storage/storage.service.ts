import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { isUndefined } from 'lodash';

import { Logger } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  static updated = new Subject<any>();

  constructor(private logger: Logger) {}

  set(key: string, data: any, withoutUpdateEvent?: boolean) {
    if (isUndefined(data)) {
      return;
    }
    const lastData = localStorage.getItem(key);
    const nextData = JSON.stringify(data);
    const shouldUpdate = nextData !== lastData;

    if (!shouldUpdate) {
      return;
    }

    localStorage.setItem(key, nextData);
    if (!withoutUpdateEvent) {
      StorageService.updated.next(key);
    }
  }

  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      this.logger.error(`[Storage] Error parsing key ${key}`);
    }
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

  clean() {
    localStorage.clear();
  }
}
