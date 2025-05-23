import type { UserModel } from '@core/models/user.model';

import { Component, input } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ProfileButtonComponent } from '@component/profile-button/profile-button.component';

import { Page } from '@constant/page.constant';
import { QueryUrl } from '@constant/query-url.constant';

@Component({
  selector: 'app-auth-buttons',
  imports: [NzButtonModule, ProfileButtonComponent],
  templateUrl: './auth-buttons.component.html',
  styleUrl: './auth-buttons.component.css',
})
export class AuthButtonsComponent {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
  ) {}
  readonly userData = input<UserModel>();
  readonly user = this.userData();

  navigateToLogIn() {
    this.router.navigate([Page.LogIn], {
      relativeTo: this.route,
      queryParams: {
        [QueryUrl.FromPage]: this.location.path(),
      },
    });
  }

  navigateToSignUp() {
    this.router.navigate([Page.SignUp], {
      relativeTo: this.route,
      queryParams: {
        [QueryUrl.FromPage]: this.location.path(),
      },
    });
  }
}
