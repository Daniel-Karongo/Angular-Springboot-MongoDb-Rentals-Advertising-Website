import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarComponent } from "../search-bar/search-bar.component";

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  imports: [SearchBarComponent]
})
export class NavigationBarComponent {
  constructor(private router: Router) {}

  @Output() loginPageRequest = new EventEmitter<void>();
  
  loginPageInitialiser() {
    this.loginPageRequest.emit();
    this.router.navigate(['/login']); // Navigate to the login route
  }
}