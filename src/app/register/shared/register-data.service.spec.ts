import { TestBed } from '@angular/core/testing';

import { RegisterDataService } from './register-data.service';

describe('RegisterDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterDataService = TestBed.get(RegisterDataService);
    expect(service).toBeTruthy();
  });
});
