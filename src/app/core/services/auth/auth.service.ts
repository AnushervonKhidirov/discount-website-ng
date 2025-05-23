import type { LogInModel, TokenModel } from '../../models/auth.model';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Endpoint } from '@constant/endpoint.constant';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { CookieKey } from '@constant/cookie.constant';
import { showHttpErrorMessage } from '@helper/http-err-message.helper';

type AdditionalParams = Partial<{
  notification: NzNotificationService;
  navigateTo: string;
}>;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService,
    private readonly router: Router,
  ) {}

  logIn(body: LogInModel, { notification, navigateTo = '' }: AdditionalParams) {
    this.http.post<TokenModel>(Endpoint.SignIn, body).subscribe({
      next: response => {
        this.cookieService.set(CookieKey.AccessToken, response.accessToken);
        this.cookieService.set(CookieKey.RefreshToken, response.refreshToken);
        this.router.navigateByUrl(navigateTo);
      },
      error: err => showHttpErrorMessage(err, notification),
    });
  }

  signUp(body: LogInModel, { notification, navigateTo = '' }: AdditionalParams) {
    this.http.post<TokenModel>(Endpoint.SignUp, body).subscribe({
      next: response => {
        this.cookieService.set(CookieKey.AccessToken, response.accessToken);
        this.cookieService.set(CookieKey.RefreshToken, response.refreshToken);
        this.router.navigateByUrl(navigateTo);
      },
      error: err => showHttpErrorMessage(err, notification),
    });
  }
}
