import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Property } from '../../../models/Property';
import { PropertyOwnersServiceService } from '../../../services/property-owners-service/property-owners-service.service';
import { PropertyOwner } from '../../../models/PropertyOwner';
import { ApiGatewayServiceService } from '../../../services/api-gateway-service/api-gateway-service.service';
import { PropertiesDTO } from '../../../models/PropertiesDTO';

@Component({
  selector: 'app-my-rentals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-rentals.component.html',
  styleUrl: './my-rentals.component.scss'
})
export class MyRentalsComponent {
  rentals!: PropertiesDTO[];
  user!: PropertyOwner; // Accept user data as an input

  constructor(
    private propertyOwnersService: PropertyOwnersServiceService,
    private apiGatewayService: ApiGatewayServiceService
  ) {

  }

  ngOnInit(): void {
    console.log("Initialising user rentals component");
    this.getUserInformation();
  }

  getUserInformation() {
    this.apiGatewayService.getUser().subscribe(
      (data) => {
        // Ensure data is not undefined before assigning it to this.user
        if (data) {
          this.user = data;
          console.log(this.user);

          this.propertyOwnersService.getAllOwnersProperties(this.user.id).subscribe(
            (data) => {
              // Ensure data is not undefined before assigning it to this.user
              if (data) {
                this.rentals = data;
                console.log(this.rentals);
              }
            },
            (error) => {
              console.error('Error fetching user data in', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching user data in', error);
      }
    );
  }

  viewDetails(rentalId: string) {
    console.log(rentalId);
  }
}
