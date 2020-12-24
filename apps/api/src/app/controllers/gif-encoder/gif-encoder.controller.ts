import { Body, Controller, Header, HttpCode, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { GifEncoderService } from './gif-encoder-service/gif-encoder.service';
import { Readable } from 'stream';

@Controller('gif-encoder')
export class GifEncoderController {
  public constructor(private readonly encService: GifEncoderService) {}

  @Post()
  @HttpCode(200)
  @Header('Content-Type', 'image/gif')
  @UseInterceptors(FileInterceptor('file'))
  convertToGif(
    @UploadedFile()
    file: {
      buffer: ArrayBuffer;
      originalname: string;
      videoFps: number;
      videoResolution: string;
    },
    @Body('videoFps') fps: number,
    @Body('videoResolution') resolution: string,
    @Res()
    res
  ) {
    const result: Readable = this.encService.encodeGif({
      ...file,
      fps,
      resolution,
    });

    result.pipe(res, { end: true });
  }
}
