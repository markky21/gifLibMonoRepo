import { Injectable } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpService } from '../../../core/http/http.service';
import { MainService } from '../../../shared/services/main.service';
import { DEFAULT_FRAME_RATE, Res, VideoConverterOptions } from '../shared/video-converter-options.interfaces';
import { GIFObject } from '../../../core/types/gif-object.type';
import { DEFAULT_folder_VALUE } from '../upload-file.component';

const UPLOAD_MESSAGES = {
  sizeExceeded: 'File upload aborted due to exceeded file size! Limit is 15MB',
  wrongType: 'Wrong image type. We require video file!',
  loadOK: 'Whoa! File successfully loaded dude!',
};

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private _uploadedFile: File = null;
  private _videoURL: string | ArrayBuffer = null;
  private _convertedFile: Blob = null;
  private _convertedURL: URL = null;
  public converting$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loadedVideo$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get uploadedFile(): File {
    return this._uploadedFile;
  }

  set uploadedFile(newFile: File) {
    this._uploadedFile = newFile;
  }

  get videoURL(): string | ArrayBuffer {
    return this._videoURL;
  }

  set videoURL(newURL: string | ArrayBuffer) {
    this._videoURL = newURL;
  }

  get convertedFile(): Blob {
    return this._convertedFile;
  }

  set convertedFile(newFile: Blob) {
    this._convertedFile = newFile;
  }

  get convertedURL(): any {
    return this._convertedURL;
  }

  set convertedURL(newURL: any) {
    this._convertedURL = newURL;
  }

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private mainService: MainService,
    private sanitizer: DomSanitizer
  ) {}

  public getConvertingState(): Observable<boolean> {
    return this.converting$.asObservable();
  }

  public getLoadedVideoState(): Observable<boolean> {
    return this.loadedVideo$.asObservable();
  }

  public setLoadedVideoState(state: boolean): void {
    return this.loadedVideo$.next(state);
  }

  public buildUploadAndConvertForm(): FormGroup {
    return this.fb.group({
      imageInput: this.fb.control(null, [Validators.required]),
      resolution: this.fb.control(Res.Medium, Validators.required),
      conversionFrameRate: this.fb.control(DEFAULT_FRAME_RATE, Validators.required),
      tags: this.fb.control(''),
      folder: this.fb.control(DEFAULT_folder_VALUE),
    });
  }

  public fileLoad(event): void {
    const file: File = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onloadstart = (ev) => {
        const limit = 1024 * 1024 * 15;
        const size = ev.total;
        const sizeExceeded = size > limit;
        const wrongType = !file.type.includes('video');

        if (sizeExceeded || wrongType) {
          reader.abort();
          this.videoURL = null;
          this.uploadedFile = null;
          this.loadedVideo$.next(false);
          const message = sizeExceeded ? 'sizeExceeded' : 'wrongType';
          this.mainService.notifyMessage(UPLOAD_MESSAGES[message]);
          return;
        }
      };

      reader.onloadend = () => {
        this.videoURL = reader.result;
        this.uploadedFile = file;
        this.mainService.notifyMessage(UPLOAD_MESSAGES.loadOK);
      };

      reader.readAsDataURL(file);
    }
  }

  public giveAvailableResolutions(ratio: number): string[] {
    return Object.values(Res).map((res) => {
      const defaultRes = res.split('x');
      const defRes = {
        width: defaultRes[0],
        height: defaultRes[1],
      };

      const computedHeight: number = Math.floor(Number(defRes.width) / ratio);

      return `${defRes.width}x${computedHeight}`;
    });
  }

  public convertGifFromConverterToUrl(responseFile: Blob): void {
    const urlCreate: typeof URL = window.URL;
    this.convertedFile = responseFile;

    this.converting$.next(false);
    this.convertedURL = this.sanitizer.bypassSecurityTrustResourceUrl(urlCreate.createObjectURL(responseFile));
  }

  public uploadToLibrary(tags: string[], category: string): void {
    const fileData = {
      file: this.convertedFile,
      name: `${this.uploadedFile.name.split('.')[0]}.gif`,
    };

    forkJoin(
      this.httpService.giphyUpload(fileData, tags).pipe(
        switchMap((response) => this.httpService.upoloadedGiphyFileIdToGifObject(`${response.data.id}`)),
        map((response) => response.data),
        tap((result: GIFObject) => this.mainService.transferToLibrary(category, result))
      ),
      this.mainService.libraryUpdate.pipe(take(1))
    ).subscribe(
      () => {
        this.mainService.saveLibraryToFirebase();
      },
      (err) => this.mainService.notifyMessage(err.message, { duration: 10000 })
    );
  }

  public initConvertion(videoUploadForm: FormGroup): void {
    this.converting$.next(true);
    const { conversionFrameRate, resolution } = videoUploadForm.value;
    const options: VideoConverterOptions = {
      videoFps: conversionFrameRate,
      videoResolution: resolution,
    };

    let formData = new FormData();

    formData.append('file', this.uploadedFile);
    Object.keys(options).forEach((option) => formData.append(option, options[option]));

    this.httpService.apiConvertToGifObservable(formData).subscribe((gifImageBlob: Blob) => {
      this.convertGifFromConverterToUrl(gifImageBlob);
    });
  }
}
