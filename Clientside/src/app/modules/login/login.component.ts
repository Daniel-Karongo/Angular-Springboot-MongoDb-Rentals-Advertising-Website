import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiGatewayServiceService } from '../../services/api-gateway-service/api-gateway-service.service';
import { NavigationServiceService } from '../../services/navigation-service/navigation-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  
  loginForm!: FormGroup;
  token!: string;
  loginSuccessful: boolean = false;
  message!: string;
  hidePassword: boolean = true;
  
  constructor(
    private router: Router, 
    private navigationService: NavigationServiceService,
    private fb: FormBuilder,
    private apiGatewayService: ApiGatewayServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  login(): void {
    if (this.loginForm.valid) {
      this.apiGatewayService.login(this.loginForm.value).subscribe(
        (data) => {
          this.token = data;
          if (data.includes('Login successful') && !this.token.includes('oauth')) {
            this.loginSuccessful = true;
            this.snackBar.open('Login successful', 'X', {
              duration: 6000, // Snackbar will auto-close after 3 seconds
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.router.navigate(['/profile']);
          }
        },
        (error) => {
          console.error('Error logging in', error);
          this.snackBar.open('Invalid credentials. Please try again.', 'X', {
            duration: 6000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
    }
  }

  errorMessage(field: string): string {
    if (field === 'email' && this.loginForm.get('emailAddress')?.hasError('required')) {
      return 'Email is required';
    } else if (field === 'email' && this.loginForm.get('emailAddress')?.hasError('email')) {
      return 'Invalid email format';
    } else if (field === 'password' && this.loginForm.get('password')?.hasError('required')) {
      return 'Password is required';
    }
    return '';
  }

  redirectToGoogleOAuth() {
    this.apiGatewayService.redirectToGoogleOAuth();
  }

  redirectToGithubOAuth() {
    this.apiGatewayService.redirectToGithubOAuth();
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  
  ngOnDestroy(): void {
  }
}
