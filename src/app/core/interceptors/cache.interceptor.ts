import { HttpInterceptorFn, HttpEvent } from '@angular/common/http';
import { of, tap } from 'rxjs';
import { Endpoint } from '@constant/endpoint.constant';

const routesToOmit: string[] = [
  Endpoint.SignIn,
  Endpoint.SignUp,
  Endpoint.RefreshToken,
  Endpoint.UserMe,
];

type Storage = {
  [key: string]: StorageValues;
};

type StorageValues = {
  value: HttpEvent<unknown>;
  expAt: number;
};

class CacheStorage {
  private storage: Storage = {};

  set(key: string, value: HttpEvent<unknown>) {
    const expAtDate = new Date();
    expAtDate.setMinutes(expAtDate.getMinutes() + 20);

    this.storage[key] = {
      value,
      expAt: expAtDate.getTime(),
    };
  }

  get(key: string) {
    if (!this.storage[key] || Date.now() > this.storage[key].expAt) return;
    return this.storage[key].value;
  }

  getAll() {
    return this.storage;
  }
}

const cacheStorage = new CacheStorage();

export const CacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cachedRequest = cacheStorage.get(req.urlWithParams);
  if (cachedRequest) return of(cachedRequest);

  return next(req).pipe(
    tap({
      next: result => {
        if (!routesToOmit.includes(req.url)) {
          cacheStorage.set(req.urlWithParams, result);
        }
      },
    }),
  );
};
