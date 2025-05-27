import {
  PromotionModel,
  DiscountModel,
  CashbackModel,
  PromoCodeModel,
  PromotionType,
} from '@core/models/promotion.model';

import { Component } from '@angular/core';
import { PromotionService } from '@core/services/promotion.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzCardModule } from 'ng-zorro-antd/card';
import { GridComponent } from '@component/grid/grid.component';
import { DiscountCardComponent } from '@component/promotions/discount/discount-card.component';
import { CashbackCardComponent } from '@component/promotions/cashback/cashback-card.component';
import { PromoCodeCardComponent } from '@component/promotions/promo-code/promo-code-card.component';

type UnknownPromotionType = DiscountModel | CashbackModel | PromoCodeModel;

@Component({
  selector: 'app-promotion',
  imports: [
    NzCardModule,
    GridComponent,
    DiscountCardComponent,
    CashbackCardComponent,
    PromoCodeCardComponent,
  ],
  providers: [PromotionService],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css',
})
export class PromotionComponent {
  constructor(
    private readonly promotionService: PromotionService,
    private readonly notification: NzNotificationService,
  ) {}

  promotions: PromotionModel[] = [];

  ngOnInit() {
    this.promotionService.getAll(undefined, this.notification).subscribe(promotions => {
      this.promotions = promotions;
    });
  }

  isDiscount(promotion: UnknownPromotionType): promotion is DiscountModel {
    return promotion.type === PromotionType.DISCOUNT;
  }

  isCashback(promotion: UnknownPromotionType): promotion is CashbackModel {
    return promotion.type === PromotionType.CASHBACK;
  }

  isPromoCode(promotion: UnknownPromotionType): promotion is PromoCodeModel {
    return promotion.type === PromotionType.PROMO_CODE;
  }
}
