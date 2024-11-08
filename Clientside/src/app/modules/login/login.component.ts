import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationServiceService } from '../../services/navigation-service/navigation-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiGatewayServiceService } from '../../services/api-gateway-service/api-gateway-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormField, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginForm!: FormGroup;
  token!: string;
  loginSuccessful: boolean = false;
  message!: string;  // New variable to hold the success message
  
  constructor(
    private router: Router, 
    private navigationService: NavigationServiceService,
    private fb: FormBuilder,
    private apiGateWayService: ApiGatewayServiceService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  login(): void {
    console.log(this.loginForm.value);
    this.apiGateWayService.login(this.loginForm.value).subscribe(
      (data) => {
        this.token = data;
        console.log(this.token);
        if (data.includes('Login successful') && !this.token.includes('oauth')) {  // Assuming oauth token doesn't include 'oauth'
          console.log("Navigating to profile");
          this.loginSuccessful = true;
          this.router.navigate(['/profile']);
        }
      },
      (error) => {
        console.error('Error logging in', error);
      }
    );
  }
  

  redirectToGoogleOAuth() {
    console.log("Login with Google");
    this.apiGateWayService.redirectToGoogleOAuth();
  }

  redirectToGithubOAuth() {
    console.log("Login with Github");
    this.apiGateWayService.redirectToGithubOAuth();
  }

  ngOnDestroy(): void {
    if(!this.loginSuccessful) {
      this.navigationService.emitHomePageRequest();
      this.router.navigate(['/']);
    }
  }
}