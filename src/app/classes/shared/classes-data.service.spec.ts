import { TestBed } from '@angular/core/testing';

import { ClassesDataService } from './classes-data.service';

describe('ClassesDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassesDataService = TestBed.get(ClassesDataService);
    expect(service).toBeTruthy();
  });
});
