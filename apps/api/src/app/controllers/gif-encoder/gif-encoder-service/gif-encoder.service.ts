import { Injectable } from '@nestjs/common';
import { Duplex, Readable, Writable } from 'stream';
import * as ffmpeg from 'fluent-ffmpeg';

@Injectable()
export class GifEncoderService {
  encodeGif(video: {
    buffer: ArrayBuffer;
    originalname: string;
    video_bitrate: number;
    video_fps: string;
    video_resolution: string;
  }) {
    const stream = new Duplex();
    const {} = video;

    stream.push(video.buffer);
    stream.push(null);
    stream.end();

    const ff = new ffmpeg(stream);
    ff.size('120x80')
      // .fps(parseInt(video.video_fps.split('fps')[0], 10))
      // .videoBitrate(video.video_bitrate)
      .format('gif')
      .on('start', () => console.log('started converting....'))
      // .on('progress', progress => console.log('Ready: ' + progress.percent + '%'))
      .on('end', () => console.log('finished converting ' + video.originalname));

    return ff;
  }
}
