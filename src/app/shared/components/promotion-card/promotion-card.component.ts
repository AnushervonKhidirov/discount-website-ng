import {
  PromotionModel,
  CashbackModel,
  DiscountModel,
  PromoCodeModel,
  PromotionType,
} from '@core/models/promotion.model';

import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UploadUrlPipe } from '@core/pipes/upload-url.pipe';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { RatingComponent } from '@component/rating/rating.component';

type UnknownPromotionType = DiscountModel | CashbackModel | PromoCodeModel;

@Component({
  selector: 'promotion-card',
  imports: [
    UploadUrlPipe,
    NzCardModule,
    NzButtonModule,
    NzDividerModule,
    NzSpaceModule,
    NzTypographyModule,
    RatingComponent,
    DatePipe,
  ],
  templateUrl: './promotion-card.component.html',
  styleUrl: './promotion-card.component.css',
})
export class PromotionCardComponent {
  readonly promotion = input.required<PromotionModel>();
  readonly showRating = false;
  promotionItem: PromotionModel | null = null;
  isPromoVisible = false;

  ngOnInit() {
    this.promotionItem = this.promotion();
  }

  showPromoCode() {
    this.isPromoVisible = true;
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
