import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Property } from '../../../models/Property';
import { PropertyOwnersServiceService } from '../../../services/property-owners-service/property-owners-service.service';
import { PropertyOwner } from '../../../models/PropertyOwner';
import { ApiGatewayServiceService } from '../../../services/api-gateway-service/api-gateway-service.service';
import { PropertiesDTO } from '../../../models/PropertiesDTO';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-my-rentals',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './my-rentals.component.html',
  styleUrl: './my-rentals.component.scss'
})
export class MyRentalsComponent {

  rentals: PropertiesDTO[] = [];
  user!: PropertyOwner; // Accept user data as an input

  constructor(
    private propertyOwnersService: PropertyOwnersServiceService,
    private apiGatewayService: ApiGatewayServiceService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.getUserInformation();
  }

  getUserInformation() {
    this.apiGatewayService.getUser().subscribe(
      (data) => {
        // Ensure data is not undefined before assigning it to this.user
        if (data) {
          this.user = data;

          this.propertyOwnersService.getAllOwnersProperties(this.user.id).subscribe(
            (data) => {
              this.rentals = data || []; // Assign an empty array if data is null/undefined
            },
            (error) => {
              console.error('Error fetching user data:', error);
              this.rentals = []; // Assign an empty array in case of error
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching user data in', error);
      }
    );
  }

  showRentalInDetail(rentalId: string) {
    console.log(rentalId);
    this.route.navigate(['rental/' + rentalId], {relativeTo: this.activatedRoute.parent});
  }

  viewDetails(rentalId: string) {
    console.log(rentalId);
  }

  deleteRental(rentalId: string) {
    console.log(rentalId);
  }

  uploadRental() {
    console.log("Uploading rental");
  }
}
