import { TestBed } from '@angular/core/testing';

import { LibMyTetrisService } from './tetris-library.service';

describe('LibMyTetrisService', () => {
  let service: LibMyTetrisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibMyTetrisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
