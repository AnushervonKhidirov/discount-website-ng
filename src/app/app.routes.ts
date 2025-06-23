import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { HeaderComponent } from '@layout/header/header.component';

// public pages
import { LogInComponent } from '@page/public/log-in/log-in.component';
import { SignUpComponent } from '@page/public/sign-up/sign-up.component';
import { PromotionComponent } from '@page/public/promotion/promotion.component';
import { CompanyComponent } from '@page/public/company/company.component';
import { StoreComponent } from '@page/public/store/store.component';

// private pages
import { CreateCompanyComponent } from '@page/private/create-company/create-company.component';
import { ProfileComponent } from '@page/private/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        matcher: url => {
          if (url.length === 0 || url[0].path !== 'promotions') return null;
          const type = url[1];
          const posParams = type ? { type } : undefined;
          return { consumed: url, posParams };
        },
        component: PromotionComponent,
      },
      {
        path: 'stores',
        children: [
          {
            path: '',
            component: StoreComponent,
          },
        ],
      },
      {
        path: 'companies',
        children: [
          {
            path: '',
            component: CompanyComponent,
          },
        ],
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: ProfileComponent,
          },
          {
            path: 'companies',
            children: [
              {
                path: '',
                component: CompanyComponent,
                data: { profile: true },
              },
              {
                path: 'create',
                component: CreateCompanyComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
];
