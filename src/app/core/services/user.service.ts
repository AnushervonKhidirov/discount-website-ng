import type { UserModel } from '@core/models/user.model';

import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Endpoint } from '@constant/endpoint.constant';
import { showHttpErrorMessage } from '@helper/http.helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getMyInfo(notification?: NzNotificationService) {
    return this.http.get<UserModel>(Endpoint.UserMe).pipe(
      tap({
        error: err => showHttpErrorMessage(err, notification),
      }),
    );
  }

  get(id: number) {}

  getAll() {}

  update() {}

  delete() {}
}
