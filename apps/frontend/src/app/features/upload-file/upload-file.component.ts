import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MainService } from '../../shared/services/main.service';
import { FRAME_RATES } from './shared/video-converter-options.interfaces';
import { UploadFileService } from './services/upload-file.service';
import { Observable } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { distinctUntilChanged, filter, skip, tap } from 'rxjs/operators';

export const DEFAULT_folder_VALUE = 'Click one of the tags or available folders to set it as target library folder';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  @ViewChild('uploadStepper') private myStepper: MatStepper;

  public imageUploadForm: FormGroup;
  public frameRates = Object.values(FRAME_RATES);
  public resolutions: string[] = [];
  public loadedVideo$;
  public converting$: Observable<boolean>;
  public tags: string[] = [];
  public originalResolution: string;
  public convertResolution: string;
  public availableFolders: string[] = [];

  constructor(private mainService: MainService, private uploadService: UploadFileService) {}

  get convertRes(): string {
    return this.imageUploadForm.get('resolution').value;
  }

  public buildForm(): void {
    this.imageUploadForm = this.uploadService.buildUploadAndConvertForm();
    this.convertResolution = this.convertRes;
  }

  public videoLoaded(w: number, h: number, event): void {
    const ratio = w / h;

    this.originalResolution = `${w}x${h}`;
    this.uploadService.setLoadedVideoState(true);
    this.resolutions = this.uploadService
      .giveAvailableResolutions(ratio)
      .filter((res) => res !== this.originalResolution);
  }

  public onFileInputChange(event): void {
    this.uploadService.fileLoad(event);
  }

  public onSubmit(): void {
    this.uploadService.initConvertion(this.imageUploadForm);
  }

  public onUploadClick(): void {
    if (this.folderIsSet) {
      this.uploadService.uploadToLibrary(this.tags, this.folder);
    } else {
      this.mainService.notifyMessage('Please select folder!!!');
    }
  }

  public addTag(): void {
    this.tags.push(this.tagsControl.value);
    this.tagsControl.reset();
  }

  public changeFolder(tag: string): void {
    this.imageUploadForm.get('folder').patchValue(tag);
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

  get fileSize(): string {
    return parseInt(this.fileSizeInMB) < 1
      ? ` ${this.fileSizeInKB} KB (${this.fileSizeInMB} MB)`
      : ` ${this.fileSizeInMB} MB`;
  }

  get convertedSizeInKB(): string {
    return (this.convertedFile.size / 1024).toPrecision(3);
  }

  get convertedSizeInMB(): string {
    return (this.convertedFile.size / (1024 * 1024)).toPrecision(2);
  }

  get convertedFileSize(): string {
    return parseInt(this.convertedSizeInMB) < 1
      ? ` ${this.convertedSizeInKB} KB (${this.convertedSizeInMB} MB)`
      : ` ${this.convertedSizeInMB} MB`;
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

  set convertedUrl(value: any) {
    this.uploadService.convertedURL = null;
  }

  get tagsControl(): FormControl {
    return this.imageUploadForm.get('tags') as FormControl;
  }

  get folder(): string {
    return (this.imageUploadForm.get('folder') as FormControl).value;
  }

  get folderIsSet(): boolean {
    return this.folder !== DEFAULT_folder_VALUE;
  }

  ngOnInit() {
    this.buildForm();
    this.converting$ = this.uploadService.getConvertingState();
    this.loadedVideo$ = this.uploadService.getLoadedVideoState();

    this.converting$
      .pipe(
        skip(1),
        distinctUntilChanged(),
        filter((val) => !val)
      )
      .subscribe((val) => {
        this.availableFolders = Object.keys(this.mainService.getLibrary());
        this.myStepper.next();
      });
  }
}
