import { Component } from '@angular/core';
import { ApiGatewayServiceService } from '../../services/api-gateway-service/api-gateway-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  
  users!: any;

  constructor(
    private apiGateWayService: ApiGatewayServiceService
  ) {
    
  }
  
  ngOnInit(): void {
    
  }

  getUsers(): void {
    this.apiGateWayService.getUser().subscribe(
      (data) => {
          this.users = data;
          console.log(this.users);
      },
      (error) => {
          console.error('Error loading user data', error);
      }
    );
  }
}
