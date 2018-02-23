import { TestBed, inject } from '@angular/core/testing';

import { FormValidetorsService } from './form-validetors.service';

describe('FormValidetorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormValidetorsService]
    });
  });

  it('should be created', inject([FormValidetorsService], (service: FormValidetorsService) => {
    expect(service).toBeTruthy();
  }));
});
