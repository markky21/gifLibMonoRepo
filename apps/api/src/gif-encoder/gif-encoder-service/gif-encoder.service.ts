import { Injectable } from '@nestjs/common';
import * as GIFencoder from 'gifencoder';
import { createReadStream, createWriteStream } from 'fs';
import { Observable, of } from 'rxjs';
import * as streams from 'stream';
import * as ffmpeg from 'fluent-ffmpeg';

@Injectable()
export class GifEncoderService {
  encodeGif(video: string): Observable<any> {
    const encoder = new GIFencoder(240, 160);
    const command = new ffmpeg();

    console.log(command);
    const stream = new streams.PassThrough();
    stream.end(video);

    return of(video);
  }
}
