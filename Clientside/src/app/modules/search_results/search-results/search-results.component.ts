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
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {

  rentals: PropertiesDTO[] = [];
  private rentalsSubscription!: Subscription;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalServiceService
  ) {

  }

  ngOnInit(): void {
    this.getRentalInformation();
  }

  getRentalInformation() {
    this.rentalsSubscription = this.rentalService.rentalsData$.subscribe(
      (rentals) => {
        if (rentals) {
          this.rentals = rentals;
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

  ngOnDestroy() {
    if(this.rentalsSubscription) {
      this.rentalsSubscription.unsubscribe();
    }
  }
}