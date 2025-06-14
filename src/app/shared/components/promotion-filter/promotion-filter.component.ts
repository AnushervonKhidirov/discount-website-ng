import type { Option } from '@component/select/select.component';

import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SelectComponent } from '@component/select/select.component';
import { BankService } from '@core/services/bank.service';
import { CategoryService } from '@core/services/category.service';
import { PromotionType } from '@core/models/promotion.model';

@Component({
  selector: 'promotion-filter',
  imports: [
    ReactiveFormsModule,
    NzFlexModule,
    FormsModule,
    NzFormModule,
    NzInputNumberModule,
    NzInputModule,
    NzAutocompleteModule,
    NzDatePickerModule,
    NzIconModule,
    NzButtonModule,
    SelectComponent,
  ],
  providers: [BankService],
  templateUrl: './promotion-filter.component.html',
  styleUrl: './promotion-filter.component.css',
})
export class PromotionFilterComponent {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly bankService: BankService,
    private readonly categoryService: CategoryService,
  ) {}

  private readonly formBuilder = inject(FormBuilder);
  readonly formGroup = this.formBuilder.group({
    startAt: this.formBuilder.control<Date | null>(null),
    endAt: this.formBuilder.control<Date | null>(null),
    categoryId: this.formBuilder.control<string | number | null>(null),
    bankId: this.formBuilder.control<string | number | null>(null),
  });

  readonly promotionType = input<PromotionType>();

  banks: Option[] = [];
  categories: Option[] = [];

  applyFilters() {
    const queryParams = this.getQueryParamsFromForm();
    this.router.navigate(['./'], { queryParams, relativeTo: this.route });
  }

  ngOnInit() {
    forkJoin({
      banks: this.bankService.getAll(),
      categories: this.categoryService.getAll(),
    }).subscribe({
      next: ({ banks, categories }) => {
        this.banks = banks.map(bank => ({
          id: bank.id,
          value: bank.name,
        }));

        this.categories = categories;
      },

      complete: () => {
        this.setDefaultValues();
      },
    });
  }

  // private methods
  private setDefaultValues() {
    this.formGroup.setValue({
      startAt: this.getDefaultStartValue(),
      endAt: this.getDefaultEndValue(),
      categoryId: this.getDefaultCategoryValue()?.value ?? '',
      bankId: this.getDefaultBankValue()?.value ?? '',
    });
  }

  private getDefaultStartValue() {
    const startAt: string | undefined = this.route.snapshot.queryParams['startAt'];
    return startAt ? new Date(startAt) : null;
  }

  private getDefaultEndValue() {
    const endAt: string | undefined = this.route.snapshot.queryParams['endAt'];
    return endAt ? new Date(endAt) : null;
  }

  private getDefaultBankValue(bankName?: string) {
    if (bankName) {
      return this.banks.find(bank => bank.value === bankName) ?? null;
    }

    const bankId: string | undefined = this.route.snapshot.queryParams['bankId'];
    if (!bankId) return null;
    return this.banks.find(bank => bank.id === +bankId) ?? null;
  }

  private getDefaultCategoryValue(categoryName?: string) {
    if (categoryName) {
      return this.categories.find(category => category.value === categoryName) ?? null;
    }

    const categoryId: string | undefined = this.route.snapshot.queryParams['categoryId'];

    if (!categoryId) return null;
    return this.categories.find(category => category.id === +categoryId) ?? null;
  }

  private getQueryParamsFromForm() {
    const values: { [key: string]: unknown } = { ...this.formGroup.value };
    const optionsKey = ['bankId', 'categoryId'];

    for (const key in values) {
      if (!values[key]) {
        values[key] = null;
        continue;
      }

      if (optionsKey.includes(key) && typeof values[key] === 'string') {
        const bankId = this.getDefaultBankValue(values[key])?.id ?? null;
        values[key] = bankId;
      }

      if (values[key] instanceof Date) {
        values[key] = formatDate(values[key], 'YYYY-MM-dd', 'en');
      }
    }

    return values;
  }
}
