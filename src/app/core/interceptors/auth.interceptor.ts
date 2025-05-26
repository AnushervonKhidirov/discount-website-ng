import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError, switchMap } from 'rxjs';
import { AuthService } from '@core/services/auth/auth.service';
import { CookieKey } from '@constant/cookie.constant';
import { Endpoint } from '@constant/endpoint.constant';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);

  const accessToken = cookieService.get(CookieKey.AccessToken);
  const refreshToken = cookieService.get(CookieKey.RefreshToken);

  if (!accessToken) return next(req);
  return next(requestWithToken(req, accessToken)).pipe(
    catchError((err: unknown) => {
      const isRefreshEndpoint = req.url === Endpoint.RefreshToken;
      const isUnauthorizedException =
        err instanceof HttpErrorResponse && err.status === HttpStatusCode.Unauthorized;

      if (isUnauthorizedException && !isRefreshEndpoint) {
        return authService.refreshToken({ refreshToken }).pipe(
          switchMap(({ accessToken }) => {
            return next(requestWithToken(req, accessToken));
          }),
        );
      }

      return throwError(() => err);
    }),
  );
};

function requestWithToken(req: HttpRequest<unknown>, accessToken: string) {
  return req.clone({
    setHeaders: { authorization: `Bearer ${accessToken}` },
  });
}
