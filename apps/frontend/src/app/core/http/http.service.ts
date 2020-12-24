import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GIPHY_CONFIG } from '../configs/giphy-config';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public giphyApi = GIPHY_CONFIG.endpoints;

  constructor(private httpClient: HttpClient) {}

  public searchGifs(searchTerms, options?): Observable<any> {
    const url = `${this.giphyApi.search}${GIPHY_CONFIG.apikey}`;

    return this.httpClient.get(`${url}&q=${searchTerms}&limit=8`);
  }

  public giphyUpload(fileData, tags: string[]): Observable<any> {
    const url = `${this.giphyApi.upload}${GIPHY_CONFIG.apikey}`;
    fileData['api_key'] = GIPHY_CONFIG.apikey;

    const formData = new FormData();

    formData.append('api_key', fileData.api_key);
    formData.append('file', fileData.file);
    formData.append('filename', fileData.name);

    return this.httpClient.post(url, formData);
  }

  public apiConvertToGifObservable(videoBuffer: FormData): Observable<Blob> {
    return this.httpClient.post('/api/gif-encoder', videoBuffer, {
      responseType: 'blob',
    });
  }

  public upoloadedGiphyFileIdToGifObject(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Accept: 'image/gif',
      'Content-Type': 'image/gif',
    });

    const url = `${this.giphyApi.getById.replace('%1', id)}${GIPHY_CONFIG.apikey}`;

    return this.httpClient.get(url);
  }
}
