import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from '../../../core/http/http.service';
import { SEARCH_GIPHY_RESPONSE } from '../../../core/http/types/search-giphy-response';
import { GIFObject } from '../../../core/types/gif-object.type';

@Injectable()
export class SearchGiphyService {
  constructor(private httpService: HttpService) {}

  search(terms: string): Observable<GIFObject[]> {
    return this.httpService.searchGifs(terms).pipe(map((results: SEARCH_GIPHY_RESPONSE) => results.data));
  }
}
