import { Injectable } from '@nestjs/common';
import { Duplex, Readable, Writable } from 'stream';
import * as ffmpeg from 'fluent-ffmpeg';

@Injectable()
export class GifEncoderService {
  encodeGif(video: { buffer: ArrayBuffer; originalname: string; fps: number; resolution: string }) {
    const stream = new Duplex();
    const { fps, resolution } = video;

    stream.push(video.buffer);
    stream.push(null);
    stream.end();

    const ff = new ffmpeg(stream);
    ff.size(resolution)
      .fps(fps)
      .format('gif')
      .on('start', () => console.log('started converting....'))
      // .on('progress', progress => console.log('Ready: ' + progress.percent + '%'))
      .on('end', () => console.log('finished converting ' + video.originalname));

    return ff;
  }
}
