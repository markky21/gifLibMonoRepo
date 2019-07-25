import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GifEncoderController } from '../gif-encoder/gif-encoder.controller';
import { GifEncoderService } from '../gif-encoder/gif-encoder-service/gif-encoder.service';
import { MyMiddleware } from './middleware/my-middleware.service';

@Module({
  imports: [],
  controllers: [AppController, GifEncoderController],
  providers: [AppService, GifEncoderService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyMiddleware).forRoutes(GifEncoderController);
  }
}
