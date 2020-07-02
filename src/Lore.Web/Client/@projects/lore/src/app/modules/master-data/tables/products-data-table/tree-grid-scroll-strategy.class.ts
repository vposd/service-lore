import {
  FixedSizeVirtualScrollStrategy,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';

import { Injectable } from '@angular/core';

@Injectable()
export class TreeGridScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    super(32, 1000, 2000);
  }

  attach(viewport: CdkVirtualScrollViewport) {
    this.onDataLengthChanged();
  }
}
