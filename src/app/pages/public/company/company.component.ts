import type { UserModel } from '@core/models/user.model';
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
  user: UserModel | null = null;
  showRating = false;

  ngOnInit() {
    const path = this.route.routeConfig;

    if (path && path.path === 'my') {
      this.store.select(selectUser).subscribe(userStore => {
        this.user = userStore.user;
        this.showRating = true;
        if (this.user?.companies) this.companies = this.user.companies;
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
