import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PropertiesServiceService } from '../../../services/properties-service/properties-service.service';
import { Observable } from 'rxjs';
import { PropertiesDTO } from '../../../models/PropertiesDTO';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ FormsModule, CommonModule, MatFormField, MatInputModule, ReactiveFormsModule ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  // providers: [ PropertiesServiceService ]
})
export class SearchBarComponent {
  searchForm!: FormGroup;
  rentals: PropertiesDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private propertiesService: PropertiesServiceService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      criteria: ['', Validators.required]
    });
  }

  searchRentals(): void {
    if (this.searchForm.invalid) {
      console.log("Form is invalid");
      return; // Don't submit the form if it's invalid
    }

    const criteria = this.searchForm.value.criteria;
    console.log("submitting");

    this.propertiesService.searchRentals(criteria).subscribe(
      (data: PropertiesDTO[]) => {
        this.rentals = data;
        console.log(this.rentals);
      },
      (error) => {
        console.error('Error fetching rentals', error);
      }
    );
  }
}