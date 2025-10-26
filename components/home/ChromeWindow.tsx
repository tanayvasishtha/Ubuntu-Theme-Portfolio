"use client";

import { useState } from "react";

const ChromeWindow = () => {
  const [currentUrl, setCurrentUrl] = useState("https://www.google.com");
  const [urlInput, setUrlInput] = useState("https://www.google.com");
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let targetUrl = urlInput;
    if (
      !urlInput.startsWith("http://") &&
      !urlInput.startsWith("https://") &&
      !urlInput.includes(".")
    ) {
      targetUrl = `https://www.google.com/search?q=${encodeURIComponent(
        urlInput
      )}`;
    } else if (
      !urlInput.startsWith("http://") &&
      !urlInput.startsWith("https://")
    ) {
      targetUrl = `https://${urlInput}`;
    }

    setCurrentUrl(targetUrl);
    setUrlInput(targetUrl);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Chrome Toolbar */}
      <div className="bg-gray-100 border-b border-gray-300 px-3 py-2">
        <form
          onSubmit={handleUrlSubmit}
          className="flex items-center space-x-2"
        >
          <div className="flex space-x-1">
            <button
              type="button"
              className="p-2 hover:bg-gray-200 rounded-full text-gray-600"
              title="Back"
            >
              ←
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-200 rounded-full text-gray-600"
              title="Forward"
            >
              →
            </button>
            <button
              type="button"
              onClick={() => setIsLoading(true)}
              className="p-2 hover:bg-gray-200 rounded-full text-gray-600"
              title="Refresh"
            >
              ⟳
            </button>
          </div>

          {/* URL Bar */}
          <div className="flex-1 flex items-center bg-white border border-gray-300 rounded-full px-4 py-2">
            <div className="w-4 h-4 mr-3">
              {currentUrl.includes("https") ? (
                <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs">🔒</span>
                </div>
              ) : (
                <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
              )}
            </div>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 text-sm outline-none text-gray-800"
              placeholder="Search Google or type a URL"
            />
          </div>
        </form>
      </div>

      {/* Browser Content */}
      <div className="flex-1 bg-white overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        ) : (
          <div className="h-full w-full">
            {currentUrl.includes("google.com") ? (
              <iframe
                src="https://www.google.com/webhp?igu=1"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Google Search"
              />
            ) : (
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-400 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl">🌐</span>
                </div>
                <h1 className="text-2xl font-bold mb-4">New Tab</h1>
                <p className="text-gray-600">
                  Start browsing by entering a URL or searching.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChromeWindow;
