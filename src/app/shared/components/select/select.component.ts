import type { NzSelectModeType } from 'ng-zorro-antd/select';

import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';

export type Option = {
  id: number;
  value: string | number;
};

@Component({
  selector: 'app-select',
  imports: [ReactiveFormsModule, NzFormModule, NzSelectModule],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  formGroup = input.required<FormGroup>();
  name = input.required<string>();
  options = input.required<Option[]>();
  label = input('');
  placeholder = input('');
  errorTip = input('');
  mode = input<NzSelectModeType>('default');
  defaultValue = input<Option | Option[] | null>();

  listOfSelectedValue: number | number[] | null = null;

  ngOnInit() {
    const defaultSelected = this.defaultValue();

    if (defaultSelected) {
      if (Array.isArray(defaultSelected)) {
        this.listOfSelectedValue = defaultSelected.map(option => option.id);
      } else {
        this.listOfSelectedValue = defaultSelected.id;
      }
    }
  }
}
