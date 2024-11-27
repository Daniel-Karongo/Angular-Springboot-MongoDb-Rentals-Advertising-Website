import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, RouterModule } from '@angular/router';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertiesServiceService } from '../../../services/properties-service/properties-service.service';
import { RentalServiceService } from '../../../services/rental-service/rental-service.service';
import { PropertiesDTO } from '../../../models/PropertiesDTO';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results-dashboard',
  standalone: true,
  imports: [RouterModule, SearchResultsComponent, FormsModule, CommonModule, MatFormField, MatInputModule, ReactiveFormsModule],
  templateUrl: './search-results-dashboard.component.html',
  styleUrl: './search-results-dashboard.component.scss'
})
export class SearchResultsDashboardComponent {
  searchForm!: FormGroup;
  
  @Output() loginPageRequest = new EventEmitter<void>();
  
  constructor(
    private fb: FormBuilder,
    private propertiesService: PropertiesServiceService,
    private rentalsService: RentalServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  loginPageInitialiser() {
    this.loginPageRequest.emit();
    this.router.navigate(['/login']); // Navigate to the login route
  }

  ngOnInit(): void {
    console.log("initialising component")
    this.searchForm = this.fb.group({
      criteria: ['', Validators.required]
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // You can handle cleanup here if necessary
        console.log('Navigating away, cleanup can be triggered');
        this.ngOnDestroy(); // Manually call cleanup logic if needed
      }
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
  ngOnDestroy() {
    console.log("Destroying component")
  }
}