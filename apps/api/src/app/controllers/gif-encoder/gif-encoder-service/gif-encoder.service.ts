import { Injectable } from '@nestjs/common';
import { Duplex, Readable, Writable } from 'stream';
import * as ffmpeg from 'fluent-ffmpeg';

@Injectable()
export class GifEncoderService {
  encodeGif(video: { buffer: ArrayBuffer; originalname: string }) {
    const stream = new Duplex();
    const writeStream = new Writable({
      write() {}
    });

    stream.push(video.buffer);
    stream.push(null);
    stream.end();

    const ff = new ffmpeg(stream);
    ff.size('260x120')
      .format('gif')
      .on('start', () => console.log('started converting....'))
      .on('end', () => console.log('finished converting ' + video.originalname));

    return ff;
  }
}
