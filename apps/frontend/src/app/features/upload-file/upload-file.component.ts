import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MainService } from '../../shared/services/main.service';
import { FRAME_RATES } from './shared/video-converter-options.interfaces';
import { UploadFileService } from './services/upload-file.service';
import { Observable } from 'rxjs';

export const DEFAULT_CATEGORY_VALUE = 'Click one of the tags to set it as category';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  public imageUploadForm: FormGroup;
  public frameRates = Object.values(FRAME_RATES);
  public resolutions: string[] = [];
  public loadedVideo$;
  public converting$: Observable<boolean>;
  public tags: string[] = [];
  public originalResolution: string;
  public convertResolution: string;

  constructor(private mainService: MainService, private uploadService: UploadFileService) {}

  get convertRes(): string {
    return this.imageUploadForm.get('resolution').value;
  }

  public buildForm(): void {
    this.imageUploadForm = this.uploadService.buildUploadAndConvertForm();
    this.convertResolution = this.convertRes;
  }

  // TODO: Add box showing size of converted file as preview

  public videoLoaded(w: number, h: number, event): void {
    const ratio = w / h;

    this.originalResolution = `${w}x${h}`;
    this.uploadService.loadedVideo$.next(true);
    this.resolutions = this.uploadService
      .giveAvailableResolutions(ratio)
      .filter(res => res !== this.originalResolution);
  }

  public onFileInputChange(event): void {
    this.uploadService.fileLoad(event);
  }

  public onSubmit(): void {
    this.uploadService.initConvertion(this.imageUploadForm);
  }

  public onUploadClick(): void {
    if (this.category !== DEFAULT_CATEGORY_VALUE) {
      this.uploadService.uploadToLibrary(this.tags, this.category);
    } else {
      this.mainService.notifyMessage('Please select category!!!');
    }
  }

  public addTag(): void {
    this.tags.push(this.tagsControl.value);
    this.tagsControl.reset();
  }

  public changeCategory(tag: string): void {
    this.imageUploadForm.get('category').patchValue(tag);
  }

  public resolutionChange(resolution: string): void {
    this.imageUploadForm.get('resolution').patchValue(resolution);
  }

  get fileSizeInKB(): string {
    return (this.uploadedFile.size / 1024).toPrecision(3);
  }

  get fileSizeInMB(): string {
    return (this.uploadedFile.size / (1024 * 1024)).toPrecision(2);
  }

  get convertedSizeInKB(): string {
    return (this.convertedFile.size / 1024).toPrecision(3);
  }

  get convertedSizeInMB(): string {
    return (this.convertedFile.size / (1024 * 1024)).toPrecision(2);
  }

  get uploadedFile(): any {
    return this.uploadService.uploadedFile;
  }

  get videoURL(): string | ArrayBuffer {
    return this.uploadService.videoURL;
  }

  get convertedFile(): Blob {
    return this.uploadService.convertedFile;
  }

  get convertedURL(): any {
    return this.uploadService.convertedURL;
  }

  get tagsControl(): FormControl {
    return this.imageUploadForm.get('tags') as FormControl;
  }

  get category(): string {
    return (this.imageUploadForm.get('category') as FormControl).value;
  }

  ngOnInit() {
    this.buildForm();
    this.converting$ = this.uploadService.converting$;
    this.loadedVideo$ = this.uploadService.loadedVideo$;
  }
}
