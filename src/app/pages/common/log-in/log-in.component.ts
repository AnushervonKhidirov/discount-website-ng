import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormComponent } from '@component/form/form.component';
import { InputPasswordComponent } from '@component/input-password/input-password.component';

import { Page } from '@constant/page.constant';

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
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  readonly signUpHref = Page.SignUp;

  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  submitForm() {
    console.log(this.validateForm.value);
  }
}
