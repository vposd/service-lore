import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@projects/lore/src/environments/environment';
import { format } from '@projects/lore/src/environments/endpoints';
import { ENABLED_CACHE_OPTIONS } from '@common/utils/http-cache/http-cache-constant';
import { PromotionDetail } from '@contracts/loretions/loretion-detail.class';

@Injectable()
export class PromotionsService {
  constructor(private http: HttpClient) {}

  createPromotion(model) {
    return this.http.post(environment.endpoints.data.promotions, model);
  }

  getPromotion(id: string) {
    return this.http.get<PromotionDetail>(
      format(environment.endpoints.promotions.process, { id }),
      ENABLED_CACHE_OPTIONS
    );
  }
}
