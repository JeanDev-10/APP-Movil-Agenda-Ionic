import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class authTokenInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.url.includes('white_')) {
			const requestClone = req.clone({ url: this.cleanWhiteUrl(req.url) });
			return next.handle(requestClone);
		}
    const token=localStorage.getItem('token');
    let request = req;
    request = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(request)
		return next.handle(request);
	}

	private cleanWhiteUrl(url: string) {
		return url.replace('white_', '');
	}
}
