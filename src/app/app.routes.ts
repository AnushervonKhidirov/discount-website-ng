import { Routes } from '@angular/router';

import { HeaderComponent } from '@layout/header/header.component';

import { LogInComponent } from '@page/public/log-in/log-in.component';
import { SignUpComponent } from '@page/public/sign-up/sign-up.component';
import { PromotionComponent } from '@page/public/promotion/promotion.component';
import { CompanyComponent } from '@page/public/company/company.component';
import { CreateCompanyComponent } from '@page/public/create-company/create-company.component';
import { StoreComponent } from '@page/public/store/store.component';

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
        component: StoreComponent,
      },
      {
        path: 'companies',
        children: [
          {
            path: '',
            component: CompanyComponent,
          },
          {
            path: 'create',
            component: CreateCompanyComponent,
          },
          {
            path: ':id',
            component: CompanyComponent,
          },
        ],
      },
    ],
  },
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
];
