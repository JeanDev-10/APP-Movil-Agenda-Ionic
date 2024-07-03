import { HttpInterceptorFn } from '@angular/common/http';

export const ErrorHandlerApi: HttpInterceptorFn = (req, next) => {
  return next(req);
};
