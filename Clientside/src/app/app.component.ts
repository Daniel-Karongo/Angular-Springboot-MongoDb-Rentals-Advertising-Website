import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from "./modules/search/navigation-bar/navigation-bar.component";
import { SearchBarComponent } from "./modules/search/search-bar/search-bar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent, SearchBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'housesearchke';

  isLoginPage = false;

  loginPageInitialiser() {
    this.isLoginPage = true;
  }
}
