import { TestBed } from '@angular/core/testing';

import { Contract20Service } from './contract20.service';

describe('Contract20Service', () => {
  let service: Contract20Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Contract20Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
