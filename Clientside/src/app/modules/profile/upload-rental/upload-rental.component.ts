import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox'; // Import for mat-checkbox
import { MatFormFieldModule } from '@angular/material/form-field'; // Import for mat-form-field
import { MatInputModule } from '@angular/material/input'; // Import for mat-input
import { MatButtonModule } from '@angular/material/button'; // Import for mat-button
import { MatTabsModule } from '@angular/material/tabs'; // Import for mat-tab-group
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { Property } from '../../../models/Property';
import { PropertiesServiceService } from '../../../services/properties-service/properties-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiGatewayServiceService } from '../../../services/api-gateway-service/api-gateway-service.service';

@Component({
  standalone: true,
  selector: 'app-upload-rental',
  templateUrl: './upload-rental.component.html',
  imports: [CommonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTabsModule, ReactiveFormsModule, MatIconModule, MatRadioModule],
  styleUrls: ['./upload-rental.component.scss'],
})
export class UploadRentalComponent implements OnInit {
  uploadRentalForm!: FormGroup;
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

  constructor(
    private fb: FormBuilder,
    private propertiesService: PropertiesServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiGatewayService: ApiGatewayServiceService
  ) {}

  ngOnInit() {
    // Initialize the form
    this.uploadRentalForm = this.fb.group({
      basicInformation: this.fb.array([this.createBasicInformation()]),
      optionalInformation: this.fb.array([this.createOptionalInformation()])
    });
  }

  // Getter for basicInformation
  get basicInformation(): FormArray {
    return this.uploadRentalForm.get('basicInformation') as FormArray;
  }

  // Getter for optionalInformation
  get optionalInformation(): FormArray {
    return this.uploadRentalForm.get('optionalInformation') as FormArray;
  }

  // Create the form group for basic information
  createBasicInformation(): FormGroup {
    return this.fb.group({
      propertyOwnerId: [this.apiGatewayService._user.id, Validators.required],
      plotSummaryDescription: ['', Validators.required],
      plotDetailedDescription: ['', Validators.required],
      location: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      term: ['', Validators.required],
      type: ['', Validators.required],
      photographs: ['', Validators.required],
    });
  }

  // Create the form group for optional information
  createOptionalInformation(): FormGroup {
    return this.fb.group({
      ammenities: this.fb.array([this.createAmenity()]),
      tenantPreferences: this.fb.array([this.createPreference()]),
      rules: [''],
    });
  }

  // Create the form group for an amenity
  createAmenity(): FormGroup {
    return this.fb.group({
      cleanWater: [false],
      individualToken: [false],
      sharedMeter: [false],
      securityGuard: [false],
      cctv: [false],
      securityLights: [false],
      communalPitLatrine: [false],
      communalAutomaticToilets: [false],
      cleaner: [false],
      garbageCollection: [false],
      sink: [false],
      handicapAccess: [false],
      packing: [false],
      tiles: [false],
      ceiling: [false],
      balcony: [false],
      wifi: [false],
      jointTvSubscription: [false],
      airConditioning: [false],
      furnished: [false],
      swimmingPool: [false],
      gym: [false],
      others: [''],
    });
  }

  // Create the form group for tenant preferences
  createPreference(): FormGroup {
    return this.fb.group({
      gender: [''],
      students: [''],
      families: [''],
      driving: [''],
      religions: this.fb.group({
        anyReligion: [''],
        Christianity: [false],
        Islam: [false],
        Hinduism: [false],
        Buddhism: [false],
        Judaism: [false],
        Sikhism: [false],
        Other: [false],
      }),
    });
  }

  // Getter for amenities in a specific optional information group
  getAmenities(i: number): FormArray {
    return this.optionalInformation.at(i).get('ammenities') as FormArray;
  }

  // Getter for preferences in a specific optional information group
  getPreferences(i: number): FormArray {
    return this.optionalInformation.at(i).get('tenantPreferences') as FormArray;
  }

  errorMessage(field: string): string {
    if (field === 'plotSummaryDescription' && this.uploadRentalForm.get('plotSummaryDescription')?.hasError('required')) {
      return 'This summary is required';
    } else if (field === 'plotDetailedDescription' && this.uploadRentalForm.get('plotDetailedDescription')?.hasError('required')) {
      return 'This description is required';
    } else if (field === 'location' && this.uploadRentalForm.get('location')?.hasError('required')) {
      return 'The location is required';
    } else if (field === 'amount' && this.uploadRentalForm.get('amount')?.hasError('pattern')) {
      return 'The amount is required';
    } else if (field === 'term' && this.uploadRentalForm.get('term')?.hasError('required')) {
      return 'The rental term is required';
    } else if (field === 'type' && this.uploadRentalForm.get('type')?.hasError('required')) {
      return 'The type of the rental is required';
    } else if (field === 'photographs' && this.uploadRentalForm.get('photographs')?.hasError('minlength')) {
      return 'You have to upload some photographs of the rental(s)';
    }

    return '';
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
  
    if (input?.files) {
      const files: FileList = input.files; // Get FileList
      const filesArray = Array.from(files); // Convert FileList to Array<File>
  
      console.log('Selected files:', filesArray); // Debugging: Log selected files
  
      // Append each file individually with the same key
      filesArray.forEach((file) => {
        this.formData.append('photographs', file); // Appending files one by one
      });
    }
  }
  
  onSubmit() {
    // Append basic information fields
    const basicInformation = this.uploadRentalForm.getRawValue().basicInformation[0];
    
    console.log(basicInformation.propertyOwnerId);

    this.formData.append('propertyOwnerId', basicInformation.propertyOwnerId);
    this.formData.append('term', basicInformation.term);
    this.formData.append('plotSummaryDescription', basicInformation.plotSummaryDescription);
    this.formData.append('plotDetailedDescription', basicInformation.plotDetailedDescription);
    this.formData.append('amount', basicInformation.amount);
    this.formData.append('type', basicInformation.type);
    this.formData.append('location', basicInformation.location);
    if(basicInformation.rentalId)
      this.formData.append('rentalId', basicInformation.rentalId);
    if(basicInformation.rentalId)
      this.formData.append('numberOfOccupants', basicInformation.numberOfOccupants);

    // Add amenities and tenant preferences
    const optionalInformation = this.uploadRentalForm.getRawValue().optionalInformation[0];
    const amenities = optionalInformation.ammenities[0];
    const selectedAmenities = this.getSelectedAmenities(amenities);
    this.formData.append('ammenities', JSON.stringify(selectedAmenities));  // Send as JSON string

    // Handle tenant preferences
    const tenantPreferences = optionalInformation.tenantPreferences[0];
    const preferences = this.flattenTenantPreferences(tenantPreferences);
    this.formData.append('tenantPreferences', JSON.stringify(preferences));  // Send as JSON string
  
    this.formData.append('rules', optionalInformation.rules);

    // Send form data to backend
    this.propertiesService.saveRental(this.formData).subscribe(
      (data) => {
        console.log('Rental uploaded successfully', data);
        this.snackBar.open('Rental uploaded successfully', 'X', { duration: 6000 });
        this.router.navigate(['rentals'], { relativeTo: this.activatedRoute.parent});
      },
      (error) => {
        console.error('Rental upload failed', error);
        this.snackBar.open('Rental upload failed. Please try again later', 'X', { duration: 6000 });
      }
    );
  }
  
  // Helper function to flatten tenantPreferences
  flattenTenantPreferences(tenantPreferences: TenantPreferences): string[] {
    let preferences: string[] = [];

    // Iterate through the preferences
    Object.entries(tenantPreferences).forEach(([key, value]) => {
      if (typeof value === 'string') {
        // If the value is a string, directly add it to preferences
        preferences.push(value);
      } else if (typeof value === 'object' && value !== null) {
        // If the value is an object (such as religions), iterate through it
        Object.keys(value).forEach(subKey => {
          const subValue = value[subKey];
          if (typeof subValue === 'boolean' && subValue === true) {
            preferences.push(subKey); // Add the key (religion name) to preferences
          }
          if (typeof subValue === 'string' && subValue === "Any religion") {
            preferences.push("Any religion"); // Add the key (religion name) to preferences
          }
        });
      }
    });

    return preferences;
  }

  
  // Helper function to get selected amenities
  getSelectedAmenities(ammenities: any): string[] {
    const selectedAmenities: string[] = [];
  
    // Iterate over the form controls and select those that are true
    for (let amenity in ammenities) {
      if (ammenities[amenity] && amenity !== 'others') {
        selectedAmenities.push(amenity);
      }
    }
  
    // Add 'others' if the input is not empty
    if (ammenities.others && ammenities.others.trim() !== '') {
      selectedAmenities.push(ammenities.others.trim());
    }
  
    return selectedAmenities;
  }
  
  onReligionOptionChange(event: MatRadioChange) {
    // Access the 'anyReligion' form control inside the 'religions' group
    const anyReligionControl = this.uploadRentalForm.get('optionalInformation.0.tenantPreferences.0.religions.anyReligion');
  
    if (event.value === 'specific religions') {
      // Set 'anyReligion' control to null when 'specific religions' is selected
      anyReligionControl?.setValue(null);
  
      // Set the flag to true when 'specific religions' is selected
      this.isSpecificReligionSelected = true;
    } else {
      // Set 'anyReligion' control to 'Any religion' when 'any religion' is selected
      anyReligionControl?.setValue('Any religion');
  
      // Set all other controls to false (clear all specific religion selections)
      for (let religion of this.religions) {
        if (religion !== 'Any religion') {
          const religionControl = this.uploadRentalForm.get(`optionalInformation.0.tenantPreferences.0.religions.${religion}`);
          religionControl?.setValue(false);
        }
      }
  
      // Set the flag to false when 'any religion' is selected
      this.isSpecificReligionSelected = false;
    }
  
  }
}

interface TenantPreferences {
  [key: string]: string | { [key: string]: boolean | null };
}