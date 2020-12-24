import { Test, TestingModule } from '@nestjs/testing';
import { GifEncoderController } from './gif-encoder.controller';

describe('GifEncoder Controller', () => {
  let controller: GifEncoderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GifEncoderController],
    }).compile();

    controller = module.get<GifEncoderController>(GifEncoderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
