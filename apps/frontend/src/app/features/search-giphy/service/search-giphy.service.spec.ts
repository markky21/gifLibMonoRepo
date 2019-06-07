import { TestBed } from '@angular/core/testing';

import { SearchGiphyService } from './search-giphy.service';

describe('SearchGiphyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchGiphyService = TestBed.get(SearchGiphyService);
    expect(service).toBeTruthy();
  });
});
