import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PropertiesServiceService } from '../../../services/properties-service/properties-service.service';
import { Observable } from 'rxjs';
import { PropertiesDTO } from '../../../models/PropertiesDTO';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ FormsModule, CommonModule, MatFormField, MatInputModule ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  // providers: [ PropertiesServiceService ]
})
export class SearchBarComponent {
  criteria: string = ''; // Declare criteria property
  rentals$!: Observable<PropertiesDTO>;
  rentals: PropertiesDTO[] = [];
  
  constructor(private propertiesService: PropertiesServiceService) {

  }

  

  searchRentals(criteria: string): void {
    // this.rentals$ = this.propertiesService.getAllRentals();
    // console.log(this.rentals$); 

    this.propertiesService.getAllRentals().subscribe(
      (data: PropertiesDTO[]) => {
        this.rentals = data;  // Assign the response data to the rentals property
        console.log(this.rentals); // Log to check if the data is correctly fetched
      },
      (error) => {
        console.error('Error fetching rentals', error);
      }
    );
  }
}