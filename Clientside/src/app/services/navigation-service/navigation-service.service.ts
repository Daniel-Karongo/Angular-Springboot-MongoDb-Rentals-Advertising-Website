import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationServiceService {

  private homePageRequestSource = new Subject<void>();
  homePageRequest$ = this.homePageRequestSource.asObservable();

  emitHomePageRequest() {
    this.homePageRequestSource.next();
  }
}
