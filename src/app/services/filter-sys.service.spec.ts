import { TestBed } from '@angular/core/testing';

import { FilterSysService } from './filter-sys.service';

describe('FilterSysService', () => {
  let service: FilterSysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterSysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
