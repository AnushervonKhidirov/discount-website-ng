import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormComponent } from '@component/form/form.component';
import { InputPasswordComponent } from '@component/input-password/input-password.component';

import { Page } from '@constant/page.constant';

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
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private readonly notificationService: NzNotificationService) {}

  private readonly formBuilder = inject(NonNullableFormBuilder);
  readonly logInHref = Page.LogIn;

  validateForm = this.formBuilder.group({
    username: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [Validators.required]),
    repeat_password: this.formBuilder.control('', [Validators.required]),
  });

  submitForm() {
    const { password, repeat_password } = this.validateForm.value;

    if (password !== repeat_password) {
      this.notificationService.error(
        'Password',
        'Repeat password should match the password!'
      );
    } else {
      console.log(this.validateForm.value);
    }
  }
}
