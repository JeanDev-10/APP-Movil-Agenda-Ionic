import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
export const ErrorApiInterceptorFn: HttpInterceptorFn = (req, next) => {
	console.log('---ErrorApiInterceptorFn', req);
  const _toastService=inject(ToastService);
  const _localStorageService=inject(LocalStorageService);
  const _router=inject(Router);

	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			if (error.status === HttpStatusCode.Unauthorized) {
        _localStorageService.deleteToken();
        _toastService.presentToastError("¡La sesión ha finalizado!");
        _router.navigateByUrl('/auth/login');

        console.error("no tienes acceso")
			} else {
				console.error("hay un error", error)
			}
			return throwError(() => error);
		})
	);
};
