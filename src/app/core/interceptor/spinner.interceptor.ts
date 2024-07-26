import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let cleanRequest = request;

    if (request.url.includes('progressbar_spinner_')) {
      this.spinnerService.showSpecial();
      cleanRequest = this.cleanRequestUrl(request);
    } else {
      this.spinnerService.show();
    }
    console.log("se ejecuta spinner");

    return next
      .handle(cleanRequest)
      .pipe(finalize(() => {
        if (request.url.includes('progressbar_spinner_')) {
          this.spinnerService.hideSpecial();
        } else {
          this.spinnerService.hide();
        }
      }));
  }

  private cleanRequestUrl(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const cleanUrl = request.url.replace('progressbar_spinner_', '');
    return request.clone({ url: cleanUrl });
  }
}
