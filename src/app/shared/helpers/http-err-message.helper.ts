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
