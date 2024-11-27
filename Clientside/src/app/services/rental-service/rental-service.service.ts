import { Injectable } from '@angular/core';
import { PropertiesDTO } from '../../models/PropertiesDTO';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalServiceService {

  constructor() { }
  private rentalsDataSubject = new BehaviorSubject<PropertiesDTO[] | null>(null);
  rentalsData$ = this.rentalsDataSubject.asObservable();

  private rentalData!: PropertiesDTO;
  private rentalsData!: PropertiesDTO[];

  setRental(data: PropertiesDTO) {
    this.rentalData = data;
  }

  getRental(): PropertiesDTO {
    return this.rentalData;
  }

  setRentals(data: PropertiesDTO[]) {
    this.rentalsData = data;
    this.rentalsDataSubject.next(data);
  }

  getRentals(): PropertiesDTO[] {
    return this.rentalsData;
  }
}
