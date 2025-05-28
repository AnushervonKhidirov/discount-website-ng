import { Component, input } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'autocomplete',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzAutocompleteModule, NzIconModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
})
export class AutocompleteComponent {
  formGroup = input.required<FormGroup>();
  name = input.required<string>();
  options = input.required<{ id: number; value: string | number }[]>();
  onChange = input.required<(value: string | number) => void>();

  label = input<string>();
  clear = input<() => void>();
  value = null;
}
