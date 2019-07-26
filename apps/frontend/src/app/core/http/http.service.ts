import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';

import { GIPHY_CONFIG } from '../configs/giphy-config';
import { gifConvertConfig } from '../configs/gif-convert-api.config';
import { ConversionFileData } from '../../features/upload-file/shared/file-data-interface';

@Injectable({
  providedIn: 'root'
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

  public initConvertToGif(type: string, fileData: ConversionFileData): Observable<any> {
    let { filename } = fileData;
    const { file, converteroptions } = fileData;
    filename += `.${type}`;

    const body = {
      apikey: gifConvertConfig.apiKey,
      filename,
      file,
      inputformat: type,
      outputformat: 'gif',
      input: 'base64',
      wait: false,
      download: 'inline',
      converteroptions
    };

    return this.httpClient.post('/api/gif-encoder', body);
  }

  public apiConvertToGif(videoBuffer: FormData): Observable<BinaryType> {
    return from(
      this.httpClient.post<ImageData>('/api/gif-encoder', videoBuffer, {
        headers: { Accept: 'multipart/form-data' }
      })
    );
  }

  public upoloadedGiphyFileIdToGifObject(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Accept: 'image/gif',
      'Content-Type': 'image/gif'
    });

    const url = `${this.giphyApi.getById.replace('%1', id)}${GIPHY_CONFIG.apikey}`;

    return this.httpClient.get(url);
  }
}
