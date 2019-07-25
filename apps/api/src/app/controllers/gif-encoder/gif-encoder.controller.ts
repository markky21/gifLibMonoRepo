import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { GifEncoderService } from './gif-encoder-service/gif-encoder.service';
import { Observable } from 'rxjs';

@Controller('gif-encoder')
export class GifEncoderController {
  public constructor(private readonly encService: GifEncoderService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file): Observable<any> {
    return this.encService.encodeGif(file);
  }
}
