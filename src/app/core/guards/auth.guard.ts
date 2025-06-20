import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { Page } from '@constant/page.constant';
import { CookieKey } from '@constant/cookie.constant';
import { QueryUrl } from '@constant/query-url.constant';

export const AuthGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const accessToken = cookieService.get(CookieKey.AccessToken);
  let canActivate = !!accessToken;

  if (!canActivate) {
    const loginPath = router.parseUrl(`${Page.LogIn}?${QueryUrl.FromPage}=${state.url}`);
    return new RedirectCommand(loginPath);
  }

  return canActivate;
};
