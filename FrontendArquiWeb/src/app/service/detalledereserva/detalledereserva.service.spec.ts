import { TestBed } from '@angular/core/testing';

import { DetalledereservaService } from './detalledereserva.service';

describe('DetalledereservaService', () => {
  let service: DetalledereservaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalledereservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
