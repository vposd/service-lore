import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
  Optional,
  Inject,
  forwardRef
} from '@angular/core';

import { take, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Promotion } from '@contracts/master-data/entities/loretion.class';
import { RequestProgress } from '@common/utils/request-progress/request-progress.class';

import { PromotionsService } from '../../loretions-service/loretions.service';
import { PromotionDetail } from '@contracts/loretions/loretion-detail.class';

@Component({
  selector: 'app-promotions-grid-expanded',
  templateUrl: './loretions-grid-expanded.component.html',
  styleUrls: ['./loretions-grid-expanded.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionsGridExpandedComponent implements OnInit, OnDestroy {
  @Input() promotion: Promotion;

  promotionDetail$: Observable<PromotionDetail>;
  requestProgress = new RequestProgress();

  constructor(private readonly promotions: PromotionsService) {}

  ngOnInit() {
    this.requestProgress.start();
    this.promotionDetail$ = this.promotions
      .getPromotion(this.promotion.id)
      .pipe(
        tap(
          () => this.requestProgress.stop(),
          error => this.requestProgress.error(error)
        )
      );
  }

  ngOnDestroy() {}
}
