import { Routes, ExtraOptions } from '@angular/router';

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
    path: ':location',
    loadChildren: () => import('./modules/search_results/search-results.module').then((m) => m.SearchResultsModule)
  }
];