import { GIFObject } from '../../../core/types/gif-object.type';

export interface LibraryType {
  [key: string]: {
    allImages: GIFObject[];
    searchDate: Date;
  };
}
