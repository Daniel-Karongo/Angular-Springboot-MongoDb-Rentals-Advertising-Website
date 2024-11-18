import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';
import { MyRentalsComponent } from './my-rentals/my-rentals.component';
import { UserInformationComponent } from './user-information/user-information.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileDashboardComponent,
    children: [
      { path: 'user-information', component: UserInformationComponent },
      { path: 'rentals', component: MyRentalsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
