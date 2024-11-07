import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationServiceService } from '../../services/navigation-service/navigation-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private router: Router, 
    private navigationService: NavigationServiceService
  ) {}

  ngOnDestroy(): void {
    console.log("Homepage recalled");
    this.navigationService.emitHomePageRequest();
    this.router.navigate(['/']);
    console.log("Routing");
  }
}