export enum Res {
  Minimal = '240x160',
  Low = '320x240',
  Medium = '480x320',
  High =  '640x480'
}

export type VideoBitrateOptions = 1000 | 3000 | 5000;
export type VideoResolutions = Res.Minimal | Res.Low | Res.Medium | Res.High;
export const TRIM_FORMAT = /^(\d{2})\:\d{2}\:\d{2}\b/;
export const FRAME_RATES = {
  10: '10fps',
  15: '15fps',
  25: '25fps',
  30: '30fps',
  60: '60fps'
};

export interface VideoConverterOptions {
  trim_from?: string;
  trim_to?: string;
  video_bitrate: VideoBitrateOptions;
  video_codec?: 'GIF';
  video_fps?: string;
  video_resolution: VideoResolutions;
  // video_transpose: null;
}
