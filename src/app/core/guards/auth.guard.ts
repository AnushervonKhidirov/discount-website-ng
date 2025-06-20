import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '@core/store/user/user.selectors';

import { Page } from '@constant/page.constant';
import { QueryUrl } from '@constant/query-url.constant';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);
  let canActivate = false;

  store.select(selectUser).subscribe(userStore => {
    if (userStore.user) canActivate = true;
  });

  if (!canActivate) {
    const loginPath = router.parseUrl(`${Page.LogIn}?${QueryUrl.FromPage}=${state.url}`);
    return new RedirectCommand(loginPath);
  }

  return canActivate;
};
