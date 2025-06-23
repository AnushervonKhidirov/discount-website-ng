import type { CompanyModel } from '@core/models/company.model';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '@core/store/user/user.selectors';
import { NzCardModule } from 'ng-zorro-antd/card';
import { GridComponent } from '@component/grid/grid.component';
import { CompanyCardComponent } from '@component/company-card/company-card.component';

import { CompanyService } from '@core/services/company.service';

@Component({
  selector: 'company-page',
  imports: [NzCardModule, GridComponent, CompanyCardComponent],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
})
export class CompanyComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly companyService: CompanyService,
    private readonly store: Store,
  ) {}

  companies: CompanyModel[] = [];
  showRating = false;

  ngOnInit() {
    const isProfile = <boolean>this.route.routeConfig?.data?.['profile'] ?? false;

    if (isProfile) {
      this.store.select(selectUser).subscribe(userStore => {
        this.showRating = true;
        if (userStore.user?.companies) this.companies = userStore.user.companies;
      });
    } else {
      this.companyService.getAll().subscribe({
        next: companies => {
          this.companies = companies;
        },
        error: () => {},
      });
    }
  }
}
