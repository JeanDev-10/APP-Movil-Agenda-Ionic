import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  //paginas
  {
    path: 'login',
    title: 'Login',
    loadComponent: () =>
      import('./pages/login/login.page')
  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () =>
      import('./pages/register/register.page')
  },
];
