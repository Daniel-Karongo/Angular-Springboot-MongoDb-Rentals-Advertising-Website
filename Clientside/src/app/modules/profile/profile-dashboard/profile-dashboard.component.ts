import { Component, Host } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; // Import this module
import { MatButtonModule } from '@angular/material/button'; // For logout button
import { ApiGatewayServiceService } from '../../../services/api-gateway-service/api-gateway-service.service';
import { PropertyOwner } from '../../../models/PropertyOwner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-dashboard',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatButtonToggleModule, CommonModule], // Include MatButtonToggleModule
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent {
  username!: string; // Example username, can be dynamically set.
  user!: PropertyOwner;
  isUserInfoActive: boolean = false;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private apiGatewayService: ApiGatewayServiceService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isUserInfoActive = this.router.url.includes('user-information');
    });

    this.apiGatewayService.getUser().subscribe(
      (data) => {
        this.user = data;
        this.username = this.user.firstName;
      },
      (error) => {
        console.error('Error fetching user data in', error);
      }
    );

    this.router.navigate(['rentals'], {relativeTo: this.activatedRoute});
  }

  // Function to navigate to different sections
  navigateTo(section: string): void {
    this.router.navigate([section], { relativeTo: this.activatedRoute });
  }

  // Logout function (for now, just console log)
  logout(): void {
    console.log('User logged out');
    // Add actual logout logic here, like clearing tokens, redirecting to login, etc.
  }
}
