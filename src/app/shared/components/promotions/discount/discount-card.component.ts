import type { DiscountModel } from '@core/models/promotion.model';

import { Component, input } from '@angular/core';
import { formatDate } from '@angular/common';
import { UploadUrlPipe } from '@core/pipes/upload-url.pipe';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { RatingComponent } from '@component/rating/rating.component';

@Component({
  selector: 'discount-card',
  imports: [UploadUrlPipe, NzTypographyModule, NzDividerModule, RatingComponent],
  templateUrl: './discount-card.component.html',
  styleUrl: './discount-card.component.css',
})
export class DiscountCardComponent {
  readonly promotion = input.required<DiscountModel>();

  formatDate(date: Date) {
    return formatDate(date, 'dd/MM/YYY', 'en');
  }
}
