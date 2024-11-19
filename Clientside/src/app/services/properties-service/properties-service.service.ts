import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { PropertiesDTO } from '../../models/PropertiesDTO';
import { map, filter } from 'rxjs/operators';
import { Property } from '../../models/Property';

@Injectable({
  providedIn: 'root'
})
export class PropertiesServiceService {

  private baseUrl = environments.propertiesApiBaseUrl;
  private endpoints = environments.propertiesResourcesEndpoints;

  constructor(
    private http: HttpClient
  ) { 
  }

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

  searchRentals(criteria: string): Observable<PropertiesDTO[]> {
    const url = `${this.baseUrl}${this.endpoints.searchRentals}${criteria}`;
    const request = new HttpRequest('GET', url, {
      reportProgress: true
    });

    console.log(url);
    console.log(request);

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => event.body as PropertiesDTO[])                          // Extract the response body
    );
  }

  getRental(rentalId: string): Observable<PropertiesDTO[]> {
    const url = `${this.baseUrl}${this.endpoints.getRental}${rentalId}`;
    const request = new HttpRequest('GET', url, {
      reportProgress: true
    });

    console.log(url);
    console.log(request);

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => event.body as PropertiesDTO[])                          // Extract the response body
    );
  }

  saveRental(rental: Property): Observable<Property> {
    const url = `${this.baseUrl}${this.endpoints.saveRental}`;
    const request = new HttpRequest('POST', url, rental, {
      reportProgress: true,
    });

    console.log(url);
    console.log(request);

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => event.body as Property)                          // Extract the response body
    );
  }
}