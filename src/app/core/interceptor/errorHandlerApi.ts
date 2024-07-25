import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
export const ErrorApiInterceptorFn: HttpInterceptorFn = (req, next) => {
	console.log('---ErrorApiInterceptorFn', req);

	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			if (error.status === HttpStatusCode.Unauthorized) {
        console.error("no tienes acceso")
			} else {
				console.error("hay un error", error)
			}
			return throwError(() => error);
		})
	);
};
