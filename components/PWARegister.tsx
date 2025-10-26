"use client";

import { useEffect, useState } from "react";

export default function PWARegister() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

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
      {isInstallable && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-[#E95420] text-white p-4 rounded-lg shadow-lg max-w-sm">
            <div className="flex items-center gap-3">
              <img
                src="/ubuntu-logo-circle.png"
                alt="Install"
                className="w-12 h-12"
              />
              <div className="flex-1">
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

      {isIOS && !isStandalone && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-[#E95420] text-white p-4 rounded-lg shadow-lg max-w-sm">
            <h3 className="font-semibold text-sm mb-2">
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
