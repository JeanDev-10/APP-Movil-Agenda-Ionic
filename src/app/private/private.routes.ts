import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const PRIVATE_ROUTES: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path:'contacts',
        loadChildren:()=>import('./pages/Contacts/contacts.routes')
      },

      {
        path: 'user',
        title:'Usuario',
        loadComponent: () =>
          import('./pages/user/user.page')
      },
      {
        path: '',
        redirectTo: 'contacts',
        pathMatch: 'full'
      }
    ],
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'contacts'
  }

];
