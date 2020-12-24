import { Test, TestingModule } from '@nestjs/testing';
import { GifEncoderService } from './gif-encoder.service';

describe('GifEncoderServiceService', () => {
  let service: GifEncoderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GifEncoderService],
    }).compile();

    service = module.get<GifEncoderService>(GifEncoderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
