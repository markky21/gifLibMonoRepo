import { Body, Controller, Header, HttpCode, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { GifEncoderService } from './gif-encoder-service/gif-encoder.service';
import { createReadStream, createWriteStream } from 'fs';
import { Observable, of } from 'rxjs';
import { Readable, Transform, Writable } from 'stream';
//
// const Observable = function(subscriber) {
//   this.subscribe = subscriber;
// };
//
// const Subscription = function(unsubscribe) {
//   this.unsubscribe = unsubscribe;
// };
//
// Observable.fromReadable = function(readable) {
//   return new Observable(function(observer) {
//     function nop() {}
//
//     var nextFn = observer.next ? observer.next.bind(observer) : nop;
//     var returnFn = observer.return ? observer.return.bind(observer) : nop;
//     var throwFn = observer.throw ? observer.throw.bind(observer) : nop;
//
//     readable.on('data', nextFn);
//     readable.on('end', returnFn);
//     readable.on('error', throwFn);
//
//     return new Subscription(function() {
//       readable.removeListener('data', nextFn);
//       readable.removeListener('end', returnFn);
//       readable.removeListener('error', throwFn);
//     });
//   });
// };
//
// const Observer = function(handlers) {
//   function nop() {}
//
//   this.next = handlers.next || nop;
//   this.return = handlers.return || nop;
//   this.throw = handlers.throw || nop;
// };
//
// Observer.fromWritable = function(writable, shouldEnd, throwFn) {
//   return new Observer({
//     next: writable.write.bind(writable),
//     return: shouldEnd ? writable.end.bind(writable) : function() {},
//     throw: throwFn
//   });
// };

@Controller('gif-encoder')
export class GifEncoderController {
  public constructor(private readonly encService: GifEncoderService) {}

  @Post()
  @HttpCode(200)
  // @Header('Content-Type', 'binary/octet-stream')
  @UseInterceptors(FileInterceptor('file'))
  convertToGif(
    @UploadedFile()
    file: {
      buffer: ArrayBuffer;
      originalname: string;
      video_bitrate: number;
      video_fps: string;
      video_resolution: string;
    },
    @Res() res
  ) {
    const result = this.encService.encodeGif(file);
    const newWritable = new Transform({
      transform(chunk: Buffer, encoding, callback) {
        this.push('$');
        console.log(encoding);
        callback();
      }
    });

    const newWritable2 = new Transform({
      transform(chunk: Buffer, encoding, callback) {
        console.log(encoding);
        callback();
      }
    });

    result
      .pipe(newWritable)
      .pipe(newWritable2)
      .pipe(
        res,
        { end: true }
      );
  }
}
