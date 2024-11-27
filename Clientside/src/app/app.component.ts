import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationBarComponent } from "./modules/search/navigation-bar/navigation-bar.component";
import { SearchBarComponent } from "./modules/search/search-bar/search-bar.component";
import { CommonModule } from '@angular/common';
import { NavigationServiceService } from './services/navigation-service/navigation-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'housesearchke';
  isLoginPage = false;
  isHomePage = true;

  constructor(
    private navigationService: NavigationServiceService,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private route: Router
  ) {}

  ngOnInit() {
    this.isHomePage = true;
    this.isLoginPage = false;

    this.route.navigateByUrl('/');
  }

  loginPageInitialiser() {
    this.isLoginPage = true;
    this.isHomePage = false;
  }

  ngOnDestroy(): void {
  }
}
