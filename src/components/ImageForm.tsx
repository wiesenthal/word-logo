"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Loader2Icon,
  SparklesIcon,
  SettingsIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { generateImage } from "~/actions/generateImage";
import { SaveableImage } from "~/components/SaveableImage";

export default function ImageForm() {
  const [prompt, setPrompt] = useState<string>();
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [size, setSize] = useState<number>(192);
  const [transparent, setTransparent] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState(false);
  const [textColor, setTextColor] = useState("black");
  const [withIcon, setWithIcon] = useState(false);

  const handleGenerateImage = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setImages([]);
    const result = await generateImage(prompt, {
      textColor,
      icon: withIcon,
    });
    setLoading(false);
    console.log(result);
    if (result?.images && result.images.length > 0) {
      setImages(result.images.map((img) => img.url).filter(Boolean));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setSize(Math.max(MIN_SIZE, size - STEP_SIZE));
      } else if (e.key === "ArrowRight") {
        setSize(Math.min(MAX_SIZE, size + STEP_SIZE));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [size]);

  return (
    <>
      <form
        className="flex w-full flex-row items-center justify-center gap-4 md:max-w-lg"
        onSubmit={handleGenerateImage}
      >
        <div className="relative w-full">
          <input
            className="w-full rounded-none bg-gray-100 p-2 pr-10 text-gray-800"
            type="text"
            placeholder="Enter a name to logo..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:hover:text-gray-500"
            disabled={isLoading}
            onClick={() => setShowSettings(true)}
          >
            <SettingsIcon size={20} />
          </button>
        </div>
        <button
          className="flex size-12 min-h-12 min-w-12 flex-col items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-600 text-white shadow-xl hover:from-blue-500 hover:to-purple-500 hover:shadow-none disabled:from-blue-500 disabled:to-purple-500 disabled:opacity-50 disabled:shadow-none"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <SparklesIcon />
          )}
        </button>
      </form>
      <div className="grid grid-cols-2 gap-4">
        {images.map((imageUrl, index) => (
          <div key={index} className="flex items-center justify-center">
            <SaveableImage
              prompt={prompt}
              imageUrl={imageUrl}
              size={size}
              transparent={true}
            />
          </div>
        ))}
      </div>
      {images.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSize(Math.max(MIN_SIZE, size - STEP_SIZE))}
              disabled={size <= MIN_SIZE}
              className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              <ArrowLeftIcon size={16} />
            </button>
            <p className="flex font-semibold">
              {size} x {size}
            </p>
            <button
              onClick={() => setSize(Math.min(MAX_SIZE, size + STEP_SIZE))}
              disabled={size >= MAX_SIZE}
              className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              <ArrowRightIcon size={16} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="transparent"
              type="checkbox"
              checked={transparent}
              onChange={() => setTransparent(!transparent)}
            />
            <label htmlFor="transparent" className="text-sm">
              Save transparent
            </label>
          </div>
        </div>
      )}
      {showSettings && (
        <div
          className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-xl font-bold text-gray-800">
              Settings
            </h2>
            <select
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full rounded-full border p-2"
            >
              {["black", "blue", "green", "red", "violet", "orange"].map(
                (color) => (
                  <option key={color} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </option>
                ),
              )}
            </select>
            <div className="flex items-center">
              <input
                id="withIcon"
                type="checkbox"
                checked={withIcon}
                onChange={() => setWithIcon(!withIcon)}
                className="mr-2"
              />
              <label htmlFor="withIcon">Generate with icon</label>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className="w-full rounded-full bg-indigo-600 px-4 py-2 font-semibold text-white shadow-md hover:bg-indigo-700 hover:font-bold hover:shadow-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const MIN_SIZE = 64;
const MAX_SIZE = 512;
const STEP_SIZE = 16;
