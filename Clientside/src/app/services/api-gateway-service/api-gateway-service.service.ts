import { Injectable } from '@angular/core';
import { environments } from '../../../environment/environment';
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { PropertyOwner } from '../../models/PropertyOwner';
import { User } from '../../models/User';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID function

@Injectable({
  providedIn: 'root'
})
export class ApiGatewayServiceService {
  private emailAddress!: string;
  private password!: string;
  private user!: PropertyOwner | null;
  
  private userSubject = new BehaviorSubject<PropertyOwner | null>(null);
  user$ = this.userSubject.asObservable();

  get _emailAddress(): string {
    return this.emailAddress;
  }

  get _password(): string {
    return this.password;
  }

  get _user(): PropertyOwner | null {
    return this.user;
  }

  set _emailAddress(emailAddress: any) {
    this.emailAddress = emailAddress;
  }
  set _password(password: any) {
      this.password = password;
  }
  set _user(user: PropertyOwner | null) {
    this.user = user;
    this.userSubject.next(user); // Emit the new user value
  }

  private baseUrl = environments.apiGatewayBaseUrl;
  private endpoints = environments.apiGatewayResourcesEndpoints;
  
  private readonly instanceId: string;

  constructor(private http: HttpClient) { 
    this.instanceId = uuidv4(); // Generate a unique ID
    console.log(`API GATEWAY instance ID: ${this.instanceId}`);
  }

  ngOnDestroy(): void {
    console.log(`API GATEWAY instance ID: ${this.instanceId} is being destroyed.`);
    // Perform any necessary cleanup or logging here
  }

  registerUser(user: PropertyOwner): Observable<PropertyOwner> {
    const url = `${this.baseUrl}${this.endpoints.registerUser}`;
    const request = new HttpRequest('POST', url, user, {
      reportProgress: true
    });

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => {
        this.password = user.password;
        this.emailAddress = user.emailAddress;
        this._user = user;
        return event.body as PropertyOwner
      })                          // Extract the response body
    );
  }

  login(user: User): Observable<any> {
    const url = `${this.baseUrl}${this.endpoints.login}`;
    return this.http.post(url, user, { responseType: 'text' }).pipe(
      map((response: any) => {
        // Get the token from the cookie
        const tokenFromCookie = this.getCookie('authToken'); // Replace 'authToken' with your cookie name
        
        // localStorage.setItem('emailAddress', user.emailAddress);
        // localStorage.setItem('password', user.password);
  
        this.emailAddress = user.emailAddress;
        this.password = user.password;

        // Remove emailAddress after 10 seconds
        // setTimeout(() => {
        //   localStorage.removeItem('emailAddress');
        // }, 10000);
  
        // Remove password after 30 seconds
        // setTimeout(() => {
        //   localStorage.removeItem('password');
        // }, 30000);
  
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

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => event.body as string)                          // Extract the response body
    );
  }

  getUser(): Observable<PropertyOwner> {
    // const emailAddress = localStorage.getItem('emailAddress');
    const emailAddress = this.emailAddress;

    const url = `${this.baseUrl}${this.endpoints.getUser}`;
    const request = new HttpRequest('POST', url, emailAddress, {
      reportProgress: true,
      withCredentials: true
    });

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => {
          return event.body as PropertyOwner
      })                          // Extract the response body
    );
  }

  getUsers(): Observable<any> {
    const url = `${this.baseUrl}${this.endpoints.getUsers}`;
    const request = new HttpRequest('GET', url, {
      reportProgress: true
    });

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