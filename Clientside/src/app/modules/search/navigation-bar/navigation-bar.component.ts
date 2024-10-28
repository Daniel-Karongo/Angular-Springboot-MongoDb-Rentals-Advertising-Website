import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  constructor(private router: Router) {}

  @Output() loginPageRequested = new EventEmitter<void>();
  
  loginPageInitialiser() {
    this.loginPageRequested.emit()
    this.router.navigate(['/login']); // Navigate to the login route
  }
}