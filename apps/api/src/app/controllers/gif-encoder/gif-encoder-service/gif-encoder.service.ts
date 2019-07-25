import { Injectable } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { Duplex } from "stream";
import * as ffmpeg from 'fluent-ffmpeg';

@Injectable()
export class GifEncoderService {
  public encodeGif(video: File): Observable<any> {
    const stream = new Duplex();

    const ff = new ffmpeg();

    ff.size('640x480')
      .format('gif')
      .on('start', () => console.log('started converting....'))
      .on('error', function(err, stdout, stderr) {
        console.log('An error occurred: ' + err.message, err, stderr);
      })
      .on('progress', (progress) => {
        console.log(progress.percent + '%');
      })
      .on('end', () => console.log('finished ffmpeg'))
      .save('ffmpegedit.gif');

    return of(video);
  }
}
