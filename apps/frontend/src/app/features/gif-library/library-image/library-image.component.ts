import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GIFObject } from '../../../core/types/gif-object.type';
import { Params, Router } from '@angular/router';
import { MainService } from '../../../shared/services/main.service';
import { MatSnackBar } from '@angular/material';
import { CopiedNotificationComponent } from './shared/copied-notification.component';

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

    constructor(private router: Router, private notify: MatSnackBar) {}

    ngOnInit() {
        this.imageSrc = this.getLibImgSrc();
    }

    public imageDetail(): void {
        this.router.navigate(['images', this.detailsClues.category, this.detailsClues.el]);
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
        const newWidth = (100 * readWidth) / readHeight;
        const height = (readHeight < 100 ? 100 : readHeight) + 'px';
        const width = (readHeight < 100 ? newWidth : this.getWidth()) + 'px';

        return { width, height };
    }
}
