export type ImageSizeEnum =
  | "square_hd"
  | "square"
  | "portrait_4_3"
  | "portrait_16_9"
  | "landscape_4_3"
  | "landscape_16_9";
export type ImageSize =
  | {
      width: number;
      height: number;
    }
  | ImageSizeEnum;
export interface LoraWeight {
  path: string;
  scale?: number;
}
export type OutputFormatEnum = "jpeg" | "png";

export interface Input {
  prompt: string;
  image_size?: ImageSize;
  num_inference_steps?: number;
  seed?: number;
  loras?: LoraWeight[];
  guidance_scale?: number;
  sync_mode?: boolean;
  num_images?: number;
  enable_safety_checker?: boolean;
  output_format?: OutputFormatEnum;
}
export interface Image {
  url: string;
  width: number;
  height: number;
  content_type?: string;
}
export interface Timings {
  inference: number;
}
export interface Output {
  images: Image[];
  timings: Timings;
  seed: number;
  has_nsfw_concepts: boolean[];
  prompt: string;
}
