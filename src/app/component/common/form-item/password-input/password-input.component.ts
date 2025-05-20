import { Component, signal } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'password-input',
  imports: [NzFormModule, NzInputModule, NzIconModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css',
})
export class PasswordInputComponent {
  passwordVisible = signal(false);

  switchVisibility() {
    this.passwordVisible.update((value) => !value);
  }
}
