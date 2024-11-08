import { Component } from '@angular/core';
import { SearchBarComponent } from "../search/search-bar/search-bar.component";
import { RouterModule } from '@angular/router';
import { NavigationServiceService } from '../../services/navigation-service/navigation-service.service';

@Component({
  selector: 'app-component-not-found',
  standalone: true,
  imports: [SearchBarComponent, RouterModule],
  templateUrl: './component-not-found.component.html',
  styleUrl: './component-not-found.component.scss'
})
export class ComponentNotFoundComponent {
  
  constructor(private navigationService: NavigationServiceService) {

  }

  ngOnInit(): void {
    this.navigationService.clearAppComponentRequest();
  }

  initialiseHomePage(): void {
    this.navigationService.emitHomePageRequest();
  }
}
