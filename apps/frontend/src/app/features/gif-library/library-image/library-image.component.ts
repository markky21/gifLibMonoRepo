import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GIFObject } from '../../../core/types/gif-object.type';
import { Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CopiedNotificationComponent } from './shared/copied-notification.component';
import { MainService } from '../../../shared/services/main.service';

interface DetailsCluesInterface {
  category: string;
  el: number;
}

@Component({
  selector: 'app-library-image',
  templateUrl: './library-image.component.html',
  styleUrls: ['./library-image.component.scss'],
})
export class LibraryImageComponent implements OnInit {
  @Input() img: GIFObject;
  @Input() detailsClues: DetailsCluesInterface;
  @Output() showTools: EventEmitter<number>;
  @ViewChild('URL', { static: true }) public URLtextarea: ElementRef;

  public imageSrc: string;
  public toolsVisible = false;

  constructor(private router: Router, private notify: MatSnackBar, private mainServ: MainService) {}

  ngOnInit() {
    this.imageSrc = this.getLibImgSrc();
  }

  public imageDetail(): void {
    this.router.navigate(['images', this.detailsClues.category, this.detailsClues.el]);
  }

  public imageRemove(): void {
    this.mainServ.deleteImage(this.detailsClues.category, this.img);
  }

  public getLibImgSrc(): string {
    if (this.img) {
      return this.img.images.preview_gif.url || this.img.images.downsized.url;
    }
  }

  public getWidth(): string {
    return this.img.images.preview_gif.width || this.img.images.downsized.width;
  }

  public getHeight(): string {
    return this.img.images.preview_gif.height || this.img.images.downsized.height;
  }

  public toggleTools(): void {
    this.toolsVisible = !this.toolsVisible;
  }

  public copyUrl(): void {
    this.URLtextarea.nativeElement.select();
    document.execCommand('copy');
    this.notify.openFromComponent(CopiedNotificationComponent);
  }

  public setDimensions(): Params {
    const readHeight = parseInt(this.getHeight(), 10);
    const readWidth = parseInt(this.getWidth(), 10);
    const wRatio = readWidth / readHeight;
    const height = readHeight > 200 ? 200 : readHeight < 100 ? 200 : readHeight;

    const width = readHeight > 200 ? 200 : readHeight < 100 ? 200 : readHeight;
    console.log(width);

    return { height: height + 'px', width: width + 'px' };
  }
}
