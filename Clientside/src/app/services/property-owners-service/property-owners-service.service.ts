import { Injectable } from '@angular/core';
import { environments } from '../../../environment/environment';
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { PropertyOwner } from '../../models/PropertyOwner';
import { PropertiesDTO } from '../../models/PropertiesDTO';

@Injectable({
  providedIn: 'root'
})
export class PropertyOwnersServiceService {

  private baseUrl = environments.ownersApiBaseUrl;
  private endpoints = environments.ownersResourcesEndpoints;
  
  constructor(
    private http: HttpClient
  ) { }

// getAllPropertyOwners
// getPropertyOwner
// getAllOwnersProperties

  getAllPropertyOwners(): Observable<PropertyOwner[]> {
    const url = `${this.baseUrl}${this.endpoints.getAllPropertyOwners}`;
    const request = new HttpRequest('GET', url, {
      reportProgress: true,
      withCredentials: true
    });

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => event.body as PropertyOwner[])                          // Extract the response body
    );
  }

  getPropertyOwner(id: string): Observable<PropertyOwner> {
    const url = `${this.baseUrl}${this.endpoints.getPropertyOwner}${id}`;
    const request = new HttpRequest('GET', url, {
      reportProgress: true,
      withCredentials: true
    });

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => event.body as PropertyOwner)                          // Extract the response body
    );
  }

  getAllOwnersProperties(id: string): Observable<PropertiesDTO[]> {
    const url = `${this.baseUrl}${this.endpoints.getAllOwnersProperties}${id}`;
    const request = new HttpRequest('GET', url, {
      reportProgress: true,
      withCredentials: true
    });

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => event.body as PropertiesDTO[])                          // Extract the response body
    );
  }
}