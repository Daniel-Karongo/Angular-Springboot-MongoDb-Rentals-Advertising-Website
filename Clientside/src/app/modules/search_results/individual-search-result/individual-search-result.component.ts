import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { PropertiesDTO } from '../../../models/PropertiesDTO';
import { RentalServiceService } from '../../../services/rental-service/rental-service.service';
import { NgImageSliderModule } from 'ng-image-slider';
import { PropertiesServiceService } from '../../../services/properties-service/properties-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-individual-search-result',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTabsModule, ReactiveFormsModule, MatIconModule, MatRadioModule, NgImageSliderModule],
  templateUrl: './individual-search-result.component.html',
  styleUrl: './individual-search-result.component.scss'
})
export class IndividualSearchResultComponent {
  individualRentalForm!: FormGroup;
  rentalImages: string[] = [];  // Add this property to hold the image data URLs
  religions = [
    'Any religion',
    'Christianity',
    'Islam',
    'Hinduism',
    'Buddhism',
    'Judaism',
    'Sikhism',
    'Other',
  ];
  isSpecificReligionSelected = false;
  formData: FormData = new FormData();
  rental!: PropertiesDTO;
  selectedReligionOption!: string; 
  allReligionsCheck: boolean = true;
  replacePhotos: boolean = false
  imageObject!: Array<object>;
  searchForm!: FormGroup;
  
  @Output() loginPageRequest = new EventEmitter<void>();

  constructor(
    private rentalsService: RentalServiceService,
    private propertiesService: PropertiesServiceService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.rental = this.rentalsService.getRental();

    // Dynamically populate the imageObject array with photographs from rental.photographs
    if (this.rental.photographs && this.rental.photographs.length > 0) {
      this.imageObject = this.rental.photographs.map(photoUrl => ({
        image: 'http://localhost:8080/' + photoUrl.split('\\').pop(), // Set the full-size image URL
        thumbImage: 'http://localhost:8080/' + photoUrl.split('\\').pop(), // Set the thumbnail image URL, can be the same or a smaller version of the image
        alt: 'Rental Image', // You can customize this with a meaningful description
        // title: 'Rental Image', // Optionally set a title for each image
        infinite: false,
        animationSpeed: 3,
        slideImage: 1,
      }));
    }

    this.searchForm = this.fb.group({
      criteria: ['', Validators.required]
    });
  }

  searchRentals(): void {
    if (this.searchForm.invalid) {
      return;
    }

    const criteria = this.searchForm.value.criteria;

    this.propertiesService.searchRentals(criteria).subscribe(
      (data: PropertiesDTO[]) => {
        this.rentalsService.setRentals(data);
        this.router.navigateByUrl('/results/' + criteria);
      },
      (error) => {
        console.error('Error fetching rentals', error);
      }
    );
  }

  loginPageInitialiser() {
    this.loginPageRequest.emit();
    this.router.navigate(['/login']); // Navigate to the login route
  }
}