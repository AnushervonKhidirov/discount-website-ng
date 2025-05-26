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
import { showHttpErrorMessage } from '@helper/http-err-message.helper';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  constructor(private readonly http: HttpClient) {}

  get(id: number, notification?: NzNotificationService) {
    return this.http.get<CompanyModel>(Endpoint.Company, { params: { id } }).pipe(
      tap({
        next: company => {
          company.createdAt = new Date(company.createdAt);
          company.updatedAt = new Date(company.updatedAt);
        },
        error: err => showHttpErrorMessage(err, notification),
      }),
    );
  }

  getAll(notification?: NzNotificationService) {
    return this.http.get<CompanyModel[]>(Endpoint.Companies).pipe(
      tap({
        next: companies => {
          companies.forEach(company => {
            company.createdAt = new Date(company.createdAt);
            company.updatedAt = new Date(company.updatedAt);
          });
        },
        error: err => showHttpErrorMessage(err, notification),
      }),
    );
  }

  create(createCompanyModel: CreateCompanyModel, notification?: NzNotificationService) {
    return this.http.post<CompanyModel>(Endpoint.Companies, createCompanyModel).pipe(
      tap({
        next: company => {
          company.createdAt = new Date(company.createdAt);
          company.updatedAt = new Date(company.updatedAt);
        },
        error: err => showHttpErrorMessage(err, notification),
      }),
    );
  }

  update(id: number, updateCompanyModel: UpdateCompanyModel, notification?: NzNotificationService) {
    return this.http
      .patch<CompanyModel>(Endpoint.Company, updateCompanyModel, { params: { id } })
      .pipe(
        tap({
          next: company => {
            company.createdAt = new Date(company.createdAt);
            company.updatedAt = new Date(company.updatedAt);
          },
          error: err => showHttpErrorMessage(err, notification),
        }),
      );
  }

  archive(id: number, notification?: NzNotificationService) {
    return this.http.patch<CompanyModel>(Endpoint.CompanyArchive, { params: { id } }).pipe(
      tap({
        next: company => {
          company.createdAt = new Date(company.createdAt);
          company.updatedAt = new Date(company.updatedAt);
        },
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
          next: company => {
            company.createdAt = new Date(company.createdAt);
            company.updatedAt = new Date(company.updatedAt);
          },
          error: err => showHttpErrorMessage(err, notification),
        }),
      );
  }
}
