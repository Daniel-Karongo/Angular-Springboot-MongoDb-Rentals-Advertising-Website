import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from "./modules/search/navigation-bar/navigation-bar.component";
import { SearchBarComponent } from "./modules/search/search-bar/search-bar.component";
import { CommonModule } from '@angular/common';
import { NavigationServiceService } from './services/navigation-service/navigation-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent, SearchBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'housesearchke';
  isLoginPage = false;
  isHomePage = true;

  constructor(private navigationService: NavigationServiceService) {}

  ngOnInit() {
    this.navigationService.homePageRequest$.subscribe(() => {
      this.isHomePage = true;
      this.isLoginPage = false;
    });
  }

  loginPageInitialiser() {
    this.isLoginPage = true;
    this.isHomePage = false;
  }
}