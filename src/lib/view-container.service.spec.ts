import { TestBed } from '@angular/core/testing';

import { ViewContainerService } from './view-container.service';

describe('ViewContainerService', () => {
  let service: ViewContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
