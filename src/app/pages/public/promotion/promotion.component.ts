import { PromotionModel } from '@core/models/promotion.model';

import { Component } from '@angular/core';
import { PromotionService } from '@core/services/promotion.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzCardModule } from 'ng-zorro-antd/card';
import { GridComponent } from '@component/grid/grid.component';
import { PromotionCardComponent } from '@component/promotion-card/promotion-card.component';

@Component({
  selector: 'app-promotion',
  imports: [NzCardModule, GridComponent, PromotionCardComponent],
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
}
