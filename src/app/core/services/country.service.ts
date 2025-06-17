import type { CountryModel } from '@core/models/country.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from '@constant/endpoint.constant';

@Injectable({ providedIn: 'root' })
export class CountryService {
  constructor(private readonly http: HttpClient) {}

  get(id: number) {
    return this.http.get<CountryModel>(Endpoint.Country, { params: { id } });
  }

  getAll() {
    return this.http.get<CountryModel[]>(Endpoint.Countries);
  }
}
