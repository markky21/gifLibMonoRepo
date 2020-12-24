import { VideoConverterOptions } from './video-converter-options.interfaces';

export interface ConversionFileData {
  filename: string;
  file: string;
  converteroptions: VideoConverterOptions;
  tags?: string[];
}
