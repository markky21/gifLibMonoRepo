import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { GifEncoderService } from './gif-encoder-service/gif-encoder.service';
import { Observable } from 'rxjs';

@Controller('gif-encoder')
export class GifEncoderController {
  public constructor(private readonly encService: GifEncoderService) {}

  @Post()
  create(@Body('file') video: string): Observable<any> {
    return this.encService.encodeGif(video);
  }
}
