import { TestBed } from '@angular/core/testing';

import { DocumentopagoService } from './documentopago.service';

describe('DocumentopagoService', () => {
  let service: DocumentopagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentopagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
