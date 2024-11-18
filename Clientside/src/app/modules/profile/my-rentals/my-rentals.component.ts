// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-my-rentals',
//   standalone: true,
//   imports: [],
//   templateUrl: './my-rentals.component.html',
//   styleUrl: './my-rentals.component.scss'
// })
// export class MyRentalsComponent {

// }
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-rentals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-rentals.component.html',
  styleUrl: './my-rentals.component.scss'
})
export class MyRentalsComponent {
  rentals = [
    { id: 1, name: 'Apartment 101', location: 'New York' },
    { id: 2, name: 'House 202', location: 'California' },
    { id: 3, name: 'Condo 303', location: 'Florida' }
  ];

  viewDetails(rentalId: number): void {
    console.log('View details for rental with ID:', rentalId);
    // Add logic for viewing rental details
  }
}
