"use client";

import { useEffect, useState } from "react";

export default function RotatingLogo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setImages(Array.from({ length: 11 }, (_, i) => `/logos/${i}.png`));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setNextIndex((prevIndex) => (prevIndex + 2) % images.length);
    }, 400);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div style={{ position: 'relative', width: '225px', height: '225px' }}>
      <img
        src={images[currentIndex]}
        alt="logo"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
      <img
        src={images[nextIndex]}
        alt="Next logo"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          opacity: 0,
        }}
      />
    </div>
  );
}
