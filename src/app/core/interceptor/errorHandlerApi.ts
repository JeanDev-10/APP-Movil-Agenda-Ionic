import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserService } from '../services/user.service';
export const ErrorApiInterceptorFn: HttpInterceptorFn = (req, next) => {
  console.log('---ErrorApiInterceptorFn', req);
  const _toastService = inject(ToastService);
  const _localStorageService = inject(LocalStorageService);
  const _userService = inject(UserService);
  const _router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('hay un error', error);
      return throwError(() => error);
    })
  );
};
