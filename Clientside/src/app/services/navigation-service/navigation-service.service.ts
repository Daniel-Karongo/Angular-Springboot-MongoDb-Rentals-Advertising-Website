import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationServiceService {

  private homePageRequestSource = new Subject<void>();
  homePageRequest$ = this.homePageRequestSource.asObservable();

  private clearAppComponentSource = new Subject<void>();
  clearAppComponent$ = this.clearAppComponentSource.asObservable();

  emitHomePageRequest() {
    this.homePageRequestSource.next();
  }

  clearAppComponentRequest() {
    this.clearAppComponentSource.next();
  }
}
