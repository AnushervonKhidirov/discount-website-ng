import type { CompanyModel } from '@core/models/company.model';

import { Component, input } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RatingComponent } from '@component/rating/rating.component';

import { UploadUrlPipe } from '@core/pipes/upload-url.pipe';

@Component({
  selector: 'company-card',
  imports: [NzTypographyModule, NzCardModule, NzDividerModule, RatingComponent, UploadUrlPipe],
  templateUrl: './company-card.component.html',
  styleUrl: './company-card.component.css',
})
export class CompanyCardComponent {
  readonly company = input.required<CompanyModel>();
  readonly showRating = input(false);
  readonly cardHandler = input<(company: CompanyModel) => void>();

  isHoverable = false;
  companyData: CompanyModel | null = null;

  ngOnInit() {
    this.companyData = this.company();
    this.isHoverable = !!this.cardHandler();
  }

  handler() {
    if (this.companyData) {
      const fn = this.cardHandler();
      if (fn) fn(this.companyData);
    }
  }
}
