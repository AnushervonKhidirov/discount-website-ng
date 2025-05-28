import type { LogInModel, TokenModel, RefreshTokenModel } from '@core/models/auth.model';

import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Endpoint } from '@constant/endpoint.constant';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { CookieKey } from '@constant/cookie.constant';
import { showHttpErrorMessage } from '@helper/http.helper';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly http: HttpClient, private readonly cookieService: CookieService) {}

  logIn(body: LogInModel, notification: NzNotificationService) {
    return this.http.post<TokenModel>(Endpoint.SignIn, body).pipe(
      tap({
        next: ({ accessToken, refreshToken }) => {
          this.cookieService.set(CookieKey.AccessToken, accessToken);
          this.cookieService.set(CookieKey.RefreshToken, refreshToken);
        },
        error: err => showHttpErrorMessage(err, notification),
      }),
    );
  }

  signUp(body: LogInModel, notification: NzNotificationService) {
    return this.http.post<TokenModel>(Endpoint.SignUp, body).pipe(
      tap({
        next: ({ accessToken, refreshToken }) => {
          this.cookieService.set(CookieKey.AccessToken, accessToken);
          this.cookieService.set(CookieKey.RefreshToken, refreshToken);
        },
        error: err => showHttpErrorMessage(err, notification),
      }),
    );
  }

  refreshToken(body: RefreshTokenModel) {
    return this.http.post<TokenModel>(Endpoint.RefreshToken, body).pipe(
      tap({
        next: ({ accessToken, refreshToken }) => {
          this.cookieService.set(CookieKey.AccessToken, accessToken);
          this.cookieService.set(CookieKey.RefreshToken, refreshToken);
        },
        error: () => {
          this.cookieService.delete(CookieKey.AccessToken);
          this.cookieService.delete(CookieKey.RefreshToken);
        },
      }),
    );
  }
}
