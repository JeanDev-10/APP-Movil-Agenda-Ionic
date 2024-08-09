import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Injectable()
export class authTokenInterceptor implements HttpInterceptor {
  private _localStorageService = inject(LocalStorageService);
  private _userService = inject(UserService);
  private _router = inject(Router);
  private _toastService = inject(ToastService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('white_')) {
      const requestClone = req.clone({ url: this.cleanWhiteUrl(req.url) });
      return next.handle(requestClone);
    }
    const token = localStorage.getItem('token');
    let request = req;
    request = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(request);
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);
        if (err.status == 401) {
          if (
            err.error.message == 'Token expirado' ||
            err.error.message == 'Token invalido'
          ) {
            console.log('entra refresh token por token invalido o expirado');
            return this._userService.refreshToken().pipe(
              switchMap((res) => {
                this._localStorageService.setToken(res.data);
                const token = res.data;
                const newReq = req.clone({
                  setHeaders: {
                    authorization: `Bearer ${token}`,
                  },
                });
                return next.handle(newReq);
              }),
              catchError((err) => {
                console.log("error en el refresh token")
                const finalError = new Error();
                this._localStorageService.deleteToken();
                this._toastService.presentToastError('¡Sesión finalizada!');
                this._router.navigateByUrl('/auth/login');
                return throwError(() => finalError);
              })
            );
          }
          if (err.error.message === 'No autenticado') {
            this._localStorageService.deleteToken();
            this._toastService.presentToastError('¡Sesión finalizada!');
            this._router.navigateByUrl('/auth/login');
          }
        }
        console.error(err);
        return throwError(() => err);
      })
    );
  }

  private cleanWhiteUrl(url: string) {
    return url.replace('white_', '');
  }
}
