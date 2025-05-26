import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from '@core/services/user.service';
import { setUserInfo } from '@core/store/user/user.actions';
import { selectUser } from '@core/store/user/user.selectors';
import { CookieKey } from '@constant/cookie.constant';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [UserService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private readonly cookieService: CookieService,
    private readonly userService: UserService,
    private readonly notification: NzNotificationService,
    private readonly store: Store,
  ) {}

  isFetched = signal(false);

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    const isTokenExists = this.cookieService.check(CookieKey.AccessToken);
    if (!isTokenExists) return this.isFetched.set(true);

    this.store.select(selectUser).subscribe(({ user }) => {
      if (user) return this.isFetched.set(true);

      this.userService.getMyInfo(this.notification).subscribe(user => {
        this.store.dispatch(setUserInfo(user));
        this.isFetched.set(true);
      });
    });
  }
}
