import { TestBed } from '@angular/core/testing';

import { PropertyOwnersServiceService } from './property-owners-service.service';

describe('PropertyOwnersServiceService', () => {
  let service: PropertyOwnersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyOwnersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
