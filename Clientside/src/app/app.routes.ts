import { Routes, ExtraOptions } from '@angular/router';
import { ComponentNotFoundComponent } from './modules/component-not-found/component-not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/search/search.module').then((m) => m.SearchModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule)
  }
  ,
  {
    path: 'results/:location',
    loadChildren: () => import('./modules/search_results/search-results.module').then((m) => m.SearchResultsModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./modules/create_account/create-account.module').then((m) => m.CreateAccountModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile-routing.module').then((m) => m.ProfileRoutingModule)
  },
  { 
    path: '**', component: ComponentNotFoundComponent 
  },     // Page 404 Not Found
];