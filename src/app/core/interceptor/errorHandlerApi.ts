import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
export const ErrorApiInterceptorFn: HttpInterceptorFn = (req, next) => {
  console.log('---ErrorApiInterceptorFn', req);
  const _toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status==404 || error.status==403){
        _toastService.presentToastError(error.error.message);
      }
      if(error.status==422){
        console.log(error);
        const errores=error.error.data
        Object.keys(errores).forEach(key => {
        _toastService.presentToastError(errores[key]);
        });
      }
      console.error('hay un error', error);
      return throwError(() => error);
    })
  );
};
