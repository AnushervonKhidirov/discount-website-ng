import { PromotionModel, PromotionType } from '@core/models/promotion.model';

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PromotionService } from '@core/services/promotion.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule, NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { GridComponent } from '@component/grid/grid.component';
import { PromotionCardComponent } from '@component/promotion-card/promotion-card.component';
import { Page } from '@constant/page.constant';

@Component({
  selector: 'app-promotion',
  imports: [NzCardModule, NzTabsModule, GridComponent, PromotionCardComponent],
  providers: [PromotionService, NzNotificationService],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css',
})
export class PromotionComponent {
  constructor(
    private readonly promotionService: PromotionService,
    private readonly notification: NzNotificationService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  readonly tabs = [
    {
      title: 'Все',
      href: Page.Promotion,
    },
    {
      title: 'Скидки',
      href: Page.Discount,
      type: PromotionType.DISCOUNT,
    },
    {
      title: 'Кэшбэки',
      href: Page.Cashback,
      type: PromotionType.CASHBACK,
    },
    {
      title: 'Промокоды',
      href: Page.PromoCode,
      type: PromotionType.PROMO_CODE,
    },
  ];

  promotions: PromotionModel[] = [];
  selectedIndex: number = 0;

  ngOnInit() {
    this.getPromotions();
    const promotionType: string = this.route.snapshot.params['type'];

    this.tabs.forEach((tab, index) => {
      if (tab.href.includes(promotionType)) {
        this.selectedIndex = index;
      }
    });
  }

  switchTab(e: NzTabChangeEvent) {
    const tab = this.tabs[e.index!];
    this.router.navigateByUrl(tab.href);
    this.getPromotions(tab.type);
  }

  getPromotions(type?: PromotionType) {
    this.promotionService
      .getAll({ where: { type: type } }, this.notification)
      .subscribe(promotions => {
        this.promotions = promotions;
      });
  }
}
