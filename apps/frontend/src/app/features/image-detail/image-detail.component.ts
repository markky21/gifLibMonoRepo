import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { isEmpty } from 'lodash';

import { GIFObject } from '../../core/types/gif-object.type';
import { MainService } from '../../shared/services/main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss'],
})
export class ImageDetailComponent implements OnInit, OnDestroy {
  public category: string;
  public id: number;
  public libraryLoaded: boolean;
  public image: GIFObject;
  public originalImageUrl: any;
  public subscriptions = new Subscription();

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.subscribeToLibrary();
  }

  private subscribeToLibrary(): void {
    if (isEmpty(this.mainService.getLibrary())) {
      const librarySub = this.mainService.libraryUpdate.subscribe(() => {
        this.libraryLoaded = true;
        this.subscribeRouteParams();
      });

      this.subscriptions.add(librarySub);
    } else {
      this.subscribeRouteParams();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private convertArrBufferToSafeUrl(arrBuffer: ArrayBuffer): SafeResourceUrl {
    const blob = new Blob([new Uint8Array(arrBuffer)]);
    const urlCreator = window.URL;
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urlCreator.createObjectURL(blob));

    return safeUrl;
  }

  private setImage(): void {
    const headers = new HttpHeaders({
      Accept: 'image/gif',
    });

    //TODO: Cancel old http request when old is in progress and want to shoot a new one

    const options = { headers, reportProgress: true, responseType: 'arraybuffer' };

    const req = new HttpRequest('GET', this.image.images.original.url, options);
    // const req = new HttpRequest('GET', 'https://media.giphy.com/media/O5AZJzYhCr1NS/source.gif', options);

    this.http.request(req).subscribe((event: HttpEvent<any>) => {
      if (event.type === HttpEventType.DownloadProgress) {
        this.mainService.progress.next(Math.floor((event.loaded / event.total) * 100));
      }

      if (event.type === HttpEventType.Response) {
        this.originalImageUrl = this.convertArrBufferToSafeUrl(event.body);
      }
    });
  }

  private getImage(): void {
    this.originalImageUrl = null;
    this.image = this.mainService.getImage(this.category, this.id);
    this.setImage();
  }

  private subscribeRouteParams(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const category = paramMap.get('category');
      const id = Number(paramMap.get('id'));

      this.category = category;
      this.id = +id;

      this.getImage();
    });
  }
}
