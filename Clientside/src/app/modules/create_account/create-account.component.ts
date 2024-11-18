// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-create-account',
//   standalone: true,
//   imports: [],
//   templateUrl: './create-account.component.html',
//   styleUrl: './create-account.component.scss'
// })
// export class CreateAccountComponent {

// }


import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiGatewayServiceService } from '../../services/api-gateway-service/api-gateway-service.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnDestroy {

  createAccountForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiGatewayService: ApiGatewayServiceService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.createAccountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
    
  }

  ngAfterViewChecked(): void {
    // Trigger change detection manually
    this.cdRef.detectChanges();
  }

  createAccount(): void {
    if (this.createAccountForm.valid) {
      this.apiGatewayService.registerUser(this.createAccountForm.value).subscribe(
        (data) => {
          console.log('Account created successfully:', data);
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Error creating account:', error);
        }
      );
    }
  }

  errorMessage(field: string): string {
    if (field === 'firstName' && this.createAccountForm.get('firstName')?.hasError('required')) {
      return 'First Name is required';
    } else if (field === 'lastName' && this.createAccountForm.get('lastName')?.hasError('required')) {
      return 'Last Name is required';
    } else if (field === 'phoneNumber' && this.createAccountForm.get('phoneNumber')?.hasError('required')) {
      return 'Phone Number is required';
    } else if (field === 'phoneNumber' && this.createAccountForm.get('phoneNumber')?.hasError('pattern')) {
      return 'Invalid Phone Number format';
    } else if (field === 'emailAddress' && this.createAccountForm.get('emailAddress')?.hasError('required')) {
      return 'Email Address is required';
    } else if (field === 'emailAddress' && this.createAccountForm.get('emailAddress')?.hasError('email')) {
      return 'Invalid Email Address format';
    } else if (field === 'password' && this.createAccountForm.get('password')?.hasError('required')) {
      return 'Password is required';
    } else if (field === 'password' && this.createAccountForm.get('password')?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    } else if (field === 'confirmPassword' && this.createAccountForm.get('confirmPassword')?.hasError('required')) {
      return 'Confirm Password is required';
    }
  
    return '';
  }

  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
  
    return password && confirmPassword && password === confirmPassword 
      ? null 
      : { passwordMismatch: true };
  }

  ngOnDestroy(): void {}
}