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

  registerUser(user: PropertyOwner): Observable<PropertyOwner> {
    console.log(user)
    const url = `${this.baseUrl}${this.endpoints.registerUser}`;
    const request = new HttpRequest('POST', url, user, {
      reportProgress: true
    });

    console.log(url);
    console.log(request);

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => event.body as PropertyOwner)                          // Extract the response body
    );
  }

  login(user: User): Observable<any> {
    const url = `${this.baseUrl}${this.endpoints.login}`;
    return this.http.post(url, user, { responseType: 'text' }).pipe(
      map((response: any) => {
        // Get the token from the cookie
        const tokenFromCookie = this.getCookie('authToken'); // Replace 'authToken' with your cookie name
        
        localStorage.setItem('emailAddress', user.emailAddress);
        localStorage.setItem('password', user.password);
  
        // Remove emailAddress after 10 seconds
        setTimeout(() => {
          localStorage.removeItem('emailAddress');
        }, 10000);
  
        // Remove password after 30 seconds
        setTimeout(() => {
          localStorage.removeItem('password');
        }, 30000);
  
        if (tokenFromCookie) {
          // If token is found in the cookie, store it in localStorage
          localStorage.setItem('authToken', tokenFromCookie);
        } else {
          // If the response contains the token, extract it and store it in localStorage
          const tokenMatch = response.match(/Token: (.+)$/);
          if (tokenMatch) {
            const token = tokenMatch[1];
            localStorage.setItem('authToken', token); // Store the token in localStorage
          }
        }
  
        // Remove authToken after 12 hours
        setTimeout(() => {
          localStorage.removeItem('authToken');
        }, 43200000); // 12 hours in milliseconds
  
        return response;
      })
    );
  }
  

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
    return null;
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
    const emailAddress = localStorage.getItem('emailAddress');

    const url = `${this.baseUrl}${this.endpoints.getUser}`;
    const request = new HttpRequest('POST', url, emailAddress, {
      reportProgress: true,
      withCredentials: true
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