import { TestBed } from '@angular/core/testing';

import { ApiGatewayServiceService } from './api-gateway-service.service';

describe('ApiGatewayServiceService', () => {
  let service: ApiGatewayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGatewayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
