import type { UserModel } from '@core/models/user.model';

import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzDropDownModule, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { Page } from '@constant/page.constant';

@Component({
  selector: 'app-profile-button',
  imports: [RouterLink, NzDropDownModule, NzDropdownMenuComponent, NzButtonModule, NzAvatarModule],
  templateUrl: './profile-button.component.html',
  styleUrl: './profile-button.component.css',
})
export class ProfileButtonComponent {
  readonly userData = input.required<UserModel>();
  user: UserModel | null = null;
  profileMenu = [
    {
      title: 'Profile',
      href: Page.Profile,
    },
    {
      title: 'My companies',
      href: Page.MyCompanies,
      ownerOnly: true,
    },
    {
      title: 'Create company',
      href: Page.CreateCompany,
    },
  ];

  ngOnInit() {
    this.user = this.userData();
    this.profileMenu = this.profileMenu.filter(item => {
      return !this.isCompanyOwner() ? !item.ownerOnly : item;
    });
  }

  getUsername() {
    if (!this.user) return '';
    return this.user.firstName ?? this.user.username;
  }

  getRole() {
    if (!this.user) return '';
    return this.user.role.replaceAll('_', ' ').toLowerCase();
  }

  isCompanyOwner() {
    if (!this.user) return false;
    return !!this.user.companies && this.user.companies.length > 0;
  }
}
