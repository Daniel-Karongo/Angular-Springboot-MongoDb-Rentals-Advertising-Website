import { Component, Input } from '@angular/core';
import { ApiGatewayServiceService } from '../../../services/api-gateway-service/api-gateway-service.service';
import { PropertyOwner } from '../../../models/PropertyOwner';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-information',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule],
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.scss'
})
export class UserInformationComponent {
  user!: PropertyOwner; // Accept user data as an input
  userInformationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiGatewayService: ApiGatewayServiceService
  ) {  }

  ngOnInit(): void {
    this.userInformationForm = this.fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.getUserInformation();
  }

  getUserInformation() {
    this.apiGatewayService.getUser().subscribe(
      (data) => {
        // Ensure data is not undefined before assigning it to this.user
        if (data) {
          this.user = data;
  
          // Patch form values only after user data is available
          this.userInformationForm.patchValue({
            id: this.user.id,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            phoneNumber: this.user.phoneNumber,
            emailAddress: this.user.emailAddress,
            // password: localStorage.getItem('password'),
            password: this.apiGatewayService._password,
          });
        }
      },
      (error) => {
        console.error('Error fetching user data in', error);
      }
    );
  }
  
  errorMessage(field: string): string {
    if (field === 'firstName' && this.userInformationForm.get('firstName')?.hasError('required')) {
      return 'First Name is required';
    } else if (field === 'lastName' && this.userInformationForm.get('lastName')?.hasError('required')) {
      return 'Last Name is required';
    } else if (field === 'phoneNumber' && this.userInformationForm.get('phoneNumber')?.hasError('required')) {
      return 'Phone Number is required';
    } else if (field === 'phoneNumber' && this.userInformationForm.get('phoneNumber')?.hasError('pattern')) {
      return 'Invalid Phone Number format';
    } else if (field === 'emailAddress' && this.userInformationForm.get('emailAddress')?.hasError('required')) {
      return 'Email Address is required';
    } else if (field === 'emailAddress' && this.userInformationForm.get('emailAddress')?.hasError('email')) {
      return 'Invalid Email Address format';
    } else if (field === 'password' && this.userInformationForm.get('password')?.hasError('required')) {
      return 'Password is required';
    } else if (field === 'password' && this.userInformationForm.get('password')?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    return '';
  }

  editUserDetails(): void {
    console.log('Edit user information');
    // Add logic for editing user info
  }
}
