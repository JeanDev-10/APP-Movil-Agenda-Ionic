import { Routes } from '@angular/router';
import { loggedGuard } from './core/guards/logged.guard';
import { NologgedGuard } from './core/guards/noLogged.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Welcome',
    canActivate:[loggedGuard],
    loadChildren: () =>
      import('./public/public.routes').then((m) => m.PUBLIC_ROUTES),
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    canActivate: [NologgedGuard],
    loadChildren: () =>
      import('./private/private.routes').then((m) => m.PRIVATE_ROUTES),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/pages/page-not-found/page-not-found.page')
  },
];
