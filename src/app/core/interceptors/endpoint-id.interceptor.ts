import { HttpInterceptorFn } from '@angular/common/http';

export const EndpointIdInterceptor: HttpInterceptorFn = (req, next) => {
  const shouldUpdate = req.urlWithParams.includes(':id') && req.params.has('id');
  if (!shouldUpdate) return next(req);

  const id = req.params.get('id')!;
  const reqWithId = req.clone({
    url: req.url.replace(':id', id),
    params: req.params.delete('id'),
  });

  return next(reqWithId);
};
