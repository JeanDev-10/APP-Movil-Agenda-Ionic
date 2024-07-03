import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/welcome/welcome.page').then((c) => c.WelcomePage),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../auth/auth,.routes').then((m) => m.AUTH_ROUTES),
  },
];
