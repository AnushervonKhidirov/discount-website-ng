import type { PromotionModel } from '@core/models/promotion.model';
import type { FindParams } from '@core/models/http.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Endpoint } from '@constant/endpoint.constant';
import { convertFindParams, showHttpErrorMessage } from '@helper/http.helper';

@Injectable({ providedIn: 'root' })
export class PromotionService {
  constructor(private readonly http: HttpClient) {}

  get(id: number, notification?: NzNotificationService) {
    return this.http.get<PromotionModel>(Endpoint.Promotion, { params: { id } }).pipe(
      tap({
        error: err => showHttpErrorMessage(err, notification),
      }),
      map(promotion => this.convertDates(promotion)),
    );
  }

  getAll(params?: FindParams<PromotionModel>, notification?: NzNotificationService) {
    return this.http
      .get<PromotionModel[]>(Endpoint.Promotions, { params: convertFindParams(params) })
      .pipe(
        tap({
          error: err => showHttpErrorMessage(err, notification),
        }),
        map(promotions => promotions.map(promotion => this.convertDates(promotion))),
      );
  }

  private convertDates(promotion: PromotionModel): PromotionModel {
    const company = {
      ...promotion.company,
      createdAt: new Date(promotion.company.createdAt),
      updatedAt: new Date(promotion.company.updatedAt),
    };

    const stores = promotion.stores.map(store => ({
      ...store,
      createdAt: new Date(store.createdAt),
      updatedAt: new Date(store.updatedAt),
    }));

    const bank = promotion.bank
      ? {
          ...promotion.bank,
          createdAt: new Date(promotion.bank.createdAt),
          updatedAt: new Date(promotion.bank.updatedAt),
        }
      : null;

    return {
      ...promotion,
      startAt: new Date(promotion.startAt),
      endAt: new Date(promotion.endAt),
      createdAt: new Date(promotion.createdAt),
      updatedAt: new Date(promotion.updatedAt),
      company,
      stores,
      bank,
    };
  }
}
