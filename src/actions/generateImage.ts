"use server";

import * as fal from "@fal-ai/serverless-client";
import { Input, Output } from "../types";

const opts: Partial<Input> = {
  num_images: 4,
  output_format: "png",
  image_size: "square",
  loras: [
    {
      path: process.env.LORA_PATH as string,
      scale: 1,
    },
  ],
};

export async function generateImage(
  prompt: string,
  {
    textColor = "black",
    icon = false,
  }: {
    textColor?: string;
    icon?: boolean;
  },
) {
  const result = await fal.subscribe<Input, Output>("fal-ai/flux-lora", {
    input: {
      prompt: `word logo, white background, ${textColor} text, ${icon ? "with icon" : "no icon"}, "${prompt}"`,
      ...opts,
    },
    logs: false,
  });

  return result;
}
