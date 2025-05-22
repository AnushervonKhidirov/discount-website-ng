import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormComponent } from '../../../shared/components/form/form.component';
import { InputPasswordComponent } from '../../../shared/components/input-password/input-password.component';

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
    private readonly notification: NzNotificationService,
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

      this.authService.logIn(
        { username, password },
        { navigateTo: this.fromPage, notification: this.notification },
      );
    }
  }
}
