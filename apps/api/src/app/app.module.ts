import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GifEncoderController } from './controllers/gif-encoder/gif-encoder.controller';
import { GifEncoderService } from './controllers/gif-encoder/gif-encoder-service/gif-encoder.service';

@Module({
  imports: [],
  controllers: [AppController, GifEncoderController],
  providers: [AppService, GifEncoderService],
})
export class AppModule {
  // implements NestModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(MyMiddleware).forRoutes(GifEncoderController);
  // }
}
