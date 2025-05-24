import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormComponent } from '../../../shared/components/form/form.component';
import { InputPasswordComponent } from '../../../shared/components/input-password/input-password.component';

import { Page } from '@constant/page.constant';
import { QueryUrl } from '@constant/query-url.constant';

@Component({
  selector: 'sign-up-page',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    FormComponent,
    InputPasswordComponent,
  ],
  providers: [AuthService],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NzNotificationService,
  ) {}

  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly fromPage: string = this.route.snapshot.queryParams[QueryUrl.FromPage] ?? '';
  readonly logInHref = Page.LogIn;

  validateForm = this.formBuilder.group({
    username: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [Validators.required]),
    repeat_password: this.formBuilder.control('', [Validators.required]),
  });

  submitForm() {
    if (this.validateForm.valid) {
      const { username, password, repeat_password } = this.validateForm.value;
      if (!username || !password || !repeat_password) return;

      if (password !== repeat_password) {
        this.notificationService.error('Password', 'Repeat password should match the password!');
        return;
      }

      this.authService
        .signUp(
          { username, password },
          { navigateTo: this.fromPage, notification: this.notificationService },
        )
        .subscribe();
    }
  }
}
