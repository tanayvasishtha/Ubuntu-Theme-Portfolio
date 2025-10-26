"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { X, Minus, Square, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import TerminalComponent from "@/components/TerminalComponent";
import {
  ProjectsWindow,
  NotepadWindow,
  AboutWindow,
  SkillsWindow,
  ContactWindow,
  GalleryWindow,
  SettingsWindow,
  HelpWindow,
  FilesWindow,
  TrashWindow,
  CalculatorWindow,
  MusicPlayerWindow,
  ChromeWindow,
  ImageViewerWindow,
} from "@/components/home";
import { en } from "@/data/en";
import * as Icon from "@/components/icon";
import type { DesktopIcon, Window } from "@/types";
import { checkCollision, snapToGrid } from "@/lib/utils";

export default function UbuntuPortfolio() {
  const [currentTime, setCurrentTime] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState(
    "/assets/wallpapers/ubuntu-wallpaper.jpg"
  );
  // Ubuntu-style sound effects (visual feedback)
  const playClickSound = () => {
    const clickEffect = document.createElement("div");
    clickEffect.className = "fixed inset-0 pointer-events-none z-50";
    clickEffect.innerHTML =
      '<div class="w-2 h-2 bg-white rounded-full animate-ping absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>';
    document.body.appendChild(clickEffect);
    setTimeout(() => clickEffect.remove(), 300);
  };
  const [notifications, setNotifications] = useState<
    Array<{
      id: string;
      message: string;
      type: "info" | "success" | "warning" | "error";
    }>
  >([]);

  // Ubuntu-style notification system
  const showNotification = (
    message: string,
    type: "info" | "success" | "warning" | "error" = "info"
  ) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const [windows, setWindows] = useState<Window[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);
  const [draggedIcon, setDraggedIcon] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [draggedWindow, setDraggedWindow] = useState<string | null>(null);
  const [windowDragOffset, setWindowDragOffset] = useState({ x: 0, y: 0 });

  // Window wrapper functions to pass props where needed
  const TerminalWindowWrapper = () => (
    <TerminalComponent onClose={() => closeWindow("terminal")} />
  );
  const SettingsWindowWrapper = () => (
    <SettingsWindow
      currentWallpaper={currentWallpaper}
      onWallpaperChange={(wallpaperPath: string) => {
        setCurrentWallpaper(wallpaperPath);
        showNotification(en.ui.notifications.wallpaperChanged, "success");
      }}
    />
  );

  const [desktopIcons, setDesktopIcons] = useState<DesktopIcon[]>([
    {
      id: "terminal",
      name: en.icons.terminal,
      icon: (
        <div className="w-10 h-10 flex items-center justify-center">
          <Icon.Terminal />
        </div>
      ),
      position: { x: 100, y: 100 },
      action: () =>
        openWindow("terminal", en.icons.terminal, <TerminalWindowWrapper />),
    },
    {
      id: "projects",
      name: en.icons.projects,
      icon: (
        <div className="w-10 h-10 flex items-center justify-center">
          <Icon.Projects />
        </div>
      ),
      position: { x: 100, y: 180 },
      action: () => openWindow("projects", "Projects", <ProjectsWindow />),
    },
    {
      id: "notepad",
      name: en.icons.commands,
      icon: (
        <div className="w-10 h-10 flex items-center justify-center">
          <Icon.Commands />
        </div>
      ),
      position: { x: 100, y: 260 },
      action: () => openWindow("notepad", "Commands Guide", <NotepadWindow />),
    },
    {
      id: "about",
      name: en.icons.about,
      icon: (
        <div className="w-10 h-10 flex items-center justify-center">
          <Icon.About />
        </div>
      ),
      position: { x: 100, y: 340 },
      action: () => openWindow("about", "About Me", <AboutWindow />),
    },
    {
      id: "skills",
      name: en.icons.skills,
      icon: (
        <div className="w-10 h-10 flex items-center justify-center">
          <Icon.Skills />
        </div>
      ),
      position: { x: 100, y: 420 },
      action: () => openWindow("skills", "Skills", <SkillsWindow />),
    },
    {
      id: "contact",
      name: en.icons.contact,
      icon: (
        <div className="w-10 h-10 flex items-center justify-center">
          <Icon.Contact />
        </div>
      ),
      position: { x: 200, y: 100 },
      action: () => openWindow("contact", "Contact", <ContactWindow />),
    },
    {
      id: "gallery",
      name: en.icons.gallery,
      icon: (
        <div className="w-10 h-10 flex items-center justify-center">
          <Icon.Gallery />
        </div>
      ),
      position: { x: 200, y: 180 },
      action: () => openWindow("gallery", en.icons.gallery, <GalleryWindow />),
    },
    {
      id: "settings",
      name: en.icons.settings,
      icon: (
        <div className="w-10 h-10 flex items-center justify-center">
          <Icon.Settings />
        </div>
      ),
      position: { x: 200, y: 260 },
      action: () =>
        openWindow("settings", en.icons.settings, <SettingsWindowWrapper />),
    },
  ]);

  const [sidebarIcons, setSidebarIcons] = useState<DesktopIcon[]>([
    {
      id: "home",
      name: en.icons.home,
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <Icon.Home />
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () => {
        setWindows([]);
      },
    },
    {
      id: "chrome",
      name: en.icons.chrome,
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <Icon.Chrome />
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () => openWindow("chrome", en.icons.chrome, <ChromeWindow />),
    },
    {
      id: "help",
      name: en.icons.help,
      icon: (
        <div className="w-6 h-6 flex items-center justify-center">
          <Icon.Help />
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () => openWindow("help", en.help.title, <HelpWindow />),
    },
    {
      id: "files",
      name: en.icons.files,
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <Icon.Files />
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () => openWindow("files", "File Manager", <FilesWindow />),
    },
    {
      id: "terminal",
      name: en.icons.terminal,
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <Icon.Terminal />
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () =>
        openWindow("terminal", en.icons.terminal, <TerminalWindowWrapper />),
    },
    {
      id: "settings",
      name: en.icons.settings,
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <Icon.Settings />
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () =>
        openWindow("settings", en.icons.settings, <SettingsWindowWrapper />),
    },
    {
      id: "calculator",
      name: en.icons.calculator,
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <Icon.Calculator />
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () =>
        openWindow("calculator", en.icons.calculator, <CalculatorWindow />),
    },
    {
      id: "music",
      name: en.icons.music,
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <Icon.Music />
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () => openWindow("music", en.icons.music, <MusicPlayerWindow />),
    },
    {
      id: "image-viewer",
      name: en.icons.imageViewer,
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <Icon.ImageViewer />
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () =>
        openWindow("image-viewer", en.icons.imageViewer, <ImageViewerWindow />),
    },
  ]);

  useEffect(() => {
    setIsClient(true);

    setCurrentTime(
      new Date().toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    );

    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const memoizedDesktopIcons = useMemo(() => desktopIcons, [desktopIcons]);
  const memoizedWindows = useMemo(() => windows, [windows]);

  const handleIconMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    iconId: string
  ) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggedIcon(iconId);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleWindowMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    windowId: string
  ) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggedWindow(windowId);
    setWindowDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    bringToFront(windowId);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (draggedIcon) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        const constrainedX = Math.max(
          100,
          Math.min(newX, window.innerWidth - 100)
        );
        const constrainedY = Math.max(
          48,
          Math.min(newY, window.innerHeight - 150)
        );

        const snapPos = snapToGrid(constrainedX, constrainedY);

        let finalPos = snapPos;
        if (
          checkCollision(draggedIcon, constrainedX, constrainedY, desktopIcons)
        ) {
          const gridSize = 80;
          const startX = 100;
          const startY = 100;

          const intendedCol = Math.round((constrainedX - startX) / gridSize);
          const intendedRow = Math.round((constrainedY - startY) / gridSize);

          for (let radius = 0; radius < 10; radius++) {
            for (let colOffset = -radius; colOffset <= radius; colOffset++) {
              for (let rowOffset = -radius; rowOffset <= radius; rowOffset++) {
                if (
                  Math.abs(colOffset) === radius ||
                  Math.abs(rowOffset) === radius
                ) {
                  const testX = startX + (intendedCol + colOffset) * gridSize;
                  const testY = startY + (intendedRow + rowOffset) * gridSize;

                  if (
                    testY >= 48 &&
                    !checkCollision(draggedIcon, testX, testY, desktopIcons)
                  ) {
                    finalPos = { x: testX, y: testY };
                    break;
                  }
                }
              }
              if (finalPos.x !== snapPos.x || finalPos.y !== snapPos.y) break;
            }
            if (finalPos.x !== snapPos.x || finalPos.y !== snapPos.y) break;
          }
        }

        setDesktopIcons((prev) =>
          prev.map((icon) =>
            icon.id === draggedIcon ? { ...icon, position: finalPos } : icon
          )
        );
      }

      if (draggedWindow) {
        const newX = e.clientX - windowDragOffset.x;
        const newY = e.clientY - windowDragOffset.y;

        const constrainedX = Math.max(
          0,
          Math.min(newX, window.innerWidth - 200)
        );
        const constrainedY = Math.max(
          48,
          Math.min(newY, window.innerHeight - 200)
        );

        setWindows((prev) =>
          prev.map((win) =>
            win.id === draggedWindow && !win.isMaximized
              ? { ...win, position: { x: constrainedX, y: constrainedY } }
              : win
          )
        );
      }
    };

    const handleGlobalMouseUp = () => {
      setDraggedIcon(null);
      setDraggedWindow(null);
    };

    if (draggedIcon || draggedWindow) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [draggedIcon, dragOffset, draggedWindow, windowDragOffset, desktopIcons]);

  const openWindow = (
    id: string,
    title: string,
    component: React.ReactNode
  ) => {
    const existingWindow = windows.find((w) => w.id === id);
    if (existingWindow) {
      bringToFront(id);
      return;
    }

    const newWindow = {
      id,
      title,
      component,
      position: { x: 50 + windows.length * 20, y: 50 + windows.length * 20 },
      size: { width: 640, height: 400 },
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
    };
    setWindows((prev) => [...prev, newWindow]);
    setNextZIndex((prev) => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  };

  const restoreWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w))
    );
    bringToFront(id);
  };

  const maximizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              isMaximized: !w.isMaximized,
              position: w.isMaximized ? { x: 50, y: 50 } : { x: 0, y: 48 },
              size: w.isMaximized
                ? { width: 640, height: 400 }
                : { width: window.innerWidth, height: window.innerHeight - 96 },
            }
          : w
      )
    );
  };

  const bringToFront = (id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w
      )
    );
    setNextZIndex((prev) => prev + 1);
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-linear-to-br from-purple-900 via-purple-800 to-orange-600">
      {/* Desktop Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${currentWallpaper})` }}
      />

      {/* Ubuntu Top Panel */}
      <div className="absolute top-0 left-0 right-0 bg-linear-to-r from-[#2C2C2C] to-[#1A1A1A] backdrop-blur-md text-white px-4 py-2 flex items-center justify-between z-50 h-12 border-b border-gray-600/30">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 h-8 px-3 rounded-md transition-all duration-200"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm font-medium">
                {en.ui.desktop.activities}
              </span>
            </div>
          </Button>
          <div className="h-6 w-px bg-gray-600"></div>
          <div className="text-sm font-medium text-gray-200">
            {en.ui.desktop.title}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-300">
              {en.ui.desktop.online}
            </span>
          </div>

          <div className="text-sm text-white font-mono bg-black/20 px-3 py-1 rounded-md">
            {isClient ? currentTime : "--:--:--"}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 h-8 w-8 rounded-md transition-all duration-200"
            onClick={() =>
              openWindow(
                "settings",
                en.icons.settings,
                <SettingsWindowWrapper />
              )
            }
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Ubuntu Sidebar */}
      <div className="absolute left-0 top-12 bottom-12 w-16 sm:w-20 bg-linear-to-b from-gray-900/40 to-black/50 backdrop-blur-xl border-r border-gray-700/20 z-40 shadow-2xl">
        <div className="flex flex-col items-center justify-start py-1 sm:py-2 space-y-1 h-full">
          {sidebarIcons.map((icon) => (
            <div
              key={icon.id}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl hover:bg-orange-500/20 transition-all duration-300 cursor-pointer group hover:scale-105 relative shrink-0"
              onClick={() => {
                playClickSound();
                icon.action();
              }}
              title={icon.name}
            >
              <div className="absolute -left-1 w-1 h-6 sm:h-8 bg-orange-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="group-hover:drop-shadow-xl transition-all duration-300 group-hover:brightness-125">
                {icon.icon}
              </div>

              <div className="absolute left-16 sm:left-20 bg-gray-900/95 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg border border-gray-700">
                {icon.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Icons */}
      <div
        className="absolute inset-0 p-4"
        style={{
          paddingTop: "64px",
          paddingBottom: "64px",
          paddingLeft: "100px",
        }}
      >
        {memoizedDesktopIcons.map((icon) => (
          <div
            key={icon.id}
            className={`absolute cursor-pointer select-none ${
              draggedIcon === icon.id ? "opacity-50" : ""
            }`}
            style={{
              left: icon.position.x,
              top: icon.position.y,
            }}
            onMouseDown={(e) => {
              playClickSound();
              handleIconMouseDown(e, icon.id);
            }}
            onDoubleClick={icon.action}
          >
            <div
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 w-20 ${
                draggedIcon === icon.id
                  ? "bg-white/20 scale-110 shadow-2xl backdrop-blur-sm"
                  : "hover:bg-white/10 hover:scale-105 hover:shadow-lg"
              }`}
            >
              <div className="drop-shadow-lg w-10 h-10 flex items-center justify-center">
                {icon.icon}
              </div>
              <span className="text-white text-xs text-center w-full truncate font-medium drop-shadow-md leading-tight">
                {icon.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Windows */}
      {memoizedWindows
        .filter((w) => !w.isMinimized)
        .map((window) => (
          <div
            key={window.id}
            className="absolute bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
            style={{
              left: window.isMaximized ? 0 : window.position.x,
              top: window.isMaximized ? 48 : window.position.y,
              width: window.size.width,
              height: window.size.height,
              zIndex: window.zIndex,
            }}
            onClick={() => bringToFront(window.id)}
          >
            <div
              className="bg-linear-to-r from-gray-200 to-gray-300 border-b border-gray-400 px-4 py-3 flex items-center justify-between cursor-move select-none shadow-sm"
              onMouseDown={(e) => handleWindowMouseDown(e, window.id)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-semibold text-gray-800">
                  {window.title}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  className="w-4 h-4 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    minimizeWindow(window.id);
                  }}
                  title={en.ui.window.minimize}
                  aria-label={`${en.ui.window.minimize} window`}
                >
                  <Minus className="w-3 h-3 text-white" />
                </button>
                <button
                  className="w-4 h-4 bg-green-500 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    maximizeWindow(window.id);
                  }}
                  title={
                    window.isMaximized
                      ? en.ui.window.restore
                      : en.ui.window.maximize
                  }
                  aria-label={
                    window.isMaximized
                      ? `${en.ui.window.restore} window`
                      : `${en.ui.window.maximize} window`
                  }
                >
                  <Square className="w-3 h-3 text-white" />
                </button>
                <button
                  className="w-4 h-4 bg-red-500 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWindow(window.id);
                  }}
                  title={en.ui.window.close}
                  aria-label={`${en.ui.window.close} window`}
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>

            {/* Window Content */}
            <div
              className="h-full bg-white"
              style={{ height: "calc(100% - 40px)" }}
            >
              {window.component}
            </div>
          </div>
        ))}

      {/* Ubuntu Bottom Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-r from-[#2C2C2C] to-[#1A1A1A] backdrop-blur-lg text-white px-4 py-2 flex items-center justify-between z-50 h-12 border-t border-gray-600/30 shadow-2xl">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-200"
          >
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-linear-to-br from-[#E95420] to-[#F7A072] rounded-md flex items-center justify-center">
                <span className="text-xs font-bold text-white">U</span>
              </div>
              <span className="text-sm font-medium">
                {en.ui.desktop.showApplications}
              </span>
            </div>
          </Button>

          <div className="w-px h-6 bg-gray-600"></div>

          {/* Window buttons */}
          <div className="flex items-center space-x-1">
            {memoizedWindows.map((window) => (
              <Button
                key={window.id}
                variant="ghost"
                size="sm"
                className={`text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-200 ${
                  window.isMinimized
                    ? "opacity-60 bg-white/5"
                    : "bg-white/10 shadow-md"
                }`}
                onClick={() =>
                  window.isMinimized
                    ? restoreWindow(window.id)
                    : bringToFront(window.id)
                }
              >
                <span className="text-sm font-medium">{window.title}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* System tray */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-300">
            {en.ui.desktop.connected}
          </span>
        </div>
      </div>

      {/* Ubuntu-style Notifications */}
      <div className="fixed top-16 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white/95 backdrop-blur-md rounded-lg shadow-lg border-l-4 px-4 py-3 max-w-sm transform transition-all duration-300 ${
              notification.type === "error"
                ? "border-red-500"
                : notification.type === "warning"
                ? "border-yellow-500"
                : notification.type === "success"
                ? "border-green-500"
                : "border-blue-500"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  notification.type === "error"
                    ? "bg-red-500"
                    : notification.type === "warning"
                    ? "bg-yellow-500"
                    : notification.type === "success"
                    ? "bg-green-500"
                    : "bg-blue-500"
                }`}
              ></div>
              <span className="text-sm font-medium text-gray-800">
                {notification.message}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
