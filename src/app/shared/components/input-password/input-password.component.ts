import { Component, signal, input } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'input-password',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzIconModule],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.css',
})
export class InputPasswordComponent {
  formGroup = input.required<FormGroup>();
  name = input.required<string>();
  nzErrorTip = input.required<string>();
  passwordVisible = signal(false);

  switchVisibility() {
    this.passwordVisible.update((value) => !value);
  }
}
