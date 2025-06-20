import type { CompanyModel } from '@core/models/company.model';

import { Component, input } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RatingComponent } from '@component/rating/rating.component';

import { UploadUrlPipe } from '@core/pipes/upload-url.pipe';

@Component({
  selector: 'company-card',
  imports: [NzTypographyModule, NzCardComponent, NzDividerModule, RatingComponent, UploadUrlPipe],
  templateUrl: './company-card.component.html',
  styleUrl: './company-card.component.css',
})
export class CompanyCardComponent {
  company = input.required<CompanyModel>();
  showRating = input(false);

  ngOnInit() {
    console.log(this.company());
  }
}
