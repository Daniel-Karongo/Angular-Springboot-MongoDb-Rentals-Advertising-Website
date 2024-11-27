import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertiesServiceService } from '../../../services/properties-service/properties-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiGatewayServiceService } from '../../../services/api-gateway-service/api-gateway-service.service';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
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

@Component({
  selector: 'app-individual-rental-component',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTabsModule, ReactiveFormsModule, MatIconModule, MatRadioModule, NgImageSliderModule],
  templateUrl: './individual-rental-component.component.html',
  styleUrl: './individual-rental-component.component.scss'
})
export class IndividualRentalComponentComponent {
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

  constructor(
    private fb: FormBuilder,
    private propertiesService: PropertiesServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalServiceService
  ) {}

  ngOnInit() {
    this.rental = this.rentalService.getRental();

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

    // Initialize the form
    this.individualRentalForm = this.fb.group({
      basicInformation: this.fb.array([this.createBasicInformation()]),
      optionalInformation: this.fb.array([this.createOptionalInformation()])
    });
  }

  // Getter for basicInformation
  get basicInformation(): FormArray {
    return this.individualRentalForm.get('basicInformation') as FormArray;
  }

  // Getter for optionalInformation
  get optionalInformation(): FormArray {
    return this.individualRentalForm.get('optionalInformation') as FormArray;
  }

  // Create the form group for basic information
  createBasicInformation(): FormGroup {
    return this.fb.group({
      rentalId: [this.rental.rentalId, Validators.required],
      propertyOwnerId: [this.rental.propertyOwner.id, Validators.required],
      plotSummaryDescription: [this.rental.plotSummaryDescription, Validators.required],
      plotDetailedDescription: [this.rental.plotDetailedDescription, Validators.required],
      location: [this.rental.location, Validators.required],
      amount: [this.rental.amount, [Validators.required, Validators.min(0)]],
      term: [this.rental.term, Validators.required],
      type: [this.rental.type, Validators.required],
      // photographs: [this.rental.photographs, Validators.required],
      photographs: [''],
    });
  }

  // Create the form group for optional information
  createOptionalInformation(): FormGroup {
    return this.fb.group({
      amenities: this.fb.array([this.createAmenity()]),
      tenantPreferences: this.fb.array([this.createPreference()]),
      rules: [''],
    });
  }

  // Create the form group for an amenity
  createAmenity(): FormGroup {
    const amenities = [
      'cleanWater', 'individualToken', 'sharedMeter', 'securityGuard',
      'cctv', 'securityLights', 'communalPitLatrine', 'communalAutomaticToilets',
      'cleaner', 'garbageCollection', 'sink', 'handicapAccess', 'packing',
      'tiles', 'ceiling', 'balcony', 'wifi', 'jointTvSubscription',
      'airConditioning', 'furnished', 'swimmingPool', 'gym'
    ];

    const otherAmenities = this.rental?.amenities
    ?.filter((amenity: string) => !amenities.includes(amenity))
    ?.join(', ') || '';

    
    return this.fb.group({
      cleanWater: [this.rental?.amenities?.includes("cleanWater") || false],
      individualToken: [this.rental?.amenities?.includes("individualToken") || false],
      sharedMeter: [this.rental?.amenities?.includes("sharedMeter") || false],
      securityGuard: [this.rental?.amenities?.includes("securityGuard") || false],
      cctv: [this.rental?.amenities?.includes("cctv") || false],
      securityLights: [this.rental?.amenities?.includes("securityLights") || false],
      communalPitLatrine: [this.rental?.amenities?.includes("communalPitLatrine") || false],
      communalAutomaticToilets: [this.rental?.amenities?.includes("communalAutomaticToilets") || false],
      cleaner: [this.rental?.amenities?.includes("cleaner") || false],
      garbageCollection: [this.rental?.amenities?.includes("garbageCollection") || false],
      sink: [this.rental?.amenities?.includes("sink") || false],
      handicapAccess: [this.rental?.amenities?.includes("handicapAccess") || false],
      packing: [this.rental?.amenities?.includes("packing") || false],
      tiles: [this.rental?.amenities?.includes("tiles") || false],
      ceiling: [this.rental?.amenities?.includes("ceiling") || false],
      balcony: [this.rental?.amenities?.includes("balcony") || false],
      wifi: [this.rental?.amenities?.includes("wifi") || false],
      jointTvSubscription: [this.rental?.amenities?.includes("jointTvSubscription") || false],
      airConditioning: [this.rental?.amenities?.includes("airConditioning") || false],
      furnished: [this.rental?.amenities?.includes("furnished") || false],
      swimmingPool: [this.rental?.amenities?.includes("swimmingPool") || false],
      gym: [this.rental?.amenities?.includes("gym") || false],
      others: [otherAmenities],
    });
  }

  // Create the form group for tenant preferences
  createPreference(): FormGroup {
    const preferences = this.rental?.tenantPreferences || [];
  
    if(preferences.includes('Christianity') || preferences.includes('Islam') || preferences.includes('Hinduism') || preferences.includes('Buddhism') || preferences.includes('Judaism') || preferences.includes('Sikhism') || preferences.includes('Other')) {
      this.isSpecificReligionSelected = true;
      this.allReligionsCheck = false;
    } else {
      this.isSpecificReligionSelected = false;
      this.allReligionsCheck = true;
    }
  
    return this.fb.group({
      gender: [
        preferences.includes('Male') ? 'Male' :
        preferences.includes('Female') ? 'Female' :
        'Any Gender'
      ],
      students: [
        preferences.includes('Students only') ? 'Students only' :
        preferences.includes('Students allowed') ? 'Students allowed' :
        'No students allowed'
      ],
      families: [
        preferences.includes('Any family setup allowed') ? 'Any family setup allowed' :
        'No small children allowed'
      ],
      driving: [
        preferences.includes('Vehicles allowed') ? 'Vehicles allowed' :
        'No vehicles allowed'
      ],
      religions: this.fb.group({
        anyReligion: [preferences.includes('Any religion')],
        Christianity: [preferences.includes('Christianity')],
        Islam: [preferences.includes('Islam')],
        Hinduism: [preferences.includes('Hinduism')],
        Buddhism: [preferences.includes('Buddhism')],
        Judaism: [preferences.includes('Judaism')],
        Sikhism: [preferences.includes('Sikhism')],
        Other: [preferences.includes('Other')],
      }),
    });
  }
    
  

  // Getter for amenities in a specific optional information group
  getAmenities(i: number): FormArray {
    return this.optionalInformation.at(i).get('amenities') as FormArray;
  }

  // Getter for preferences in a specific optional information group
  getPreferences(i: number): FormArray {
    return this.optionalInformation.at(i).get('tenantPreferences') as FormArray;
  }

  errorMessage(field: string): string {
    if (field === 'plotSummaryDescription' && this.individualRentalForm.get('plotSummaryDescription')?.hasError('required')) {
      return 'This summary is required';
    } else if (field === 'plotDetailedDescription' && this.individualRentalForm.get('plotDetailedDescription')?.hasError('required')) {
      return 'This description is required';
    } else if (field === 'location' && this.individualRentalForm.get('location')?.hasError('required')) {
      return 'The location is required';
    } else if (field === 'amount' && this.individualRentalForm.get('amount')?.hasError('pattern')) {
      return 'The amount is required';
    } else if (field === 'term' && this.individualRentalForm.get('term')?.hasError('required')) {
      return 'The rental term is required';
    } else if (field === 'type' && this.individualRentalForm.get('type')?.hasError('required')) {
      return 'The type of the rental is required';
    } else if (field === 'photographs' && this.individualRentalForm.get('photographs')?.hasError('minlength')) {
      return 'You have to upload some photographs of the rental(s)';
    }

    return '';
  }

  replacePhotosToggle() {
    this.replacePhotos = true;
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
    const basicInformation = this.individualRentalForm.getRawValue().basicInformation[0];
    
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
    const optionalInformation = this.individualRentalForm.getRawValue().optionalInformation[0];
    const amenities = optionalInformation.amenities[0];
    const selectedAmenities = this.getSelectedAmenities(amenities);
    this.formData.append('amenities', JSON.stringify(selectedAmenities));  // Send as JSON string

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
  getSelectedAmenities(amenities: any): string[] {
    const selectedAmenities: string[] = [];
  
    // Iterate over the form controls and select those that are true
    for (let amenity in amenities) {
      if (amenities[amenity] && amenity !== 'others') {
        selectedAmenities.push(amenity);
      }
    }
  
    // Add 'others' if the input is not empty
    if (amenities.others && amenities.others.trim() !== '') {
      selectedAmenities.push(amenities.others.trim());
    }
  
    return selectedAmenities;
  }
  
  onReligionOptionChange(event: MatRadioChange) {
    // Access the 'anyReligion' form control inside the 'religions' group
    const anyReligionControl = this.individualRentalForm.get('optionalInformation.0.tenantPreferences.0.religions.anyReligion');
  
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
          const religionControl = this.individualRentalForm.get(`optionalInformation.0.tenantPreferences.0.religions.${religion}`);
          religionControl?.setValue(false);
        }
      }
  
      // Set the flag to false when 'any religion' is selected
      this.isSpecificReligionSelected = false;
    }
  
  }

  ngOnDestroy() {
    this.isSpecificReligionSelected = false;
    this.allReligionsCheck = true;
    this.replacePhotos = false
  }
}

interface TenantPreferences {
  [key: string]: string | { [key: string]: boolean | null };
}