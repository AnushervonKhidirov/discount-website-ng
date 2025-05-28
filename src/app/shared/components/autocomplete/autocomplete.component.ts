import { Component, input, AfterContentChecked } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzIconModule } from 'ng-zorro-antd/icon';

export type Options = {
  id: number;
  value: string | number;
};

@Component({
  selector: 'autocomplete',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzAutocompleteModule, NzIconModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
})
export class AutocompleteComponent implements AfterContentChecked {
  formGroup = input.required<FormGroup>();
  name = input.required<string>();
  options = input.required<Options[]>();
  label = input<string>();
  placeholder = input<string>('');

  value = '';
  isLoaded = false;
  filteredOptions: Options[] = [];

  ngAfterContentChecked(): void {
    if (this.options().length > 0 && !this.isLoaded) {
      this.isLoaded = true;
      this.filteredOptions = this.options();
    }
  }

  onChangeHandler(value: string | number) {
    const valueSting = value.toString();

    this.filteredOptions = this.options().filter(option => {
      return option.value.toString().toLowerCase().includes(valueSting.toLowerCase());
    });
  }

  clearHandler() {
    this.value = '';
  }
}
