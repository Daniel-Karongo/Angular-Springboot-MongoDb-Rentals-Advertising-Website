import { Injectable } from '@angular/core';
import { environments } from '../../../environment/environment';
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { PropertyOwner } from '../../models/PropertyOwner';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class ApiGatewayServiceService {

  private baseUrl = environments.apiGatewayBaseUrl;
  private endpoints = environments.apiGatewayResourcesEndpoints;

  constructor(private http: HttpClient) { 
  }

  // registerUser: '/user/register',
  // login: '/login',
  // loginViaPostman: '/api/login',
  // getUser: '/user'

  registerUser(user: User): Observable<User> {
    const url = `${this.baseUrl}${this.endpoints.registerUser}`;
    const request = new HttpRequest('POST', url, user, {
      reportProgress: true
    });

    console.log(url);
    console.log(request);

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => event.body as User)                          // Extract the response body
    );
  }

  login(user: User): Observable<any> {
    const url = `${this.baseUrl}${this.endpoints.login}`;
    const request = new HttpRequest('POST', url, user, {
      reportProgress: true,
      responseType: 'text'  // Expect JSON response
    });

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),
      map((event: any) => event.body)
    );
}


  loginViaPostman(user: User): Observable<string> {
    const url = `${this.baseUrl}${this.endpoints.loginViaPostman}`;
    const request = new HttpRequest('POST', url, user, {
      reportProgress: true,
      responseType: 'text'
    });

    console.log(url);
    console.log(request);

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => event.body as string)                          // Extract the response body
    );
  }

  getUser(): Observable<any> {
    const url = `${this.baseUrl}${this.endpoints.getUser}`;
    const request = new HttpRequest('GET', url, {
      reportProgress: true
    });

    console.log(url);
    console.log(request);

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => event.body)                          // Extract the response body
    );
  }

  getUsers(): Observable<any> {
    const url = `${this.baseUrl}${this.endpoints.getUsers}`;
    const request = new HttpRequest('GET', url, {
      reportProgress: true
    });

    console.log(url);
    console.log(request);

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => event.body)                          // Extract the response body
    );
  }

  redirectToGoogleOAuth() {
    window.location.href = `${this.baseUrl}/oauth2/authorization/google`;
  }

  redirectToGithubOAuth() {
      window.location.href = `${this.baseUrl}/oauth2/authorization/github`;
  }
}