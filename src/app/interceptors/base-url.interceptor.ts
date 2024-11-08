import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/assets/') || req.url.includes('accounts.google.com') || req.url.includes('www.googleapis.com')) {
    return next(req);
  }

  const base: string = environment.apiUrl;
  const clonedRequest = req.clone({
    url: `${base}/${req.url}`,
    setHeaders: {
      Accept: 'application/json',
      "Accept-Language": "es"
    },
  });

  return next(clonedRequest);
};