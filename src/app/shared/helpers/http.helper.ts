import type { FindParams } from '@core/models/http.model';

import { HttpErrorResponse } from '@angular/common/http';
import { HttpExceptionModel } from '@core/models/http.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export function showHttpErrorMessage(err: unknown, notification?: NzNotificationService) {
  if (!notification) return;

  if (err instanceof HttpErrorResponse) {
    const error = new HttpExceptionModel(err.error);
    notification.error(error.getError(), error.getMessages());
    return;
  }

  notification.error('Error', 'Something went wrong, please try again later');
}

export function convertFindParams<T>(
  params?: FindParams<T>,
): Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined {
  if (!params) return;

  const httpParams: { [key: string]: unknown } = {
    ...params,
    ...params.where,
  };

  delete httpParams['where'];

  const filteredParams: { [key: string]: unknown } = {};

  for (const param in httpParams) {
    if (httpParams[param] === undefined || httpParams[param] === null) continue;
    filteredParams[param] = httpParams[param];
  }

  return filteredParams as any;
}
