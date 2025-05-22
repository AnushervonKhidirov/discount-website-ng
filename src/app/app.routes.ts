import { Routes } from '@angular/router';
import { LogInComponent } from '@page/common/log-in/log-in.component';
import { SignUpComponent } from '@page/common/sign-up/sign-up.component';

export const routes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
];
