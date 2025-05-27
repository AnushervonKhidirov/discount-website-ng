import type { PromoCodeModel } from '@core/models/promotion.model';

import { Component, input } from '@angular/core';
import { formatDate } from '@angular/common';
import { UploadUrlPipe } from '@core/pipes/upload-url.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { RatingComponent } from '@component/rating/rating.component';

@Component({
  selector: 'promo-code-card',
  imports: [UploadUrlPipe, NzButtonModule, NzDividerModule, NzSpaceModule, NzTypographyModule, RatingComponent],
  templateUrl: './promo-code-card.component.html',
  styleUrl: './promo-code-card.component.css',
})
export class PromoCodeCardComponent {
  readonly promotion = input.required<PromoCodeModel>();
  isPromoVisible = false;

  formatDate(date: Date) {
    return formatDate(date, 'dd/MM/YYY', 'en');
  }

  showPromoCode() {
    console.log('asdfsadf');

    this.isPromoVisible = true;
  }
}
