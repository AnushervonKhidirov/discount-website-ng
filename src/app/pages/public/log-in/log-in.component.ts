import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { setUserInfo } from '@core/store/user/user.actions';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormComponent } from '@component/form/form.component';
import { InputPasswordComponent } from '@component/input-password/input-password.component';

import { Page } from '@constant/page.constant';
import { QueryUrl } from '@constant/query-url.constant';

@Component({
  selector: 'log-in-page',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    FormComponent,
    InputPasswordComponent,
  ],
  providers: [AuthService],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly notification: NzNotificationService,
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly fromPage: string = this.route.snapshot.queryParams[QueryUrl.FromPage] ?? '';
  readonly signUpHref = Page.SignUp;

  validateForm = this.formBuilder.group({
    username: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [Validators.required]),
  });

  submitForm() {
    if (this.validateForm.valid) {
      const { username, password } = this.validateForm.value;
      if (!username || !password) return;

      this.authService.logIn({ username, password }, this.notification).subscribe(() => {
        this.getUserInfo();
      });
    }
  }

  getUserInfo() {
    this.userService.getMyInfo(this.notification).subscribe(user => {
      this.store.dispatch(setUserInfo(user));
      this.router.navigateByUrl(this.fromPage);
    });
  }
}
