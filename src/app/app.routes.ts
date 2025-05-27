import { Routes } from '@angular/router';

import { HeaderComponent } from '@layout/header/header.component';

import { LogInComponent } from '@page/public/log-in/log-in.component';
import { SignUpComponent } from '@page/public/sign-up/sign-up.component';
import { PromotionComponent } from '@page/public/promotion/promotion.component';

export const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [{ path: 'promotions', component: PromotionComponent }],
  },
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
];
