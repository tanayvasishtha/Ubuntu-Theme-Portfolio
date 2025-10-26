"use client";
import React from "react";

type IconProps = {
  className?: string;
};

export const Terminal = ({ className = "" }: IconProps) => (
  <div className="w-8 h-8 flex items-center justify-center">
    <img
      src="/assets/program-icons/terminal-app.png"
      alt="Terminal"
      className={"w-8 h-8 drop-shadow-lg " + className}
    />
  </div>
);

export const Projects = ({ className = "" }: IconProps) => (
  <div className="w-10 h-10 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className={"w-8 h-8 drop-shadow-lg " + className}>
      <path
        fill="#E95420"
        d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"
      />
      <path fill="#FFFFFF" d="M12 8v8l4-4-4-4z" />
    </svg>
  </div>
);

export const Commands = ({ className = "" }: IconProps) => (
  <div className="w-10 h-10 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className={"w-8 h-8 drop-shadow-lg " + className}>
      <path
        fill="#7C3AED"
        d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
      />
      <path fill="#FFFFFF" d="M8 12h8v2H8v-2zm0 4h8v2H8v-2zm0-8h5v5H8V8z" />
    </svg>
  </div>
);

export const About = ({ className = "" }: IconProps) => (
  <div className="w-10 h-10 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className={"w-8 h-8 drop-shadow-lg " + className}>
      <circle fill="#16A34A" cx="12" cy="12" r="10" />
      <circle fill="#FFFFFF" cx="12" cy="8" r="2" />
      <path
        fill="#FFFFFF"
        d="M12 12c-2.5 0-4.5 2-4.5 4.5h9c0-2.5-2-4.5-4.5-4.5z"
      />
    </svg>
  </div>
);

export const Skills = ({ className = "" }: IconProps) => (
  <div className="w-10 h-10 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className={"w-8 h-8 drop-shadow-lg " + className}>
      <path
        fill="#DC2626"
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      />
      <path
        fill="#FFFFFF"
        d="M12 6l1.5 3L17 10l-2.5 2.5L15 17l-3-1.5L9 17l.5-4.5L7 10l3.5-1L12 6z"
      />
    </svg>
  </div>
);

export const Contact = ({ className = "" }: IconProps) => (
  <div className="w-10 h-10 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className={"w-8 h-8 drop-shadow-lg " + className}>
      <path
        fill="#0891B2"
        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
      />
      <path fill="#FFFFFF" d="M12 11l8-5H4l8 5z" />
    </svg>
  </div>
);

export const Gallery = ({ className = "" }: IconProps) => (
  <div className="w-10 h-10 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className={"w-8 h-8 drop-shadow-lg " + className}>
      <path
        fill="#9333EA"
        d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
      />
      <circle fill="#FFFFFF" cx="8.5" cy="8.5" r="1.5" />
    </svg>
  </div>
);

export const Settings = ({ className = "" }: IconProps) => (
  <div className="w-10 h-10 flex items-center justify-center">
    <img
      src="/assets/program-icons/system-settings.png"
      alt="Settings"
      className={"w-8 h-8 drop-shadow-lg " + className}
    />
  </div>
);

export const Home = ({ className = "" }: IconProps) => (
  <div className="w-8 h-8 flex items-center justify-center">
    <svg
      viewBox="0 0 24 24"
      className={"w-8 h-8 text-white drop-shadow-lg " + className}
    >
      <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  </div>
);

export const Chrome = ({ className = "" }: IconProps) => (
  <div className="w-8 h-8 flex items-center justify-center">
    <img
      src="/assets/program-icons/Google_Chrome_icon.png"
      alt="Google Chrome"
      className={"w-8 h-8 drop-shadow-lg " + className}
    />
  </div>
);

export const Help = ({ className = "" }: IconProps) => (
  <div className="w-6 h-6 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className={"w-6 h-6 text-blue-400 " + className}>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
      />
    </svg>
  </div>
);

export const Files = ({ className = "" }: IconProps) => (
  <div className="w-8 h-8 flex items-center justify-center">
    <img
      src="/assets/system-icons/filemanager-app.png"
      alt="File Manager"
      className={"w-8 h-8 drop-shadow-lg " + className}
    />
  </div>
);

export const Calculator = ({ className = "" }: IconProps) => (
  <div className="w-8 h-8 flex items-center justify-center">
    <img
      src="/assets/program-icons/calculator-app.png"
      alt="Calculator"
      className={"w-8 h-8 drop-shadow-lg " + className}
    />
  </div>
);

export const Music = ({ className = "" }: IconProps) => (
  <div className="w-8 h-8 flex items-center justify-center">
    <img
      src="/assets/program-icons/spotify-client.png"
      alt="Music Player"
      className={"w-8 h-8 drop-shadow-lg " + className}
    />
  </div>
);

export const ImageViewer = ({ className = "" }: IconProps) => (
  <div className="w-8 h-8 flex items-center justify-center">
    <img
      src="/assets/program-icons/image-viewer-app.png"
      alt="Image Viewer"
      className={"w-8 h-8 drop-shadow-lg " + className}
    />
  </div>
);

const Icons = {
  Terminal,
  Projects,
  Commands,
  About,
  Skills,
  Contact,
  Gallery,
  Settings,
  Home,
  Chrome,
  Help,
  Files,
  Calculator,
  Music,
  ImageViewer,
};

export default Icons;
