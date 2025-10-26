"use client";

import { useEffect, useState } from "react";

export default function PWARegister() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(true);
  const [showIOSPrompt, setShowIOSPrompt] = useState(true);

  useEffect(() => {
    // Check if running on iOS
    const iOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Check if app is already installed
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    setIsStandalone(standalone);

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        })
        .then((registration) => {
          console.log("Service Worker registered successfully:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  // Only show install button if app is not already installed
  if (isStandalone) {
    return null;
  }

  return (
    <>
      {isInstallable && showInstallPrompt && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-[#E95420] text-white p-4 rounded-lg shadow-lg max-w-sm relative">
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="absolute top-2 right-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <img
                src="/ubuntu-logo-circle.png"
                alt="Install"
                className="w-12 h-12"
              />
              <div className="flex-1 pr-4">
                <h3 className="font-semibold text-sm">
                  Install Ubuntu Portfolio
                </h3>
                <p className="text-xs opacity-90">
                  Get quick access from your home screen
                </p>
              </div>
              <button
                onClick={handleInstallClick}
                className="bg-white text-[#E95420] px-4 py-2 rounded font-medium text-sm hover:bg-gray-100 transition-colors"
              >
                Install
              </button>
            </div>
          </div>
        </div>
      )}

      {isIOS && !isStandalone && showIOSPrompt && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-[#E95420] text-white p-4 rounded-lg shadow-lg max-w-sm relative">
            <button
              onClick={() => setShowIOSPrompt(false)}
              className="absolute top-2 right-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h3 className="font-semibold text-sm mb-2 pr-4">
              Install Ubuntu Portfolio
            </h3>
            <p className="text-xs opacity-90">
              To install this app on your iOS device, tap the share button{" "}
              <span
                role="img"
                aria-label="share icon"
                className="inline-block text-base"
              >
                ⎋
              </span>{" "}
              and then "Add to Home Screen"{" "}
              <span
                role="img"
                aria-label="plus icon"
                className="inline-block text-base"
              >
                ➕
              </span>
              .
            </p>
          </div>
        </div>
      )}
    </>
  );
}
