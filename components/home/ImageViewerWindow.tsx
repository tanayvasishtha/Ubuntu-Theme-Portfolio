"use client";

import { useState } from "react";

const ImageViewerWindow = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/assets/wallpapers/clouds.jpg",
    "/assets/wallpapers/valley.jpg",
    "/assets/wallpapers/south-france.jpg",
    "/assets/wallpapers/mountain.png",
    "/assets/wallpapers/numbat-dark.png",
    "/assets/wallpapers/numbat-light.png",
    "/assets/wallpapers/numbat.png",
    "/assets/wallpapers/crown-dark.png",
    "/assets/wallpapers/crown-light.png",
    "/assets/wallpapers/crown-dark-2.png",
    "/assets/wallpapers/crown-light-2.png",
    "/assets/wallpapers/lightbulb.png",
  ];

  return (
    <div className="w-full h-full bg-gray-900 p-4">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg font-semibold">Image Viewer</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentImage(Math.max(0, currentImage - 1))}
              className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              ←
            </button>
            <span className="text-white text-sm px-2 py-1">
              {currentImage + 1} / {images.length}
            </span>
            <button
              onClick={() =>
                setCurrentImage(Math.min(images.length - 1, currentImage + 1))
              }
              className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              →
            </button>
          </div>
        </div>
        <div className="flex-1 bg-black rounded-lg overflow-hidden">
          <img
            src={images[currentImage]}
            alt={`Image ${currentImage + 1}`}
            className="w-full h-full object-contain"
          />
        </div>
        {/* Thumbnail strip */}
        <div className="mt-4 flex space-x-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                index === currentImage ? "border-orange-500" : "border-gray-600"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageViewerWindow;
