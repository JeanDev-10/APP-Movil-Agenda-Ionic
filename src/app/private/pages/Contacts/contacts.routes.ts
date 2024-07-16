import { Routes } from '@angular/router';

export default[
  {
    path: '',
    title:'Contacts',
    loadComponent: () =>
      import('../home/home.page').then((c) => c.HomePage),
  },
  {
    path: 'create',
    pathMatch:'full',
    title: 'Crear Contacto',
    loadComponent: () =>
      import('./contact-create/contact-create.page')
  },
  {
    path: ':id',
    title: 'Detalle de Contacto',
    loadComponent: () =>
      import('./contact-detail/contact-detail.page')
  },
] as Routes;
