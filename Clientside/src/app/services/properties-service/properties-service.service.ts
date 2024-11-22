import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { PropertiesDTO } from '../../models/PropertiesDTO';
import { map, filter, tap } from 'rxjs/operators';
import { Property } from '../../models/Property';
import { response } from 'express';

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

  saveRental(formData: FormData): Observable<Property> {
    const url = `${this.baseUrl}${this.endpoints.saveRental}`;

    // Construct the HTTP request
    const request = new HttpRequest('POST', url, formData, {
        headers: new HttpHeaders(),
        reportProgress: true, // Enable progress reporting
        withCredentials: true, // Optional, if you need to send credentials (cookies, headers)
    });

    return this.http.request(request).pipe(
      tap(event => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
              const progress = Math.round((event.loaded / event.total) * 100);
              console.log(`Upload Progress: ${progress}%`);
          }
      }),
      filter(event => event.type === HttpEventType.Response),
      map((event: any) => event.body as Property)
  );
  
  }

  

  deleteRental(rentalId: string): Observable<String> {
    const url = `${this.baseUrl}${this.endpoints.deleteRental}${rentalId}`;
    const request = new HttpRequest('DELETE', url, {
      reportProgress: true,
      responseType: "text"
    });

    console.log(url);
    console.log(request);

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => event.body as string)                          // Extract the response body
    );
  }
}