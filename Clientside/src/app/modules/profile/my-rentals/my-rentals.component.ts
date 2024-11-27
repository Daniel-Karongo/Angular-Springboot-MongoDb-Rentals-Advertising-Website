import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Property } from '../../../models/Property';
import { PropertyOwnersServiceService } from '../../../services/property-owners-service/property-owners-service.service';
import { PropertyOwner } from '../../../models/PropertyOwner';
import { ApiGatewayServiceService } from '../../../services/api-gateway-service/api-gateway-service.service';
import { PropertiesDTO } from '../../../models/PropertiesDTO';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { PropertiesServiceService } from '../../../services/properties-service/properties-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { RentalServiceService } from '../../../services/rental-service/rental-service.service';

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
  private userSubscription!: Subscription;

  constructor(
    private propertyOwnersService: PropertyOwnersServiceService,
    private propertiesService: PropertiesServiceService,
    private apiGatewayService: ApiGatewayServiceService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private rentalService: RentalServiceService
  ) {

  }

  ngOnInit(): void {
    this.getUserInformation();
  }

  getUserInformation() {
    this.userSubscription = this.apiGatewayService.user$.subscribe(
      (user) => {
        if (user) {
          this.user = user;
          this.propertyOwnersService.getAllOwnersProperties(this.user.id).subscribe(
            (data) => {
              this.rentals = data || []; // Assign an empty array if data is null/undefined
            },
            (error) => {
              this.rentals = []; // Assign an empty array in case of error
            }
          );
        }
      }
    );
  }

  showRentalInDetail(rental: PropertiesDTO) {
    this.rentalService.setRental(rental);
    this.route.navigate(['rental/' + rental.rentalId], {
      relativeTo: this.activatedRoute.parent,
    });
  }
  
  viewDetails(rental: PropertiesDTO) {
    this.rentalService.setRental(rental);
    this.route.navigate(['rental/' + rental.rentalId], {
      relativeTo: this.activatedRoute.parent,
    });
  }
  

  deleteRental(rentalId: string) {
    console.log(rentalId);
    this.propertiesService.deleteRental(rentalId).subscribe(
      (data) => {
        if (data.includes('Rental Deleted')) {
          this.snackBar.open('Rental deleted successfully', 'X', {
            duration: 6000, // Snackbar will auto-close after 3 seconds
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.ngOnInit();
        }
      },
      (error) => {
        console.error('Error deleting rental', error);
        this.snackBar.open('There was an error deleting the rental. Please try again later.', 'X', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }

  uploadRental() {
    this.route.navigate(['rental/upload'], {relativeTo: this.activatedRoute.parent});
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
