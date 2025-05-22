import type { FormGroup } from '@angular/forms';

import { Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, FormsModule, NzFormModule, NzButtonModule, NzTypographyModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  formGroup = input.required<FormGroup>();
  submitFn = input.required<() => void>();
  headline = input<string>();
  btnName = input<string>('Submit');

  submitForm() {
    if (this.formGroup().valid) {
      this.submitFn()();
    } else {
      Object.values(this.formGroup().controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
