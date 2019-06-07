import { Injectable } from '@nestjs/common';
import * as GIFencoder from 'gifencoder';
import * as fs from 'fs';

@Injectable()
export class GifEncoderService {
    encodeGif(video) {
        const encoder = new GIFencoder(video.width, video.height);

        fs.createWriteStream('convertedGif.gif');
    }
}
