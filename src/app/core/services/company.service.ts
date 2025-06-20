import type { FindParams } from '@core/models/http.model';

import type {
  CompanyModel,
  CreateCompanyModel,
  UpdateCompanyModel,
} from '@core/models/company.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Endpoint } from '@constant/endpoint.constant';
import { tap } from 'rxjs';
import { convertFindParams, showHttpErrorMessage } from '@helper/http.helper';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  constructor(private readonly http: HttpClient) {}

  get(id: number, notification?: NzNotificationService) {
    return this.http.get<CompanyModel>(Endpoint.Company, { params: { id } }).pipe(
      tap({
        error: err => showHttpErrorMessage(err, notification),
      }),
    );
  }

  getAll(params?: FindParams<CompanyModel>, notification?: NzNotificationService) {
    return this.http
      .get<CompanyModel[]>(Endpoint.Companies, { params: convertFindParams(params) })
      .pipe(
        tap({
          error: err => showHttpErrorMessage(err, notification),
        }),
      );
  }

  create(createCompanyModel: CreateCompanyModel, notification?: NzNotificationService) {
    return this.http.post<CompanyModel>(Endpoint.Companies, createCompanyModel).pipe(
      tap({
        error: err => showHttpErrorMessage(err, notification),
      }),
    );
  }

  update(id: number, updateCompanyModel: UpdateCompanyModel, notification?: NzNotificationService) {
    return this.http
      .patch<CompanyModel>(Endpoint.Company, updateCompanyModel, { params: { id } })
      .pipe(
        tap({
          error: err => showHttpErrorMessage(err, notification),
        }),
      );
  }

  archive(id: number, notification?: NzNotificationService) {
    return this.http.patch<CompanyModel>(Endpoint.CompanyArchive, { params: { id } }).pipe(
      tap({
        error: err => showHttpErrorMessage(err, notification),
      }),
    );
  }

  uploadLogo(id: number, logo: File, notification?: NzNotificationService) {
    const formData = new FormData();
    formData.append('file', logo);
    return this.http
      .post<CompanyModel>(Endpoint.UploadCompanyLogo, formData, { params: { id } })
      .pipe(
        tap({
          error: err => showHttpErrorMessage(err, notification),
        }),
      );
  }
}
