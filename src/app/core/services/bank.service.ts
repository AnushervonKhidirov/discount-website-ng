import type { BankModel } from '@core/models/bank.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from '@constant/endpoint.constant';

@Injectable({ providedIn: 'root' })
export class BankService {
  constructor(private readonly http: HttpClient) {}

  get(id: number) {
    return this.http.get<BankModel>(Endpoint.Bank, { params: { id } });
  }

  getAll() {
    return this.http.get<BankModel[]>(Endpoint.Banks);
  }
}
