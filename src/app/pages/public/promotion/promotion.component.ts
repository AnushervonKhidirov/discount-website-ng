import type { FindParams } from '@core/models/http.model';
import { PromotionModel, PromotionType } from '@core/models/promotion.model';

import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { PromotionService } from '@core/services/promotion.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTabsModule, NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { GridComponent } from '@component/grid/grid.component';
import { PromotionCardComponent } from '@component/promotion-card/promotion-card.component';
import { PromotionFilterComponent } from '@component/promotion-filter/promotion-filter.component';
import { Page } from '@constant/page.constant';

@Component({
  selector: 'app-promotion',
  imports: [NzTabsModule, GridComponent, PromotionCardComponent, PromotionFilterComponent],
  providers: [PromotionService, NzNotificationService],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css',
})
export class PromotionComponent {
  private readonly limit = 20;

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
  selectedTabIndex: number = 0;
  loadStep = 0;

  constructor(
    private readonly promotionService: PromotionService,
    private readonly notification: NzNotificationService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getPromotions();

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.loadStep = 0;
      this.promotions = [];
      this.getPromotions();
    });
  }

  switchTab(e: NzTabChangeEvent) {
    const tab = this.tabs[e.index!];
    this.promotions = [];
    this.router.navigate([tab.href], { queryParams: this.route.snapshot.queryParams });
  }

  getPromotions() {
    const params = this.getParams();

    this.promotionService.getAll(params, this.notification).subscribe(promotions => {
      this.promotions.push(...promotions);
      this.loadStep += 1;
    });
  }

  getParams(): FindParams<PromotionModel> {
    const promotionType: string | undefined = this.route.snapshot.params['type'];
    const whereParams = this.route.snapshot.queryParams;

    const type = promotionType
      ? this.tabs.find((tab, index) => {
          this.selectedTabIndex = index;
          return tab.href.includes(promotionType);
        })?.type
      : undefined;

    return {
      where: {
        type,
        ...whereParams,
      },
      take: this.limit,
      skip: this.limit * this.loadStep,
    };
  }
}
