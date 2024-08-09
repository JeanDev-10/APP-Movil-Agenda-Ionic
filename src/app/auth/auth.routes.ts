import { Routes } from '@angular/router';

export default [
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
] as Routes;
