import { DownloadIcon } from "lucide-react";
import React, { useRef } from "react";

export function SaveableImage({
  prompt,
  imageUrl,
  size,
  transparent,
}: {
  prompt?: string;
  imageUrl: string;
  size: number;
  transparent: boolean;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (imgRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Disable image smoothing (anti-aliasing)
        ctx.imageSmoothingEnabled = false;

        // Draw the image
        const img = new Image();
        img.src = imageUrl;
        img.crossOrigin = "anonymous";
        img.onload = () => {
          ctx.drawImage(img, 0, 0, size, size);

          if (transparent) {
            const imageData = ctx.getImageData(0, 0, size, size);
            const data = imageData.data;
            const threshold = 150;
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              if (
                r &&
                g &&
                b &&
                r > threshold &&
                g > threshold &&
                b > threshold
              ) {
                const alpha = Math.max(
                  0,
                  255 - (r + g + b - 3 * threshold) * 3,
                );
                data[i + 3] = alpha;
              }
            }
            ctx.putImageData(imageData, 0, 0);
          }

          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.download = `wordlogo-${prompt}.png`;
              link.href = url;
              link.click();
              URL.revokeObjectURL(url);
            }
          }, "image/png");
        };
      }
    }
  };

  return (
    <div>
      <div ref={containerRef} className="relative inline-block">
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        >
          <img
            ref={imgRef}
            src={imageUrl}
            alt="Generated Image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            className="border-2 border-indigo-500/10"
          />
        </div>
        <button
          onClick={handleDownload}
          className="absolute bottom-0 left-0 hover:scale-110"
        >
          <DownloadIcon size={32} className="text-indigo-500" />
        </button>
      </div>
    </div>
  );
}
