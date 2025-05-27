import type { CashbackModel } from '@core/models/promotion.model';

import { Component, input } from '@angular/core';
import { formatDate } from '@angular/common';
import { UploadUrlPipe } from '@core/pipes/upload-url.pipe';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { RatingComponent } from '@component/rating/rating.component';

@Component({
  selector: 'cashback-card',
  imports: [UploadUrlPipe, NzTypographyModule, NzDividerModule, RatingComponent],
  templateUrl: './cashback-card.component.html',
  styleUrl: './cashback-card.component.css',
})
export class CashbackCardComponent {
  readonly promotion = input.required<CashbackModel>();

  formatDate(date: Date) {
    return formatDate(date, 'dd/MM/YYY', 'en');
  }
}
