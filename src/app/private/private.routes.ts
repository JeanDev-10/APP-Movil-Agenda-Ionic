import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const PRIVATE_ROUTES: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        title:'Home',
        loadComponent: () =>
          import('./pages/home/home.page').then((c) => c.HomePage),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
