import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchResultsDashboardComponent } from './search-results-dashboard/search-results-dashboard.component';
import { IndividualSearchResultComponent } from './individual-search-result/individual-search-result.component';

const routes: Routes = [
  {
    path: '',
    component: SearchResultsDashboardComponent
  }, 
  {
    path: 'rental/:id',
    component: IndividualSearchResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchResultsRoutingModule { }
