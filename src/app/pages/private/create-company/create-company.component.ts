import type { CompanyModel, CreateCompanyModel } from '@core/models/company.model';
import type { CategoryModel } from '@core/models/category.model';
import type { CountryModel } from '@core/models/country.model';

import { Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';

import { FormComponent } from '@component/form/form.component';
import { SelectComponent } from '@component/select/select.component';
import { GridComponent } from '@component/grid/grid.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzUploadModule, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { CompanyService } from '@core/services/company.service';
import { CategoryService } from '@core/services/category.service';
import { CountryService } from '@core/services/country.service';
import { removeFalsy } from '@helper/validation.helper';
import { Page } from '@constant/page.constant';

@Component({
  selector: 'app-create-company',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormComponent,
    SelectComponent,
    GridComponent,
    NzFormModule,
    NzInputModule,
    NzUploadModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzListModule,
    NzStepsModule,
  ],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css',
})
export class CreateCompanyComponent {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly companyService: CompanyService,
    private readonly categoryService: CategoryService,
    private readonly countryService: CountryService,
    private readonly notification: NzNotificationService,
  ) {}

  private readonly formBuilder = inject(NonNullableFormBuilder);

  categories: CategoryModel[] = [];
  countries: CountryModel[] = [];

  currentStep = 0;
  companyData: CompanyModel | null = null;

  createCompanyValidation = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
    categoryId: this.formBuilder.control<number>(0, [Validators.required]),
    countryIds: this.formBuilder.control<number[]>([], [Validators.required]),
    about: this.formBuilder.control<string | undefined>(''),
  });

  ngOnInit() {
    forkJoin({
      categories: this.categoryService.getAll(),
      countries: this.countryService.getAll(),
    }).subscribe({
      next: ({ categories, countries }) => {
        this.categories = categories;
        this.countries = countries;
      },

      complete: () => {},
    });

    this.route.queryParams.subscribe(params => {
      const companyId = parseInt(params['companyId']);
      if (Number.isInteger(companyId)) this.getCompanyData(companyId);

      const step = parseInt(params['step']);
      if (Number.isInteger(step)) this.currentStep = step;
    });
  }

  createCompany() {
    if (this.createCompanyValidation.valid) {
      const createCompanyModel = removeFalsy<CreateCompanyModel>(
        this.createCompanyValidation.value,
      );

      this.companyService.create(createCompanyModel, this.notification).subscribe(company => {
        this.currentStep = 1;
        this.router.navigate(['.'], {
          queryParams: { companyId: company.id, step: this.currentStep },
          relativeTo: this.route,
        });
      });
    }
  }

  getCompanyData(id: number) {
    this.companyService.get(id, this.notification).subscribe(company => {
      this.companyData = company;
    });
  }

  uploadImage(item: NzUploadXHRArgs) {
    if (!this.companyData) {
      this.notification.error('Error', 'Company not found.');
      return new Subscription();
    }

    const logo: File = (item.file.originFileObj as File) || (item.file as any);

    return this.companyService
      .uploadLogo(this.companyData.id, logo, this.notification)
      .subscribe(company => {
        this.companyData = company;
        this.notification.success('Success', 'Logo uploaded successfully.');
        item.onSuccess?.(company, item.file, {});
      });
  }

  navigateToCompaniesPage() {
    this.router.navigateByUrl(Page.MyCompanies);
  }
}
