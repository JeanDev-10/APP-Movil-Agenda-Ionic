import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/welcome/welcome.page')
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../auth/auth.routes')
  },
];
