import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ FormsModule, CommonModule, MatFormField, MatInputModule, MatInputModule ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  criteria: string = ''; // Declare criteria property
  
  searchRentals(criteria: string): void {
    console.log(criteria);
  }
}