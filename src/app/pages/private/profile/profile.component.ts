import type { UserModel } from '@core/models/user.model';

import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { GridComponent } from '@component/grid/grid.component';
import { CompanyCardComponent } from '@component/company-card/company-card.component';

import { Store } from '@ngrx/store';
import { selectUser } from '@core/store/user/user.selectors';

import { RolePipe } from '@core/pipes/role.pipe';

@Component({
  selector: 'app-profile',
  imports: [
    NzTypographyModule,
    NzEmptyModule,
    GridComponent,
    CompanyCardComponent,
    DatePipe,
    RolePipe,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(private readonly store: Store) {}

  user: UserModel | null = null;

  ngOnInit() {
    this.store.select(selectUser).subscribe(userStore => {
      this.user = userStore.user;
    });
  }
}
