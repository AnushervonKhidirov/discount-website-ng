import type { CategoryModel } from '@core/models/category.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from '@constant/endpoint.constant';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private readonly http: HttpClient) {}

  get(id: number) {
    return this.http.get<CategoryModel>(Endpoint.Category, { params: { id } });
  }

  getAll() {
    return this.http.get<CategoryModel[]>(Endpoint.Categories);
  }
}
