export interface GIFObject {
  analytics: object;
  bitly_gif_url: string;
  bitly_url: string;
  content_url: string;
  embed_url: string;
  id: string;
  images: {
    ['480w_still']: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    downsized: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    downsized_large: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    downsized_medium: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    downsized_small: {
      width: string;
      height: string;
      mp4: string;
      mp4_size: string;
    };
    downsized_still: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    fixed_height: {
      url: string;
      width: string;
      height: string;
      size: string;
      mp4: string;
      mp4_size: string;
      webp: string;
      webp_size: string;
    };
    fixed_height_downsampled: {
      url: string;
      width: string;
      height: string;
      size: string;
      webp: string;
      mp4: string;
      mp4_size: string;
      webp_size: string;
    };
    fixed_height_small: {
      height: string;
      mp4: string;
      mp4_size: string;
      size: string;
      url: string;
      webp: string;
      webp_size: string;
      width: string;
    };
    fixed_height_small_still: {
      url: string;
      width: string;
      height: string;
      size: string;
      mp4: string;
      mp4_size: string;
      webp: string;
      webp_size: string;
    };
    fixed_height_still: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    fixed_width: {
      url: string;
      width: string;
      height: string;
      size: string;
      mp4: string;
      mp4_size: string;
      webp: string;
      webp_size: string;
    };
    fixed_width_downsampled: {
      url: string;
      width: string;
      height: string;
      size: string;
      mp4: string;
      mp4_size: string;
      webp: string;
      webp_size: string;
    };
    fixed_width_small: {
      url: string;
      width: string;
      height: string;
      size: string;
      mp4: string;
      mp4_size: string;
      webp: string;
      webp_size: string;
    };
    fixed_width_small_still: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    fixed_width_still: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    looping: {
      mp4: string;
      mp4_size: string;
    };
    original: {
      frames: string;
      hash: string;
      height: string;
      mp4: string;
      mp4_size: string;
      size: string;
      url: string;
      webp: string;
      webp_size: string;
      width: string;
    };
    original_mp4: {
      width: string;
      height: string;
      mp4: string;
      mp4_size: string;
    };
    original_still: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    preview: {
      width: string;
      height: string;
      mp4: string;
      mp4_size: string;
    };
    preview_gif: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    preview_webp: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
  };
  import_datetime: string;
  is_sticker: number;
  rating: string;
  slug: string;
  source: string;
  source_post_url: string;
  source_tld: string;
  title: string;
  trending_datetime: string;
  type: string;
  url: string;
  user: {
    avatar_url: string;
    banner_image: string;
    banner_url: string;
    display_name: string;
    is_verified: boolean;
    profile_url: string;
    username: string;
  };
  username: string;
  _score: number;
}
