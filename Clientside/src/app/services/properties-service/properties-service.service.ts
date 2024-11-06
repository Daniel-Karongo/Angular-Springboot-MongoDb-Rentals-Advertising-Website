import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { PropertiesDTO } from '../../models/PropertiesDTO';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropertiesServiceService {

  private baseUrl = environments.propertiesApiBaseUrl;
  private endpoints = environments.propertiesResourcesEndpoints;

  constructor(private http: HttpClient) { 
  }

  // getAllRentals: '',
  //       getRental: '/property/{rentalId}',
  //       saveRental: '/property',
  //       searchRentals: '/properties/{text}'

  getAllRentals(): Observable<PropertiesDTO[]> {
    const url = `${this.baseUrl}${this.endpoints.getAllRentals}`;
    const request = new HttpRequest('GET', url, {
      reportProgress: true
    });

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => event.body as PropertiesDTO[])                          // Extract the response body
    );
  }
}
