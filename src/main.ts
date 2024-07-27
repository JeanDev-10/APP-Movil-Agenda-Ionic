import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
  withComponentInputBinding,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorApiInterceptorFn } from './app/core/interceptor/errorHandlerApi';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { SpinnerInterceptor } from './app/core/interceptor/spinner.interceptor';
import { authTokenInterceptor } from './app/core/interceptor/auth-token';

if (environment.production) {
  enableProdMode();
}



bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules),withComponentInputBinding()),
    provideHttpClient(withInterceptors([ErrorApiInterceptorFn]),withInterceptorsFromDi()),
    provideLottieOptions({
      player: () => player,
    }),
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: authTokenInterceptor, multi: true},
  ],
});
