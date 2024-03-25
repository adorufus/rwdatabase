import { TestBed } from '@angular/core/testing';

import { RwdFiretoolsService } from './rwd-firetools.service';

describe('RwdFiretoolsService', () => {
  let service: RwdFiretoolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RwdFiretoolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
