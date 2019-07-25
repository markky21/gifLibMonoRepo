import { Injectable } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { Duplex } from "stream";
import * as ffmpeg from 'fluent-ffmpeg';

@Injectable()
export class GifEncoderService {
  public encodeGif(video: File): Observable<any> {
    const stream = new Duplex();
    stream.push(video.buffer);
    stream.push(null);

    const ff = new ffmpeg(stream);

    ff.size('260x120')
      .format('gif')
      .on('start', () => console.log('started converting....'))
      .on('end', () => console.log('finished converting ' + video.originalname))
      .output(stream);

    return of(stream);
  }
}
