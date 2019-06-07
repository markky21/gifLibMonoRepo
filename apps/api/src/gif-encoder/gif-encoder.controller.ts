import { Body, Controller, Post } from '@nestjs/common';

import { GifEncoderService } from './gif-encoder-service/gif-encoder.service';

@Controller('gif-encoder')
export class GifEncoderController {
    constructor(private encService: GifEncoderService) {}

    @Post()
    create(@Body() video: any) {
        return this.encService.encodeGif(video);
    }
}
