import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import ru from '@angular/common/locales/ru';
import { ru_RU, provideNzI18n } from 'ng-zorro-antd/i18n';
import { routes } from './app.routes';

import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { EndpointIdInterceptor } from '@core/interceptors/endpoint-id.interceptor';
import { CacheInterceptor } from '@core/interceptors/cache.interceptor';
import { userReducer } from '@core/store/user/user.reducer';

registerLocaleData(ru);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNzI18n(ru_RU),
    provideHttpClient(
      withFetch(),
      withInterceptors([AuthInterceptor, EndpointIdInterceptor, CacheInterceptor]),
    ),
    provideAnimationsAsync(),
    provideStore({ user: userReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
