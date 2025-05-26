import { HttpInterceptorFn } from '@angular/common/http';

export const EndpointIdInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.params.has('id')) return next(req);

  const id = req.params.get('id')!;
  const reqWithId = req.clone({
    url: req.url.replace(':id', id),
    params: req.params.delete('id'),
  });

  return next(reqWithId);
};
