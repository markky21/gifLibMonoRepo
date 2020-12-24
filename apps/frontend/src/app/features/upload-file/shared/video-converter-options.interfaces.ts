export enum Res {
  Minimal = '240x160',
  Low = '320x240',
  Medium = '480x320',
  High = '640x480',
}

export type VideoResolutions = Res.Minimal | Res.Low | Res.Medium | Res.High;
export const TRIM_FORMAT = /^(\d{2})\:\d{2}\:\d{2}\b/;
export const FRAME_RATES = {
  3: 3,
  5: 5,
  10: 10,
  15: 15,
  25: 25,
};

export const DEFAULT_FRAME_RATE = FRAME_RATES[10];

export interface VideoConverterOptions {
  trimFrom?: string;
  trimTo?: string;
  videoCodec?: 'GIF';
  videoFps?: string;
  videoResolution: VideoResolutions;
}
