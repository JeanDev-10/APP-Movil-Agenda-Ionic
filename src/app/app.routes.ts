import { Routes } from '@angular/router';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Welcome',
    loadChildren: () =>
      import('./public/public.routes').then((m) => m.PUBLIC_ROUTES),
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    canActivate: [loggedGuard],
    loadChildren: () =>
      import('./private/private.routes').then((m) => m.PRIVATE_ROUTES),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/pages/page-not-found/page-not-found.page').then(
        (m) => m.PageNotFoundPage
      ),
  },
];
