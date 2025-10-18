"use client"

import React, { useState, useRef, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  Terminal,
  Folder,
  FileText,
  User,
  Code,
  Mail,
  ImageIcon,
  Settings,
  Github,
  Linkedin,
  Download,
  ExternalLink,
  Minus,
  Square,
  X,
  Home,
  Search,
  Trash2,
  HardDrive,
  HelpCircle,
  Monitor,
  Coffee,
  BookOpen,
  Zap,
  Star,
  Calculator,
  Music,
  Image,
  Globe,
  Camera,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat,
  Bookmark,
  BookmarkCheck,
  Phone,
  MapPin
} from "lucide-react"

// Custom X Logo Component
const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const UbuntuLoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Starting Ubuntu...")

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, text: "Loading kernel modules..." },
      { progress: 40, text: "Starting system services..." },
      { progress: 60, text: "Initializing desktop environment..." },
      { progress: 80, text: "Loading user interface..." },
      { progress: 95, text: "Almost ready..." },
      { progress: 100, text: "Welcome to Ubuntu!" },
    ]

    let currentStep = 0
    const progressTimer = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep]
        setLoadingProgress(step.progress)
        setLoadingText(step.text)
        currentStep++
      } else {
          clearInterval(progressTimer)
        setTimeout(() => onLoadingComplete(), 800)
        }
    }, 300)

    return () => {
      clearInterval(progressTimer)
    }
  }, [onLoadingComplete])

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      {/* Ubuntu Logo with pulsing animation */}
      <div className="mb-8 animate-pulse">
        <img
          src="/ubuntu-logo-circle.png"
          alt="Ubuntu"
          className="w-32 h-32 drop-shadow-2xl"
        />
      </div>

      {/* Loading dots animation */}
      <div className="flex space-x-2 mb-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-[#E95420] rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-[#E95420] to-[#F7A072] transition-all duration-300 ease-out"
          style={{ width: `${loadingProgress}%` }}
        />
        </div>

      {/* Loading text */}
      <p className="text-white text-lg font-light mb-2">{loadingText}</p>
      <p className="text-gray-400 text-sm">{loadingProgress}%</p>

      {/* Ubuntu branding */}
      <div className="absolute bottom-8 left-8 flex items-center gap-3">
        <img src="/ubuntu-logo-official.png" alt="Ubuntu" className="w-8 h-8" />
        <span className="text-white text-xl font-light">Ubuntu</span>
      </div>

      {/* Version info */}
      <div className="absolute bottom-8 right-8 text-gray-500 text-sm">
        Ubuntu 22.04.3 LTS
      </div>
    </div>
  )
}

interface Window {
  id: string
  title: string
  component: React.ReactNode
  position: { x: number; y: number }
  size: { width: number; height: number }
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
}

interface DesktopIcon {
  id: string
  name: string
  icon: React.ReactNode
  position: { x: number; y: number }
  action: () => void
}

interface DragState {
  isDragging: boolean
  draggedIcon: string | null
  offset: { x: number; y: number }
}

export default function UbuntuPortfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState("")
  const [isClient, setIsClient] = useState(false)
  const [currentWallpaper, setCurrentWallpaper] = useState("/assets/wallpapers/ubuntu-wallpaper.jpg")
  const [notifications, setNotifications] = useState<Array<{ id: string, message: string, type: 'info' | 'success' | 'warning' | 'error' }>>([])


  // Ubuntu-style sound effects (visual feedback)
  const playClickSound = () => {
    // Visual feedback for clicks
    const clickEffect = document.createElement('div')
    clickEffect.className = 'fixed inset-0 pointer-events-none z-50'
    clickEffect.innerHTML = '<div class="w-2 h-2 bg-white rounded-full animate-ping absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>'
    document.body.appendChild(clickEffect)
    setTimeout(() => clickEffect.remove(), 300)
  }

  const playHoverSound = () => {
    // Subtle hover effect
    const hoverEffect = document.createElement('div')
    hoverEffect.className = 'fixed inset-0 pointer-events-none z-40'
    hoverEffect.innerHTML = '<div class="w-1 h-1 bg-white/50 rounded-full animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>'
    document.body.appendChild(hoverEffect)
    setTimeout(() => hoverEffect.remove(), 200)
  }

  // Ubuntu-style notification system
  const showNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString()
    setNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 4000)
  }
  const [windows, setWindows] = useState<Window[]>([])
  const [nextZIndex, setNextZIndex] = useState(1000)
  const [draggedIcon, setDraggedIcon] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [draggedWindow, setDraggedWindow] = useState<string | null>(null)
  const [windowDragOffset, setWindowDragOffset] = useState({ x: 0, y: 0 })
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>({
    terminal: { x: 100, y: 100 },
    projects: { x: 100, y: 180 },
    notepad: { x: 100, y: 260 },
    about: { x: 100, y: 340 },
    skills: { x: 100, y: 420 },
    contact: { x: 250, y: 100 },
    gallery: { x: 250, y: 180 },
    settings: { x: 250, y: 260 },
  })
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Ubuntu 22.04.3 LTS ubuntu-developer tty1",
    "",
    "ubuntu-developer login: portfolio",
    "Welcome to Ubuntu Portfolio Desktop!",
    'Type "help" for available commands.',
    "",
  ])
  const [terminalInput, setTerminalInput] = useState("")
  const terminalRef = useRef<HTMLDivElement>(null)
  const terminalInputRef = useRef<HTMLInputElement>(null)
  const [currentCommand, setCurrentCommand] = useState("")

  const [desktopIcons, setDesktopIcons] = useState<DesktopIcon[]>([
    {
      id: "terminal",
      name: "Terminal",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="/assets/program-icons/terminal-app.png" alt="Terminal" className="w-10 h-10 drop-shadow-lg" />
        </div>
      ),
      position: { x: 100, y: 100 },
      action: () => openWindow("terminal", "Terminal", <TerminalWindow />),
    },
    {
      id: "projects",
      name: "Projects",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-10 h-10 drop-shadow-lg">
            <path fill="#E95420" d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
            <path fill="#FFFFFF" d="M12 8v8l4-4-4-4z" />
          </svg>
        </div>
      ),
      position: { x: 100, y: 180 },
      action: () => openWindow("projects", "Projects", <ProjectsWindow />),
    },
    {
      id: "notepad",
      name: "Commands",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-10 h-10 drop-shadow-lg">
            <path fill="#7C3AED" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            <path fill="#FFFFFF" d="M8 12h8v2H8v-2zm0 4h8v2H8v-2zm0-8h5v5H8V8z" />
          </svg>
        </div>
      ),
      position: { x: 100, y: 260 },
      action: () => openWindow("notepad", "Commands Guide", <NotepadWindow />),
    },
    {
      id: "about",
      name: "About Me",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-10 h-10 drop-shadow-lg">
            <circle fill="#16A34A" cx="12" cy="12" r="10" />
            <circle fill="#FFFFFF" cx="12" cy="8" r="2" />
            <path fill="#FFFFFF" d="M12 12c-2.5 0-4.5 2-4.5 4.5h9c0-2.5-2-4.5-4.5-4.5z" />
          </svg>
        </div>
      ),
      position: { x: 100, y: 340 },
      action: () => openWindow("about", "About Me", <AboutWindow />),
    },
    {
      id: "skills",
      name: "Skills",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-10 h-10 drop-shadow-lg">
            <path fill="#DC2626" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            <path fill="#FFFFFF" d="M12 6l1.5 3L17 10l-2.5 2.5L15 17l-3-1.5L9 17l.5-4.5L7 10l3.5-1L12 6z" />
          </svg>
        </div>
      ),
      position: { x: 100, y: 420 },
      action: () => openWindow("skills", "Skills", <SkillsWindow />),
    },
    {
      id: "contact",
      name: "Contact",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-10 h-10 drop-shadow-lg">
            <path fill="#0891B2" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            <path fill="#FFFFFF" d="M12 11l8-5H4l8 5z" />
          </svg>
        </div>
      ),
      position: { x: 200, y: 100 },
      action: () => openWindow("contact", "Contact", <ContactWindow />),
    },
    {
      id: "gallery",
      name: "Gallery",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-10 h-10 drop-shadow-lg">
            <path fill="#9333EA" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            <circle fill="#FFFFFF" cx="8.5" cy="8.5" r="1.5" />
          </svg>
        </div>
      ),
      position: { x: 200, y: 180 },
      action: () => openWindow("gallery", "Gallery", <GalleryWindow />),
    },
    {
      id: "settings",
      name: "Settings",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="/assets/program-icons/system-settings.png" alt="Settings" className="w-10 h-10 drop-shadow-lg" />
        </div>
      ),
      position: { x: 200, y: 260 },
      action: () => openWindow("settings", "Settings", <SettingsWindow />),
    },
  ])

  const [sidebarIcons, setSidebarIcons] = useState<DesktopIcon[]>([
    {
      id: "home",
      name: "Home",
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white drop-shadow-lg">
            <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () => {
        // Close all windows to show desktop
        setWindows([])
      },
    },
    {
      id: "firefox",
      name: "Firefox",
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <img src="/assets/program-icons/firefox.png" alt="Firefox" className="w-8 h-8 drop-shadow-lg" />
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () => openWindow("firefox", "Firefox Web Browser", <FirefoxWindow />),
    },
    {
      id: "software-center",
      name: "Software Center",
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 drop-shadow-lg">
            <path fill="#E95420" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () => openWindow("software-center", "Software Center", <SoftwareCenterWindow />),
    },
    {
      id: "help",
      name: "Help",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
          </svg>
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () => openWindow("help", "Help & Support", <HelpWindow />),
    },
    {
      id: "files",
      name: "Files",
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <img src="/assets/system-icons/filemanager-app.png" alt="Files" className="w-8 h-8 drop-shadow-lg" />
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () => openWindow("files", "File Manager", <FilesWindow />),
    },
    {
      id: "terminal",
      name: "Terminal",
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <img src="/assets/program-icons/terminal-app.png" alt="Terminal" className="w-8 h-8 drop-shadow-lg" />
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () => openWindow("terminal", "Terminal", <TerminalWindow />),
    },
    {
      id: "settings",
      name: "Settings",
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <img src="/assets/program-icons/system-settings.png" alt="Settings" className="w-8 h-8 drop-shadow-lg" />
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () => openWindow("settings", "Settings", <SettingsWindow />),
    },
    {
      id: "calculator",
      name: "Calculator",
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <img src="/assets/program-icons/calculator-app.png" alt="Calculator" className="w-8 h-8 drop-shadow-lg" />
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () => openWindow("calculator", "Calculator", <CalculatorWindow />),
    },
    {
      id: "music",
      name: "Music Player",
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <img src="/assets/program-icons/spotify-client.png" alt="Music" className="w-8 h-8 drop-shadow-lg" />
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () => openWindow("music", "Music Player", <MusicPlayerWindow />),
    },
    {
      id: "image-viewer",
      name: "Image Viewer",
      icon: (
        <div className="w-8 h-8 flex items-center justify-center">
          <img src="/assets/program-icons/image-viewer-app.png" alt="Image Viewer" className="w-8 h-8 drop-shadow-lg" />
        </div>
      ),
      position: { x: 0, y: 0 },
      action: () => openWindow("image-viewer", "Image Viewer", <ImageViewerWindow />),
    },
  ])

  useEffect(() => {
    // Set client-side flag to prevent hydration mismatch
    setIsClient(true)

    // Set initial time
    setCurrentTime(
      new Date().toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
    )

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
        }),
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Performance optimization: Memoize expensive calculations
  const memoizedDesktopIcons = useMemo(() => desktopIcons, [desktopIcons])
  const memoizedWindows = useMemo(() => windows, [windows])

  // Error boundary for graceful error handling
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Ubuntu Portfolio Error:', error)
      setHasError(true)
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  useEffect(() => {
    if (windows.find((w) => w.id === "terminal") && terminalInputRef.current) {
      setTimeout(() => {
        terminalInputRef.current?.focus()
      }, 100)
      setTimeout(() => {
        terminalInputRef.current?.focus()
      }, 500)
    }
  }, [windows])

  const snapToGrid = (x: number, y: number) => {
    // Ubuntu-style grid snapping - but allow free movement
    const gridSize = 80
    const startX = 100
    const startY = 100

    // Calculate grid position
    const gridX = Math.round((x - startX) / gridSize)
    const gridY = Math.round((y - startY) / gridSize)

    // Allow movement anywhere, just snap to grid
    const clampedY = Math.max(0, gridY)

    return {
      x: startX + gridX * gridSize,
      y: startY + clampedY * gridSize
    }
  }

  const checkCollision = (iconId: string, newX: number, newY: number) => {
    const snapPos = snapToGrid(newX, newY)

    // Check if position is already occupied
    return desktopIcons.some(icon =>
      icon.id !== iconId &&
      Math.abs(icon.position.x - snapPos.x) < 80 &&
      Math.abs(icon.position.y - snapPos.y) < 80
    )
  }

  const handleIconMouseDown = (e: React.MouseEvent<HTMLDivElement>, iconId: string) => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    setDraggedIcon(iconId)
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleWindowMouseDown = (e: React.MouseEvent<HTMLDivElement>, windowId: string) => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    setDraggedWindow(windowId)
    setWindowDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    bringToFront(windowId)
  }

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Handle icon dragging with Ubuntu-style snapping
      if (draggedIcon) {
        const newX = e.clientX - dragOffset.x
        const newY = e.clientY - dragOffset.y

        const constrainedX = Math.max(100, Math.min(newX, window.innerWidth - 100))
        const constrainedY = Math.max(48, Math.min(newY, window.innerHeight - 150))

        // Snap to grid position
        const snapPos = snapToGrid(constrainedX, constrainedY)

        // Check for collisions and find next available position
        let finalPos = snapPos
        if (checkCollision(draggedIcon, constrainedX, constrainedY)) {
          // Find next available position in grid - search from current position outward
          const gridSize = 80
          const startX = 100
          const startY = 100

          // Start from the intended position and search outward
          const intendedCol = Math.round((constrainedX - startX) / gridSize)
          const intendedRow = Math.round((constrainedY - startY) / gridSize)

          // Search in expanding radius
          for (let radius = 0; radius < 10; radius++) {
            for (let colOffset = -radius; colOffset <= radius; colOffset++) {
              for (let rowOffset = -radius; rowOffset <= radius; rowOffset++) {
                if (Math.abs(colOffset) === radius || Math.abs(rowOffset) === radius) {
                  const testX = startX + (intendedCol + colOffset) * gridSize
                  const testY = startY + (intendedRow + rowOffset) * gridSize

                  // Only check positions that are within bounds
                  if (testX >= startX && testY >= startY) {
                    if (!checkCollision(draggedIcon, testX, testY)) {
                      finalPos = { x: testX, y: testY }
                      break
                    }
                  }
                }
              }
              if (finalPos.x !== snapPos.x || finalPos.y !== snapPos.y) break
            }
            if (finalPos.x !== snapPos.x || finalPos.y !== snapPos.y) break
          }
        }

        setDesktopIcons((prev) =>
          prev.map((icon) =>
            icon.id === draggedIcon ? { ...icon, position: finalPos } : icon,
          ),
        )
      }

      if (draggedWindow) {
        const newX = e.clientX - windowDragOffset.x
        const newY = e.clientY - windowDragOffset.y

        const constrainedX = Math.max(0, Math.min(newX, window.innerWidth - 200))
        const constrainedY = Math.max(48, Math.min(newY, window.innerHeight - 200))

        setWindows((prev) =>
          prev.map((win) =>
            win.id === draggedWindow && !win.isMaximized
              ? { ...win, position: { x: constrainedX, y: constrainedY } }
              : win,
          ),
        )
      }
    }

    const handleGlobalMouseUp = () => {
      setDraggedIcon(null)
      setDraggedWindow(null)
    }

    if (draggedIcon || draggedWindow) {
      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [draggedIcon, dragOffset, draggedWindow, windowDragOffset])

  const openWindow = (id: string, title: string, component: React.ReactNode) => {
    const existingWindow = windows.find((w) => w.id === id)
    if (existingWindow) {
      bringToFront(id)
      return
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
    }
    setWindows((prev) => [...prev, newWindow])
    setNextZIndex((prev) => prev + 1)
  }

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }

  const minimizeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)))
  }

  const restoreWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w)))
    bringToFront(id)
  }

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
          : w,
      ),
    )
  }

  const bringToFront = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w)))
    setNextZIndex((prev) => prev + 1)
  }

  const handleTerminalCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = currentCommand.trim()
      setCurrentCommand("")

      if (command === "help") {
        setTerminalHistory((prev) => [
          ...prev,
          `ubuntu-developer@portfolio:~$ ${command}`,
          "Available commands:",
          "  help - Show this help message",
          "  clear - Clear terminal",
          "  ls - List directory contents",
          "  pwd - Print working directory",
          "  whoami - Display current user",
          "  email - Show email address",
          "  date - Show current date and time",
          "  neofetch - Display system information",
          "  fortune - Get a random quote",
          "",
          "Application Commands:",
          "  open [app] - Open application (about, skills, contact, gallery, settings, projects)",
          "  ./[project] - Launch specific project (debtrix, weloveqr, synthralabs, portfolio)",
          "",
          "File Commands:",
          "  cat [file] - Display file contents (about.txt, contact.txt, skills.txt)",
          "  tree - Show directory tree",
          "  history - Show command history",
          "",
          "Social Media & Projects:",
          "  visit github - Open GitHub profile",
          "  visit linkedin - Open LinkedIn profile",
          "  visit x - Open X (Twitter) profile",
          "  visit medium - Open Medium profile",
          "  visit producthunt - Open Product Hunt profile",
          "  visit peerlist - Open Peerlist profile",
          "  visit coffee - Open Buy Me a Coffee",
          "  visit debtrix - Open Debtrix project",
          "  visit weloveqr - Open WeLoveQR project",
          "  visit synthralabs - Open SynthraLabs organization",
          "",
          "  exit - Close terminal",
          "",
        ])
      } else if (command === "clear") {
        setTerminalHistory([])
      } else if (command === "ls") {
        setTerminalHistory((prev) => [
          ...prev,
          `ubuntu-developer@portfolio:~$ ${command}`,
          "projects/",
          "about.txt",
          "contact.txt",
          "skills.txt",
          "commands.txt",
          "ecommerce*",
          "taskmanager*",
          "apigateway*",
          "portfolio*",
          "",
        ])
      } else if (command === "pwd") {
        setTerminalHistory((prev) => [
          ...prev,
          `ubuntu-developer@portfolio:~$ ${command}`,
          "/home/ubuntu-developer",
          "",
        ])
      } else if (command === "whoami") {
        setTerminalHistory((prev) => [...prev, `ubuntu-developer@portfolio:~$ ${command}`, "ubuntu-developer", ""])
      } else if (command === "date") {
        setTerminalHistory((prev) => [...prev, `ubuntu-developer@portfolio:~$ ${command}`, new Date().toString(), ""])
      } else if (command === "neofetch") {
        setTerminalHistory((prev) => [
          ...prev,
          `ubuntu-developer@portfolio:~$ ${command}`,
          "                    .-/+oossssoo+/-.",
          "                `:+ssssssssssssssssss+:`",
          "              -+ssssssssssssssssssyyssss+-",
          "            .ossssssssssssssssss+:::::+ys:",
          "           /ssssssssssshdmmNNmmyNMMMMh+sss/",
          "          +ssssssssshmydMMMMMMMNddddyssssss+",
          "         /sssssssshNMMMyhhyyyyhmNMMMNhssssss/",
          "        .ssssssssdMMMNhsssssssssshNMMMdssssss.",
          "        +sssshhhyNMMNyssssssssssssyNMMMysssss+",
          "        ossyNMMMNyMMhsssssssssssssshmmmhssssso",
          "        ossyNMMMNyMMhsssssssssssssshmmmhssssso",
          "        +sssshhhyNMMNyssssssssssssyNMMMysssss+",
          "        .ssssssssdMMMNhsssssssssshNMMMdssssss.",
          "         /sssssssshNMMMyhhyyyyhdNMMMNhssssss/",
          "          +sssssssssdmydMMMMMMMMddddyssssss+",
          "           /ssssssssssshdmNNNNmyNMMMMhssss/",
          "            .ossssssssssssssssss+:::::+ys:",
          "              -+sssssssssssssssssyyssss+-",
          "                `:+ssssssssssssssssss+:`",
          "                    .-/+oossssoo+/-.",
          "",
          "ubuntu-developer@portfolio-desktop",
          "OS: Ubuntu 22.04.3 LTS x86_64",
          "Host: Portfolio Desktop",
          "Kernel: 5.15.0-generic",
          "Uptime: 2 hours, 34 mins",
          "Packages: 2847 (dpkg), 63 (snap)",
          "Shell: bash 5.1.16",
          "Resolution: 1920x1080",
          "DE: Portfolio Desktop Environment",
          "WM: Portfolio WM",
          "Theme: Ubuntu [GTK2/3]",
          "Icons: Yaru [GTK2/3]",
          "Terminal: portfolio-terminal",
          "CPU: Intel i7-12700K (16) @ 3.600GHz",
          "GPU: NVIDIA GeForce RTX 3080",
          "Memory: 2847MiB / 32768MiB",
          "",
        ])
      } else if (command === "fortune") {
        const fortunes = [
          "The best way to predict the future is to implement it.",
          "Code is like humor. When you have to explain it, it's bad.",
          "Programming isn't about what you know; it's about what you can figure out.",
          "The most important property of a program is whether it accomplishes the intention of its user.",
          "Ubuntu: Linux for human beings.",
          "There are only two hard things in Computer Science: cache invalidation and naming things.",
        ]
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
        setTerminalHistory((prev) => [...prev, `ubuntu-developer@portfolio:~$ ${command}`, randomFortune, ""])
      } else if (command === "tree") {
        setTerminalHistory((prev) => [
          ...prev,
          `ubuntu-developer@portfolio:~$ ${command}`,
          ".",
          "├── projects/",
          "│   ├── ecommerce/",
          "│   ├── taskmanager/",
          "│   ├── apigateway/",
          "│   └── portfolio/",
          "├── about.txt",
          "├── contact.txt",
          "├── skills.txt",
          "└── README.md",
          "",
          "4 directories, 4 files",
          "",
        ])
      } else if (command === "history") {
        setTerminalHistory((prev) => [
          ...prev,
          `ubuntu-developer@portfolio:~$ ${command}`,
          "1  help",
          "2  ls",
          "3  pwd",
          "4  whoami",
          "5  neofetch",
          "6  history",
          "",
        ])
      } else if (command === "exit") {
        closeWindow("terminal")
        return
      } else if (command.startsWith("cat ")) {
        const fileName = command.split(" ")[1]
        if (fileName === "about.txt") {
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            "# About Me",
            "Full-Stack Developer & Linux Enthusiast",
            "",
            "Passionate about creating scalable web applications",
            "and exploring the depths of Ubuntu/Linux systems.",
            "Specializing in React, Next.js, Node.js, and DevOps.",
            "",
          ])
        } else if (fileName === "contact.txt") {
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            "# Contact Information",
            "Email: developer@ubuntu-portfolio.dev",
            "GitHub: @ubuntu-developer",
            "LinkedIn: /in/ubuntu-developer",
            "",
          ])
        } else if (fileName === "skills.txt") {
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            "# Technical Skills",
            "Frontend: React, Next.js, TypeScript, Tailwind CSS",
            "Backend: Node.js, Express.js, Python, PostgreSQL",
            "DevOps: Docker, Kubernetes, AWS, Ubuntu Server",
            "Tools: Git, VS Code, Terminal, Postman",
            "",
          ])
        } else if (fileName === "commands.txt") {
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            "# Ubuntu Portfolio Terminal Commands",
            "# Available commands for the portfolio terminal",
            "# Copy and paste these commands into the terminal to execute them",
            "",
            "## Basic Commands",
            "help",
            "clear",
            "ls",
            "pwd",
            "whoami",
            "email",
            "date",
            "neofetch",
            "fortune",
            "exit",
            "",
            "## Application Commands",
            "open about",
            "open skills",
            "open contact",
            "open gallery",
            "open settings",
            "open projects",
            "",
            "## Social Media Commands",
            "visit github",
            "visit linkedin",
            "visit x",
            "visit medium",
            "visit producthunt",
            "visit peerlist",
            "visit coffee",
            "",
            "## Project Commands",
            "visit debtrix",
            "visit weloveqr",
            "visit synthralabs",
            "",
            "## File Commands",
            "cat about.txt",
            "cat contact.txt",
            "cat skills.txt",
            "cat commands.txt",
            "tree",
            "history",
            "",
            "## Project Launch Commands",
            "./debtrix",
            "./weloveqr",
            "./synthralabs",
            "./portfolio",
            "",
            "## Quick Access Commands",
            "# Copy any command above and paste into terminal",
            "# Examples:",
            "# visit github",
            "# open about",
            "# cat commands.txt",
            "# visit debtrix",
            "",
          ])
        } else {
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            `cat: ${fileName}: No such file or directory`,
            "",
          ])
        }
      } else if (command === "./ecommerce") {
        openWindow("projects", "E-commerce Platform", <ProjectDetailWindow project="ecommerce" />)
        setTerminalHistory((prev) => [
          ...prev,
          `ubuntu-developer@portfolio:~$ ${command}`,
          "Launching E-commerce Platform...",
          "Opening project details window...",
          "",
        ])
      } else if (command === "./taskmanager") {
        openWindow("projects", "Task Manager App", <ProjectDetailWindow project="taskmanager" />)
        setTerminalHistory((prev) => [
          ...prev,
          `ubuntu-developer@portfolio:~$ ${command}`,
          "Launching Task Manager App...",
          "Opening project details window...",
          "",
        ])
      } else if (command === "./apigateway") {
        openWindow("projects", "API Gateway", <ProjectDetailWindow project="apigateway" />)
        setTerminalHistory((prev) => [
          ...prev,
          `ubuntu-developer@portfolio:~$ ${command}`,
          "Launching API Gateway...",
          "Opening project details window...",
          "",
        ])
      } else if (command === "./portfolio") {
        openWindow("projects", "Portfolio Website", <ProjectDetailWindow project="portfolio" />)
        setTerminalHistory((prev) => [
          ...prev,
          `ubuntu-developer@portfolio:~$ ${command}`,
          "Launching Portfolio Website...",
          "You're already here! 🐧",
          "",
        ])
      } else if (command.startsWith("open")) {
        const appName = command.split(" ")[1]
        if (appName === "projects") {
          openWindow("projects", "Projects", <ProjectsWindow />)
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            `Opening ${appName}...`,
            "",
          ])
        } else if (appName === "about") {
          openWindow("about", "About Me", <AboutWindow />)
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            `Opening ${appName}...`,
            "",
          ])
        } else if (appName === "skills") {
          openWindow("skills", "Skills", <SkillsWindow />)
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            `Opening ${appName}...`,
            "",
          ])
        } else if (appName === "contact") {
          openWindow("contact", "Contact", <ContactWindow />)
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            `Opening ${appName}...`,
            "",
          ])
        } else if (appName === "gallery") {
          openWindow("gallery", "Gallery", <GalleryWindow />)
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            `Opening ${appName}...`,
            "",
          ])
        } else if (appName === "settings") {
          openWindow("settings", "Settings", <SettingsWindow />)
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            `Opening ${appName}...`,
            "",
          ])
        } else {
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            `Error: Application "${appName}" not found.`,
            'Type "help" for available commands.',
            "",
          ])
        }
      } else if (command.startsWith("visit")) {
        const site = command.split(" ")[1]
        if (site === "github") {
          window.open('https://github.com/tanayvasishtha', '_blank')
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            "Opening GitHub profile...",
            "Redirecting to https://github.com/tanayvasishtha",
            "",
          ])
        } else if (site === "linkedin") {
          window.open('https://www.linkedin.com/in/tanayvasishtha/', '_blank')
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            "Opening LinkedIn profile...",
            "Redirecting to https://www.linkedin.com/in/tanayvasishtha/",
            "",
          ])
        } else if (site === "x" || site === "twitter") {
          window.open('https://x.com/TanayVasishtha', '_blank')
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            "Opening X (Twitter) profile...",
            "Redirecting to https://x.com/TanayVasishtha",
            "",
          ])
        } else if (site === "medium") {
          window.open('https://medium.com/@tanayvasishtha', '_blank')
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            "Opening Medium profile...",
            "Redirecting to https://medium.com/@tanayvasishtha",
            "",
          ])
        } else if (site === "producthunt") {
          window.open('https://www.producthunt.com/@tanayvasishtha', '_blank')
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            "Opening Product Hunt profile...",
            "Redirecting to https://www.producthunt.com/@tanayvasishtha",
            "",
          ])
        } else if (site === "peerlist") {
          window.open('https://peerlist.io/tanayvasishtha', '_blank')
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            "Opening Peerlist profile...",
            "Redirecting to https://peerlist.io/tanayvasishtha",
            "",
          ])
        } else if (site === "coffee") {
          window.open('https://buymeacoffee.com/tanayvasishtha', '_blank')
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            "Opening Buy Me a Coffee...",
            "Redirecting to https://buymeacoffee.com/tanayvasishtha",
            "",
          ])
        } else if (site === "debtrix") {
          window.open('https://debtrix-nine.vercel.app', '_blank')
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            "Opening Debtrix project...",
            "Redirecting to https://debtrix-nine.vercel.app",
            "",
          ])
        } else if (site === "weloveqr") {
          window.open('https://weloveqr.netlify.app/', '_blank')
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            "Opening WeLoveQR project...",
            "Redirecting to https://weloveqr.netlify.app/",
            "",
          ])
        } else if (site === "synthralabs") {
          window.open('https://github.com/orgs/SynthraLabs', '_blank')
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            "Opening SynthraLabs organization...",
            "Redirecting to https://github.com/orgs/SynthraLabs",
            "",
          ])
        } else {
          setTerminalHistory((prev) => [
            ...prev,
            `ubuntu-developer@portfolio:~$ ${command}`,
            `Error: Site "${site}" not found.`,
            'Available sites: github, linkedin, x, medium, producthunt, peerlist, coffee, debtrix, weloveqr, synthralabs',
            "",
          ])
        }
      } else if (command === "clear") {
        setTerminalHistory([])
        return
      } else if (command === "date") {
        const now = new Date()
        setTerminalHistory((prev) => [
          ...prev,
          `ubuntu-developer@portfolio:~$ ${command}`,
          now.toLocaleString(),
          "",
        ])
      } else if (command === "whoami") {
        setTerminalHistory((prev) => [
          ...prev,
          `ubuntu-developer@portfolio:~$ ${command}`,
          "tanayvasishtha",
          "",
        ])
      } else if (command === "email") {
        setTerminalHistory((prev) => [
          ...prev,
          `ubuntu-developer@portfolio:~$ ${command}`,
          "edgepersonal2004@gmail.com",
          "",
        ])
      } else if (command === "") {
        setTerminalHistory((prev) => [...prev, "ubuntu-developer@portfolio:~$ ", ""])
      } else {
        setTerminalHistory((prev) => [
          ...prev,
          `ubuntu-developer@portfolio:~$ ${command}`,
          `bash: ${command}: command not found`,
          'Type "help" for available commands.',
          "",
        ])
      }

      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
      }, 100)
    }
  }

  const TerminalWindow = () => (
    <div className="h-full bg-[#000000] text-chart-3 font-mono text-sm p-4 overflow-hidden flex flex-col">
      <div ref={terminalRef} className="flex-1 overflow-y-auto mb-4 space-y-1">
        {terminalHistory.map((line, index) => (
          <div
            key={index}
            className={
              line.startsWith("ubuntu-developer@portfolio")
                ? "text-chart-3"
                : line.includes("command not found")
                  ? "text-destructive"
                  : line.includes("Opening") || line.includes("Launching")
                    ? "text-chart-5"
                    : "text-muted-foreground"
            }
          >
            {line}
          </div>
        ))}
      </div>
      <div className="flex items-center" onClick={() => terminalInputRef.current?.focus()}>
        <span className="text-chart-3 mr-2">ubuntu-developer@portfolio:~$</span>
        <input
          ref={terminalInputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => {
            console.log('Input changed:', e.target.value)
            setCurrentCommand(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleTerminalCommand(e)
            }
          }}
          className="flex-1 bg-transparent text-white outline-none font-mono caret-white border-none"
          placeholder="Type a command..."
          autoFocus
          tabIndex={0}
          onBlur={(e) => {
            setTimeout(() => {
              if (windows.find((w) => w.id === "terminal")) {
                e.target.focus()
              }
            }, 10)
          }}
          onClick={() => terminalInputRef.current?.focus()}
        />
      </div>
    </div>
  )

  const ProjectsWindow = () => (
    <div className="h-full bg-card p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "WeLoveQR",
            description: "Modern QR code generator with advanced customization, analytics, and bulk generation features",
            tech: ["React", "Node.js", "MongoDB", "QR Code API"],
            status: "Live",
            link: "https://weloveqr.netlify.app"
          },
          {
            title: "Dark Mode Bang",
            description: "Chrome & Firefox extension that instantly applies dark mode to any website with one click",
            tech: ["JavaScript", "Chrome Extension API", "Firefox WebExtensions", "CSS"],
            status: "Live",
            link: "https://chromewebstore.google.com/detail/dark-mode-bang-universal/hnnplkbhhlfopkkhfepdiljdbclfbpjh"
          },
          {
            title: "Volume Bang",
            description: "Browser extension for instant volume control and audio management across all tabs",
            tech: ["JavaScript", "Web Audio API", "Chrome Extension API", "Firefox WebExtensions"],
            status: "Live",
            link: "https://chromewebstore.google.com/detail/volume-bang-premium-audio/ancjplaiedoominjbebhdgjipcgfbopl"
          },
          {
            title: "Speed Bang",
            description: "Performance optimization extension that accelerates web browsing and reduces loading times",
            tech: ["JavaScript", "Performance API", "Chrome Extension API", "Firefox WebExtensions"],
            status: "Live",
            link: "https://chromewebstore.google.com/detail/speedbang-multiplatform-v/kaacodjcoaepldmhnpgodhafbcmlkfgo"
          },
          {
            title: "Portfolio Website",
            description: "Interactive Ubuntu desktop simulation as a portfolio website",
            features: [
              "Full Ubuntu desktop simulation",
              "Draggable windows and icons",
              "Working terminal with commands",
              "Responsive design",
              "Project showcases",
              "Contact integration",
              "Loading screen animation",
            ],
            tech: ["Next.js", "TypeScript", "Tailwind CSS", "Lucide Icons"],
            status: "Live",
          },
        ].map((project, index) => (
          <div key={index} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
            <p className="text-card-foreground mb-3">{project.description}</p>
            {project.link && (
              <div className="mb-3">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Project
                </a>
              </div>
            )}
            <div className="mt-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${project.status === "Completed" || project.status === "Live"
                    ? "bg-chart-3/20 text-chart-3"
                    : "bg-chart-5/20 text-chart-5"
                }`}
              >
                {project.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const NotepadWindow = () => (
    <div className="h-full bg-card p-4 font-mono text-sm">
      <div className="h-full overflow-y-auto whitespace-pre-wrap text-foreground">
        {`# Ubuntu Portfolio Commands Guide
# Welcome to my interactive portfolio!

## Quick Start Commands:
Copy and paste these commands into the terminal:

./ecommerce     - View my e-commerce platform project
./taskmanager   - Explore the task management app
./apigateway    - Check out the API gateway system
./portfolio     - About this portfolio website

## Window Commands:
open projects   - Open projects folder (GUI way)
open about      - Learn more about me
open skills     - View my technical skills
open contact    - Get in touch with me
open gallery    - View project screenshots
open settings   - System preferences

## Navigation Commands:
help           - Show this help guide
clear          - Clear terminal history
ls             - List available projects
pwd            - Show current directory
whoami         - Display user information

## Fun Commands:
neofetch       - Display system information
fortune        - Get a random quote
date           - Show current date and time

## Tips:
- Double-click desktop icons for GUI access
- Use Tab for command completion
- All commands are case-sensitive
- Type 'exit' to close terminal

Happy exploring! 🐧`}
      </div>
    </div>
  )

  const AboutWindow = () => (
    <div className="h-full bg-card p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary">
            <img
              src="/Best Pfp.jpg"
              alt="Tanay Vasishtha"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Tanay Vasishtha</h2>
          <p className="text-card-foreground">B-Tech Student & Builder</p>
        </div>
        <div className="space-y-4 text-card-foreground">
          <p>
            As a fourth year B-Tech student, I am driven by passion for exploring the intersection of technology and society.
            With a strong foundation in mathematics and science, I am constantly seeking new challenges to enhance my skills and knowledge.
          </p>
          <p>
            During my leisure time at college, I have been actively involved in various extracurricular activities, including
            graphic designing, video editing and photography, which have helped me develop a creative approach to problem-solving.
            I have also taken on creative roles in student organizations, which have taught me valuable skills in communication and teamwork.
          </p>
          <p>
            With a keen interest in emerging technologies such as artificial intelligence and blockchain, I am eager to contribute
            my knowledge and skills to the tech industry. I am seeking opportunities to gain hands-on experience through internships
            or projects, and I am excited to connect with professionals in the field.
          </p>
          <p>
            My ultimate goal is to use my technical expertise to create innovative solutions that positively impact society.
            I am committed to lifelong learning and constantly pushing myself to grow both personally and professionally.
            Let's connect and explore the possibilities together.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-6">
          <Button
            size="sm"
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => window.open('https://github.com/tanayvasishtha', '_blank')}
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => window.open('https://www.linkedin.com/in/tanayvasishtha/', '_blank')}
          >
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => window.open('https://x.com/TanayVasishtha', '_blank')}
          >
            <XLogo className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => window.open('https://medium.com/@tanayvasishtha', '_blank')}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Medium
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => window.open('https://www.producthunt.com/@tanayvasishtha', '_blank')}
          >
            <Zap className="w-4 h-4 mr-2" />
            Product Hunt
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => window.open('https://peerlist.io/tanayvasishtha', '_blank')}
          >
            <User className="w-4 h-4 mr-2" />
            Peerlist
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => window.open('https://buymeacoffee.com/tanayvasishtha', '_blank')}
          >
            <Coffee className="w-4 h-4 mr-2" />
            Buy me a coffee
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Resume
          </Button>
        </div>
      </div>
    </div>
  )

  const SkillsWindow = () => {
    const skillCategories = {
      "Frontend": [
        { name: "React", icon: "/assets/skills-icons/react.png" },
        { name: "Vue", icon: "/assets/skills-icons/vue.png" },
        { name: "TypeScript", icon: "/assets/skills-icons/typescript.png" },
        { name: "JavaScript", icon: "/assets/skills-icons/javascript.png" },
        { name: "HTML", icon: "/assets/skills-icons/html.png" },
        { name: "CSS", icon: "/assets/skills-icons/css.png" },
        { name: "TailwindCSS", icon: "/assets/skills-icons/tailwindcss.png" },
        { name: "Sass", icon: "/assets/skills-icons/sass.png" },
        { name: "Bootstrap", icon: "/assets/skills-icons/bootstrap.png" },
        { name: "Nuxt", icon: "/assets/skills-icons/nuxt.png" },
        { name: "Astro", icon: "/assets/skills-icons/astro.png" },
        { name: "Svelte", icon: "/assets/skills-icons/svelte.png" },
      ],
      "Backend": [
        { name: "Node.js", icon: "/assets/skills-icons/nodejs.png" },
        { name: "Express", icon: "/assets/skills-icons/express.png" },
        { name: "Fastify", icon: "/assets/skills-icons/fastify.png" },
        { name: "NestJS", icon: "/assets/skills-icons/nestjs.png" },
        { name: "Python", icon: "/assets/skills-icons/python.png" },
        { name: "Django", icon: "/assets/skills-icons/django.png" },
        { name: "Flask", icon: "/assets/skills-icons/flask.png" },
        { name: "FastAPI", icon: "/assets/skills-icons/fastapi.png" },
        { name: "C#", icon: "/assets/skills-icons/csharp.png" },
        { name: "Rust", icon: "/assets/skills-icons/rust.png" },
      ],
      "Database": [
        { name: "MongoDB", icon: "/assets/skills-icons/mongodb.png" },
        { name: "PostgreSQL", icon: "/assets/skills-icons/postgres.png" },
        { name: "Mongoose", icon: "/assets/skills-icons/mongoose.png" },
        { name: "Prisma", icon: "/assets/skills-icons/prisma.png" },
      ],
      "DevOps & Cloud": [
        { name: "Docker", icon: "/assets/skills-icons/docker.png" },
        { name: "Kubernetes", icon: "/assets/skills-icons/kubernetes.png" },
        { name: "AWS", icon: "/assets/skills-icons/aws.png" },
        { name: "Terraform", icon: "/assets/skills-icons/terraform.png" },
        { name: "Serverless", icon: "/assets/skills-icons/serverless.png" },
        { name: "Vercel", icon: "/assets/skills-icons/vercel.png" },
      ],
      "Data Science & ML": [
        { name: "Python", icon: "/assets/skills-icons/python.png" },
        { name: "NumPy", icon: "/assets/skills-icons/numpy.png" },
        { name: "Pandas", icon: "/assets/skills-icons/pandas.png" },
        { name: "Scikit-learn", icon: "/assets/skills-icons/scikit-learn.png" },
        { name: "PyTorch", icon: "/assets/skills-icons/pytorch.png" },
        { name: "XGBoost", icon: "/assets/skills-icons/xgboost.png" },
        { name: "SciPy", icon: "/assets/skills-icons/scipy.png" },
        { name: "Seaborn", icon: "/assets/skills-icons/seaborn.png" },
        { name: "MLflow", icon: "/assets/skills-icons/mlflow.png" },
        { name: "LangChain", icon: "/assets/skills-icons/langchain.png" },
        { name: "Evidently", icon: "/assets/skills-icons/evidently.png" },
        { name: "Prefect", icon: "/assets/skills-icons/prefect.png" },
        { name: "Grafana", icon: "/assets/skills-icons/grafana.png" },
        { name: "MATLAB", icon: "/assets/skills-icons/matlab.png" },
      ],
      "Tools & Others": [
        { name: "Git", icon: "/assets/skills-icons/git.png" },
        { name: "Bitbucket", icon: "/assets/skills-icons/bitbucket.png" },
        { name: "Jira", icon: "/assets/skills-icons/jira.png" },
        { name: "PyPI", icon: "/assets/skills-icons/pypi.png" },
        { name: "Pytest", icon: "/assets/skills-icons/pytest.png" },
        { name: "Pylint", icon: "/assets/skills-icons/pylint.png" },
        { name: "Conda", icon: "/assets/skills-icons/conda.png" },
        { name: "Venv", icon: "/assets/skills-icons/venv.png" },
        { name: "Redux", icon: "/assets/skills-icons/redux.png" },
        { name: "Pinia", icon: "/assets/skills-icons/pinia.png" },
      ]
    }

    return (
      <div className="h-full bg-card p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-foreground mb-6">Skills & Technologies</h2>
        <div className="space-y-8">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">
                {category}
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center p-3 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer"
                    title={skill.name}
                  >
                    <div className="w-12 h-12 mb-2 flex items-center justify-center">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <span className="text-xs text-card-foreground text-center leading-tight">
                      {skill.name}
                  </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const ContactWindow = () => (
    <div className="h-full bg-card p-6 overflow-y-auto">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Get In Touch</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">Email</p>
              <p className="text-card-foreground">edgepersonal2004@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
            <Github className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">GitHub</p>
              <p className="text-card-foreground">@tanayvasishtha</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
            <Linkedin className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">LinkedIn</p>
              <p className="text-card-foreground">/in/tanayvasishtha</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
            <XLogo className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">X</p>
              <p className="text-card-foreground">@TanayVasishtha</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Mail className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>
    </div>
  )

  const GalleryWindow = () => {
    const projects = [
      {
        name: "Dark Mode Bang Screenshot",
        image: "/assets/project-gallery/DarkModeBangSc.png",
        description: "Universal dark theme browser extension interface"
      },
      {
        name: "Dark Mode Bang Logo",
        image: "/assets/project-gallery/DarkModeBangLogo.png",
        description: "Dark Mode Bang branding and logo design"
      },
      {
        name: "Speed Bang Screenshot",
        image: "/assets/project-gallery/SpeedBangSc.png",
        description: "Multiplatform video speed controller interface"
      },
      {
        name: "Speed Bang Logo",
        image: "/assets/project-gallery/SpeedBangLogo.png",
        description: "Speed Bang branding and logo design"
      },
      {
        name: "Volume Bang Screenshot",
        image: "/assets/project-gallery/VolumeBangSc.png",
        description: "Premium audio booster extension interface"
      },
      {
        name: "Volume Bang Logo",
        image: "/assets/project-gallery/VolumeBanglogo.png",
        description: "Volume Bang branding and logo design"
      }
    ]

    return (
    <div className="h-full bg-card p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6">Project Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-muted rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2">{project.name}</h3>
                <p className="text-xs text-card-foreground line-clamp-2">{project.description}</p>
              </div>
          </div>
        ))}
      </div>
    </div>
  )
  }

  const SettingsWindow = () => {
    const wallpapers = [
      { name: "Ubuntu Wallpaper", path: "/assets/wallpapers/ubuntu-wallpaper.jpg" },
      { name: "Clouds", path: "/assets/wallpapers/clouds.jpg" },
      { name: "Valley", path: "/assets/wallpapers/valley.jpg" },
      { name: "South France", path: "/assets/wallpapers/south-france.jpg" },
      { name: "Mountain", path: "/assets/wallpapers/mountain.png" },
      { name: "Numbat Dark", path: "/assets/wallpapers/numbat-dark.png" },
      { name: "Numbat Light", path: "/assets/wallpapers/numbat-light.png" },
      { name: "Crown Dark", path: "/assets/wallpapers/crown-dark.png" },
      { name: "Crown Light", path: "/assets/wallpapers/crown-light.png" },
    ]

    const changeWallpaper = (wallpaperPath: string) => {
      setCurrentWallpaper(wallpaperPath)
      showNotification(`Wallpaper changed to ${wallpapers.find(w => w.path === wallpaperPath)?.name}`, 'success')
    }

    return (
    <div className="h-full bg-card p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6">System Settings</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Wallpaper</h3>
            <div className="grid grid-cols-3 gap-3">
              {wallpapers.map((wallpaper) => (
                <div
                  key={wallpaper.path}
                  className="relative cursor-pointer group"
                  onClick={() => changeWallpaper(wallpaper.path)}
                >
                  <img
                    src={wallpaper.path}
                    alt={wallpaper.name}
                    className="w-full h-20 object-cover rounded-lg border-2 border-transparent group-hover:border-orange-500 transition-colors"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-colors flex items-center justify-center">
                    <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {wallpaper.name}
                    </span>
                  </div>
                  {currentWallpaper === wallpaper.path && (
                    <div className="absolute top-1 right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-2">Display</h3>
          <p className="text-card-foreground text-sm">Resolution: 1920x1080</p>
          <p className="text-card-foreground text-sm">Theme: Ubuntu Default</p>
        </div>
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-2">System Info</h3>
          <p className="text-card-foreground text-sm">OS: Ubuntu 22.04 LTS</p>
          <p className="text-card-foreground text-sm">Kernel: 5.15.0-generic</p>
          <p className="text-card-foreground text-sm">Desktop: Portfolio Desktop</p>
        </div>
      </div>
    </div>
  )
  }

  const SoftwareCenterWindow = () => (
    <div className="h-full bg-card p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6">Software Center</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "Terminal", description: "Command line interface", icon: <Terminal className="w-8 h-8" /> },
          { name: "File Manager", description: "Browse and manage files", icon: <Folder className="w-8 h-8" /> },
          { name: "Text Editor", description: "Edit text files", icon: <FileText className="w-8 h-8" /> },
          { name: "Settings", description: "System preferences", icon: <Settings className="w-8 h-8" /> },
        ].map((app, index) => (
          <div key={index} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              {app.icon}
              <div>
                <h3 className="font-semibold text-foreground">{app.name}</h3>
                <p className="text-sm text-card-foreground">{app.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const HelpWindow = () => (
    <div className="h-full bg-card p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6">Help & Support</h2>
      <div className="space-y-4">
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-2">Getting Started</h3>
          <p className="text-card-foreground">Welcome to Ubuntu Portfolio Desktop! This is an interactive portfolio showcasing development projects.</p>
        </div>
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-2">Desktop Icons</h3>
          <p className="text-card-foreground">Double-click any desktop icon to open applications. Drag icons to reposition them.</p>
        </div>
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-2">Terminal Commands</h3>
          <p className="text-card-foreground">Open the Terminal and type 'help' to see available commands.</p>
        </div>
      </div>
    </div>
  )

  const FilesWindow = () => (
    <div className="h-full bg-card p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6">File Manager</h2>
      <div className="space-y-2">
        {[
          { name: "📁 Documents", type: "folder", size: "2.3 GB" },
          { name: "📁 Downloads", type: "folder", size: "1.1 GB" },
          { name: "📁 Pictures", type: "folder", size: "856 MB" },
          { name: "📁 Music", type: "folder", size: "3.2 GB" },
          { name: "📁 Videos", type: "folder", size: "12.4 GB" },
          { name: "📄 README.md", type: "file", size: "7.8 KB" },
          { name: "📄 portfolio.txt", type: "file", size: "1.2 KB" },
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer">
            <div className="flex items-center space-x-3">
              <span className="text-lg">{item.name}</span>
            </div>
            <span className="text-sm text-muted-foreground">{item.size}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const TrashWindow = () => (
    <div className="h-full bg-card p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6">Trash</h2>
      <div className="text-center py-12">
        <Trash2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-card-foreground">Trash is empty</p>
      </div>
    </div>
  )

  const CalculatorWindow = () => {
    const [display, setDisplay] = useState("0")
    const [previousValue, setPreviousValue] = useState<number | null>(null)
    const [operation, setOperation] = useState<string | null>(null)
    const [waitingForOperand, setWaitingForOperand] = useState(false)
    const [isScientific, setIsScientific] = useState(false)
    const [history, setHistory] = useState<string[]>([])
    const [memory, setMemory] = useState(0)
    const [angleMode, setAngleMode] = useState("DEG") // DEG or RAD

    const inputNumber = (num: string) => {
      if (waitingForOperand) {
        setDisplay(num)
        setWaitingForOperand(false)
      } else {
        setDisplay(display === "0" ? num : display + num)
      }
    }

    const inputOperation = (nextOperation: string) => {
      const inputValue = parseFloat(display)

      if (previousValue === null) {
        setPreviousValue(inputValue)
      } else if (operation) {
        const currentValue = previousValue || 0
        const newValue = calculate(currentValue, inputValue, operation)

        setDisplay(String(newValue))
        setPreviousValue(newValue)
      }

      setWaitingForOperand(true)
      setOperation(nextOperation)
    }

    const calculate = (firstValue: number, secondValue: number, operation: string): number => {
      let result = 0
      switch (operation) {
        case "+":
          result = firstValue + secondValue
          break
        case "-":
          result = firstValue - secondValue
          break
        case "×":
          result = firstValue * secondValue
          break
        case "÷":
          result = firstValue / secondValue
          break
        case "^":
          result = Math.pow(firstValue, secondValue)
          break
        case "√":
          result = Math.sqrt(firstValue)
          break
        case "sin":
          result = Math.sin(angleMode === "DEG" ? firstValue * Math.PI / 180 : firstValue)
          break
        case "cos":
          result = Math.cos(angleMode === "DEG" ? firstValue * Math.PI / 180 : firstValue)
          break
        case "tan":
          result = Math.tan(angleMode === "DEG" ? firstValue * Math.PI / 180 : firstValue)
          break
        case "log":
          result = Math.log10(firstValue)
          break
        case "ln":
          result = Math.log(firstValue)
          break
        case "!":
          result = factorial(firstValue)
          break
        default:
          result = secondValue
      }

      // Add to history
      const historyEntry = `${firstValue} ${operation} ${secondValue} = ${result}`
      setHistory(prev => [historyEntry, ...prev.slice(0, 9)]) // Keep last 10 entries

      return result
    }

    const factorial = (n: number) => {
      if (n < 0) return NaN
      if (n === 0 || n === 1) return 1
      let result = 1
      for (let i = 2; i <= n; i++) {
        result *= i
      }
      return result
    }

    const performCalculation = () => {
      const inputValue = parseFloat(display)

      if (previousValue !== null && operation) {
        const newValue = calculate(previousValue, inputValue, operation)
        setDisplay(String(newValue))
        setPreviousValue(null)
        setOperation(null)
        setWaitingForOperand(true)
      }
    }

    const clear = () => {
      setDisplay("0")
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(false)
    }

    const clearEntry = () => {
      setDisplay("0")
    }

    const backspace = () => {
      if (display.length > 1) {
        setDisplay(display.slice(0, -1))
      } else {
        setDisplay("0")
      }
    }

    const memoryClear = () => setMemory(0)
    const memoryRecall = () => setDisplay(String(memory))
    const memoryAdd = () => setMemory(memory + parseFloat(display))
    const memorySubtract = () => setMemory(memory - parseFloat(display))
    const memoryStore = () => setMemory(parseFloat(display))

    const toggleAngleMode = () => {
      setAngleMode(angleMode === "DEG" ? "RAD" : "DEG")
    }

    return (
      <div className="h-full bg-gray-100 flex">
        {/* Main Calculator */}
        <div className="flex-1 p-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Calculator</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsScientific(!isScientific)}
                  className={`px-3 py-1 rounded text-sm font-medium ${isScientific ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {isScientific ? "Scientific" : "Basic"}
                </button>
                <button
                  onClick={toggleAngleMode}
                  className="px-3 py-1 rounded text-sm font-medium bg-gray-200 text-gray-700"
                >
                  {angleMode}
                </button>
              </div>
            </div>

            {/* Display */}
            <div className="bg-gray-800 text-white text-right text-2xl font-mono p-4 rounded-lg mb-4 min-h-[80px] flex items-center justify-end shadow-inner">
              <div className="break-all">{display}</div>
            </div>

            {/* Memory Display */}
            {memory !== 0 && (
              <div className="text-sm text-gray-600 mb-2 text-center">
                Memory: {memory}
              </div>
            )}

            {/* Basic Calculator */}
            {!isScientific ? (
              <div className="grid grid-cols-4 gap-2">
                {/* Row 1 */}
                <button onClick={clear} className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  C
                </button>
                <button onClick={clearEntry} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  CE
                </button>
                <button onClick={backspace} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  ⌫
                </button>
                <button onClick={() => inputOperation("÷")} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  ÷
                </button>

                {/* Row 2 */}
                <button onClick={() => inputNumber("7")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors">
                  7
                </button>
                <button onClick={() => inputNumber("8")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors">
                  8
                </button>
                <button onClick={() => inputNumber("9")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors">
                  9
                </button>
                <button onClick={() => inputOperation("×")} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  ×
                </button>

                {/* Row 3 */}
                <button onClick={() => inputNumber("4")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors">
                  4
                </button>
                <button onClick={() => inputNumber("5")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors">
                  5
                </button>
                <button onClick={() => inputNumber("6")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors">
                  6
                </button>
                <button onClick={() => inputOperation("-")} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  -
                </button>

                {/* Row 4 */}
                <button onClick={() => inputNumber("1")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors">
                  1
                </button>
                <button onClick={() => inputNumber("2")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors">
                  2
                </button>
                <button onClick={() => inputNumber("3")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors">
                  3
                </button>
                <button onClick={() => inputOperation("+")} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  +
                </button>

                {/* Row 5 */}
                <button onClick={() => inputNumber("0")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors col-span-2">
                  0
                </button>
                <button onClick={() => setDisplay(display + ".")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors">
                  .
                </button>
                <button onClick={performCalculation} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  =
                </button>
              </div>
            ) : (
              /* Scientific Calculator */
              <div className="grid grid-cols-5 gap-2">
                {/* Row 1 - Scientific Functions */}
                <button onClick={() => { setDisplay(String(Math.sin(angleMode === "DEG" ? parseFloat(display) * Math.PI / 180 : parseFloat(display)))) }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  sin
                </button>
                <button onClick={() => { setDisplay(String(Math.cos(angleMode === "DEG" ? parseFloat(display) * Math.PI / 180 : parseFloat(display)))) }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  cos
                </button>
                <button onClick={() => { setDisplay(String(Math.tan(angleMode === "DEG" ? parseFloat(display) * Math.PI / 180 : parseFloat(display)))) }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  tan
                </button>
                <button onClick={() => { setDisplay(String(Math.log10(parseFloat(display)))) }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  log
                </button>
                <button onClick={() => { setDisplay(String(Math.log(parseFloat(display)))) }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  ln
                </button>

                {/* Row 2 - More Functions */}
                <button onClick={() => { setDisplay(String(Math.sqrt(parseFloat(display)))) }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  √
                </button>
                <button onClick={() => { setDisplay(String(Math.pow(parseFloat(display), 2))) }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  x²
                </button>
                <button onClick={() => { setDisplay(String(Math.pow(parseFloat(display), 3))) }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  x³
                </button>
                <button onClick={() => { setDisplay(String(factorial(parseFloat(display)))) }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  x!
                </button>
                <button onClick={() => { setDisplay(String(Math.pow(10, parseFloat(display)))) }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  10ˣ
                </button>

                {/* Row 3 - Constants and Operations */}
                <button onClick={() => setDisplay(String(Math.PI))} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  π
                </button>
                <button onClick={() => setDisplay(String(Math.E))} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  e
                </button>
                <button onClick={() => inputOperation("^")} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  xʸ
                </button>
                <button onClick={() => { setDisplay(String(1 / parseFloat(display))) }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  1/x
                </button>
                <button onClick={() => { setDisplay(String(Math.abs(parseFloat(display)))) }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  |x|
                </button>

                {/* Row 4 - Memory Functions */}
                <button onClick={memoryClear} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  MC
                </button>
                <button onClick={memoryRecall} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  MR
                </button>
                <button onClick={memoryAdd} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  M+
                </button>
                <button onClick={memorySubtract} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  M-
                </button>
                <button onClick={memoryStore} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  MS
                </button>

                {/* Row 5 - Basic Operations */}
                <button onClick={clear} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  C
                </button>
                <button onClick={clearEntry} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  CE
                </button>
                <button onClick={backspace} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  ⌫
                </button>
                <button onClick={() => inputOperation("÷")} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  ÷
                </button>
                <button onClick={() => inputOperation("×")} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  ×
                </button>

                {/* Row 6 - Numbers */}
                <button onClick={() => inputNumber("7")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  7
                </button>
                <button onClick={() => inputNumber("8")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  8
                </button>
                <button onClick={() => inputNumber("9")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  9
                </button>
                <button onClick={() => inputOperation("-")} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  -
                </button>
                <button onClick={() => inputOperation("+")} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  +
                </button>

                {/* Row 7 - More Numbers */}
                <button onClick={() => inputNumber("4")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  4
                </button>
                <button onClick={() => inputNumber("5")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  5
                </button>
                <button onClick={() => inputNumber("6")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  6
                </button>
                <button onClick={() => setDisplay(display + ".")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  .
                </button>
                <button onClick={() => { setDisplay(String(-parseFloat(display))) }} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  ±
                </button>

                {/* Row 8 - Final Row */}
                <button onClick={() => inputNumber("1")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  1
                </button>
                <button onClick={() => inputNumber("2")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  2
                </button>
                <button onClick={() => inputNumber("3")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  3
                </button>
                <button onClick={() => inputNumber("0")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  0
                </button>
                <button onClick={performCalculation} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                  =
                </button>
              </div>
            )}
          </div>
        </div>

        {/* History Panel */}
        <div className="w-64 bg-gray-200 border-l border-gray-300 p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">History</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm">No calculations yet</p>
            ) : (
              history.map((entry, index) => (
                <div key={index} className="bg-white p-2 rounded text-sm font-mono text-gray-700">
                  {entry}
                </div>
              ))
            )}
          </div>
          {history.length > 0 && (
            <button
              onClick={() => setHistory([])}
              className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm"
            >
              Clear History
            </button>
          )}
        </div>
      </div>
    )
  }

  const MusicPlayerWindow = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [volume, setVolume] = useState(50)
    const [currentTrack, setCurrentTrack] = useState(0)
    const [currentPlaylist, setCurrentPlaylist] = useState("favorites")
    const [isShuffled, setIsShuffled] = useState(false)
    const [isRepeated, setIsRepeated] = useState(false)
    const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null)
    const [spotifyEmbed, setSpotifyEmbed] = useState(true)

    const playlists = {
      favorites: {
        name: "Build Inc.",
        description: "The worst thing you can do is know what you need to do and not do it",
        tracks: [
          { id: 1, title: "Father Stretch My Hands Pt. 1", artist: "Kanye West", duration: "2:15", album: "The Life of Pablo", year: "2016", cover: "🎵", audioUrl: "https://www.bensound.com/bensound-music/bensound-sunny.mp3" },
          { id: 2, title: "Heartless", artist: "Kanye West", duration: "3:31", album: "808s & Heartbreak", year: "2008", cover: "🎵", audioUrl: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3" },
          { id: 3, title: "Flashing Lights", artist: "Kanye West, Dwele", duration: "3:57", album: "Graduation", year: "2007", cover: "🎵", audioUrl: "https://www.bensound.com/bensound-music/bensound-happiness.mp3" },
          { id: 4, title: "I Wonder", artist: "Kanye West", duration: "4:03", album: "Graduation", year: "2007", cover: "🎵", audioUrl: "https://www.bensound.com/bensound-music/bensound-energy.mp3" },
          { id: 5, title: "Good Life", artist: "Kanye West, T-Pain", duration: "3:27", album: "Graduation", year: "2007", cover: "🎵", audioUrl: "https://www.bensound.com/bensound-music/bensound-dreams.mp3" },
          { id: 6, title: "Skyfall", artist: "Adele", duration: "4:46", album: "Skyfall", year: "2012", cover: "🎵", audioUrl: "https://www.bensound.com/bensound-music/bensound-sweet.mp3" },
          { id: 7, title: "Happy Nation - 2015 Remastered", artist: "Ace of Base", duration: "4:16", album: "Happy Nation", year: "2015", cover: "🎵", audioUrl: "https://www.bensound.com/bensound-music/bensound-epic.mp3" }
        ]
      },
      topHits: {
        name: "Top Hits",
        description: "Popular songs right now",
        tracks: [
          { id: 9, title: "Blinding Lights", artist: "The Weeknd", duration: "3:20", album: "After Hours", year: "2020", cover: "🎵", audioUrl: "https://www.bensound.com/bensound-music/bensound-sunny.mp3" },
          { id: 10, title: "Levitating", artist: "Dua Lipa", duration: "3:23", album: "Future Nostalgia", year: "2020", cover: "🎵", audioUrl: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3" },
          { id: 11, title: "Watermelon Sugar", artist: "Harry Styles", duration: "2:54", album: "Fine Line", year: "2019", cover: "🎵", audioUrl: "https://www.bensound.com/bensound-music/bensound-happiness.mp3" },
          { id: 12, title: "Good 4 U", artist: "Olivia Rodrigo", duration: "2:58", album: "SOUR", year: "2021", cover: "🎵", audioUrl: "https://www.bensound.com/bensound-music/bensound-energy.mp3" }
        ]
      },
      classics: {
        name: "Classics",
        description: "Timeless favorites",
        tracks: [
          { id: 13, title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55", album: "A Night at the Opera", year: "1975", cover: "🎵", audioUrl: "https://www.bensound.com/bensound-music/bensound-dreams.mp3" },
          { id: 14, title: "Hotel California", artist: "Eagles", duration: "6:30", album: "Hotel California", year: "1976", cover: "🎵", audioUrl: "https://www.bensound.com/bensound-music/bensound-sweet.mp3" },
          { id: 15, title: "Imagine", artist: "John Lennon", duration: "3:07", album: "Imagine", year: "1971", cover: "🎵", audioUrl: "https://www.bensound.com/bensound-music/bensound-epic.mp3" }
        ]
      }
    }

    const currentTracks = playlists[currentPlaylist as keyof typeof playlists].tracks
    const currentSong = currentTracks[currentTrack]

    // Audio functionality
    useEffect(() => {
      if (audioRef) {
        audioRef.volume = volume / 100
        audioRef.addEventListener('timeupdate', () => {
          setCurrentTime(audioRef.currentTime)
        })
        audioRef.addEventListener('ended', () => {
          if (isRepeated) {
            audioRef.currentTime = 0
            audioRef.play()
          } else {
            nextTrack()
          }
        })
      }
    }, [audioRef, volume, isRepeated])

    useEffect(() => {
      if (audioRef && currentSong) {
        audioRef.src = currentSong.audioUrl
        if (isPlaying) {
          audioRef.play()
        }
      }
    }, [currentSong, audioRef])


    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const parseDuration = (duration: string) => {
      const [mins, secs] = duration.split(':').map(Number)
      return mins * 60 + secs
    }

    const nextTrack = () => {
      if (currentTrack < currentTracks.length - 1) {
        setCurrentTrack(currentTrack + 1)
        setCurrentTime(0)
      }
    }

    const prevTrack = () => {
      if (currentTrack > 0) {
        setCurrentTrack(currentTrack - 1)
        setCurrentTime(0)
      }
    }

    const togglePlay = () => {
      if (audioRef) {
        if (isPlaying) {
          audioRef.pause()
        } else {
          audioRef.play()
        }
        setIsPlaying(!isPlaying)
      }
    }

    const handleTrackClick = (index: number) => {
      setCurrentTrack(index)
      setIsPlaying(true)
      setCurrentTime(0)
      if (audioRef) {
        audioRef.currentTime = 0
        audioRef.play()
      }
    }

    return (
      <div className="w-full h-full bg-black">
        <iframe
          title="Spotify Embed: Build Inc. Playlist"
          src="https://open.spotify.com/embed/playlist/6pEbErhMyNati1TEcZ8jsz?utm_source=generator&theme=0"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-lg"
        />
      </div>
    )
  }

  const FirefoxWindow = () => {
    const [currentUrl, setCurrentUrl] = useState("https://www.google.com")
    const [urlInput, setUrlInput] = useState("https://www.google.com")
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState(1)
    const [tabs, setTabs] = useState([
      { id: 1, title: "Google", url: "https://www.google.com", active: true },
      { id: 2, title: "New Tab", url: "about:blank", active: false }
    ])
    const [searchQuery, setSearchQuery] = useState("")
    const [bookmarks, setBookmarks] = useState([
      { title: "Google", url: "https://www.google.com", favicon: "🔍" },
      { title: "GitHub", url: "https://github.com", favicon: "🐙" },
      { title: "Stack Overflow", url: "https://stackoverflow.com", favicon: "📚" },
      { title: "MDN Web Docs", url: "https://developer.mozilla.org", favicon: "🌐" },
      { title: "Ubuntu", url: "https://ubuntu.com", favicon: "🐧" }
    ])
    const [showBookmarks, setShowBookmarks] = useState(false)

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (searchQuery.trim()) {
        setIsLoading(true)
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`
        setCurrentUrl(searchUrl)
        setUrlInput(searchUrl)
        setTimeout(() => setIsLoading(false), 1000)
      }
    }

    const handleUrlSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)

      // Check if it's a URL or search query
      let targetUrl = urlInput
      if (!urlInput.startsWith('http://') && !urlInput.startsWith('https://') && !urlInput.includes('.')) {
        // It's a search query, redirect to Google search
        targetUrl = `https://www.google.com/search?q=${encodeURIComponent(urlInput)}`
      } else if (!urlInput.startsWith('http://') && !urlInput.startsWith('https://')) {
        // Add https:// if missing
        targetUrl = `https://${urlInput}`
      }

      setCurrentUrl(targetUrl)
      setUrlInput(targetUrl)
      setTimeout(() => setIsLoading(false), 1000)
    }

    const navigateTo = (url: string, title: string) => {
      setIsLoading(true)
      setCurrentUrl(url)
      setUrlInput(url)
      // Update active tab
      setTabs(tabs.map(tab => ({ ...tab, active: tab.url === url })))
      setTimeout(() => setIsLoading(false), 1000)
    }

    const addNewTab = () => {
      const newTab = { id: Date.now(), title: "New Tab", url: "about:blank", active: true }
      setTabs([...tabs.map(tab => ({ ...tab, active: false })), newTab])
      setCurrentUrl("about:blank")
      setUrlInput("about:blank")
    }

    const closeTab = (tabId: number) => {
      if (tabs.length > 1) {
        const newTabs = tabs.filter(tab => tab.id !== tabId)
        const activeTab = newTabs.find(tab => tab.active) || newTabs[0]
        setTabs(newTabs.map(tab => ({ ...tab, active: tab.id === activeTab.id })))
        setCurrentUrl(activeTab.url)
        setUrlInput(activeTab.url)
      }
    }

    return (
      <div className="w-full h-full bg-white flex flex-col">
        {/* Firefox Title Bar */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 p-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/assets/program-icons/firefox.png" alt="Firefox" className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700">Firefox</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 flex items-center justify-center"
              onClick={() => minimizeWindow("firefox")}
              title="Minimize"
            >
              <Minus className="w-2 h-2 text-white" />
            </button>
            <button
              className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 flex items-center justify-center"
              onClick={() => maximizeWindow("firefox")}
              title="Maximize"
            >
              <Square className="w-2 h-2 text-white" />
            </button>
            <button
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 flex items-center justify-center"
              onClick={() => closeWindow("firefox")}
              title="Close"
            >
              <X className="w-2 h-2 text-white" />
            </button>
          </div>
        </div>

        {/* Firefox Toolbar */}
        <div className="bg-gray-50 border-b border-gray-200 p-2">
          <div className="flex items-center space-x-2">
            {/* Navigation buttons */}
            <div className="flex space-x-1">
              <button
                onClick={() => navigateTo("https://www.google.com", "Google")}
                className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800"
                title="Back"
              >
                ←
              </button>
              <button
                onClick={() => navigateTo("https://www.google.com", "Google")}
                className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800"
                title="Forward"
              >
                →
              </button>
              <button
                onClick={() => navigateTo(currentUrl, "Refresh")}
                className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800"
                title="Refresh"
              >
                ↻
              </button>
            </div>

            {/* URL Bar */}
            <form onSubmit={handleUrlSubmit} className="flex-1 flex">
              <div className="flex-1 flex items-center bg-white border border-gray-300 rounded-md px-3 py-1">
                <div className="w-4 h-4 mr-2">
                  {currentUrl.includes("https") ? (
                    <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">🔒</span>
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
                  placeholder="Search or enter address"
                />
              </div>
            </form>

            {/* Firefox Menu */}
            <div className="flex space-x-1">
              <button
                onClick={() => {
                  const newBookmark = { title: urlInput, url: currentUrl, favicon: "⭐" }
                  setBookmarks(prev => [...prev, newBookmark])
                }}
                className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800"
                title="Bookmark this page"
              >
                ⭐
              </button>
              <button
                onClick={() => setShowBookmarks(!showBookmarks)}
                className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800"
                title="Bookmarks"
              >
                📚
              </button>
              <button className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800">
                ⋮
              </button>
            </div>
          </div>
        </div>

        {/* Bookmarks Bar */}
        {showBookmarks && (
          <div className="bg-gray-100 border-b border-gray-200 p-2">
            <div className="flex space-x-2">
              {bookmarks.map((bookmark, index) => (
                <button
                  key={index}
                  onClick={() => navigateTo(bookmark.url, bookmark.title)}
                  className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-sm"
                >
                  <span>{bookmark.favicon}</span>
                  <span>{bookmark.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab Bar */}
        <div className="bg-gray-100 border-b border-gray-200 flex items-center px-2">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center px-3 py-2 mr-1 rounded-t-md cursor-pointer ${tab.active ? 'bg-white border-t border-l border-r border-gray-300' : 'hover:bg-gray-200'
                }`}
              onClick={() => {
                setCurrentUrl(tab.url)
                setUrlInput(tab.url)
                setTabs(tabs.map(t => ({ ...t, active: t.id === tab.id })))
              }}
            >
              <span className="text-xs text-gray-700 mr-2 truncate max-w-20">{tab.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  closeTab(tab.id)
                }}
                className="text-gray-400 hover:text-gray-600 text-xs"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={addNewTab}
            className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 ml-1"
            title="New Tab"
          >
            +
          </button>
        </div>

        {/* Browser Content */}
        <div className="flex-1 bg-white overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          ) : (
            <div className="h-full p-4 overflow-y-auto">
              {currentUrl.includes("google.com") ? (
                <div className="text-center">
                  <img src="/assets/program-icons/firefox.png" alt="Firefox" className="w-16 h-16 mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-gray-800 mb-4">Firefox Web Browser</h1>
                  <div className="max-w-md mx-auto">
                    <div className="mb-4">
                      <form onSubmit={handleSearchSubmit}>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search Google or type a URL"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800"
                        />
                      </form>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => navigateTo("https://github.com", "GitHub")}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="text-lg mb-2">🐙</div>
                        <div className="text-sm font-medium text-gray-800">GitHub</div>
                      </button>
                      <button
                        onClick={() => navigateTo("https://stackoverflow.com", "Stack Overflow")}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="text-lg mb-2">📚</div>
                        <div className="text-sm font-medium text-gray-800">Stack Overflow</div>
                      </button>
                      <button
                        onClick={() => navigateTo("https://developer.mozilla.org", "MDN Web Docs")}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="text-lg mb-2">🌐</div>
                        <div className="text-sm font-medium text-gray-800">MDN Web Docs</div>
                      </button>
                      <button
                        onClick={() => navigateTo("https://ubuntu.com", "Ubuntu")}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="text-lg mb-2">🐧</div>
                        <div className="text-sm font-medium text-gray-800">Ubuntu</div>
                      </button>
                    </div>
                  </div>
                </div>
              ) : currentUrl.includes("google.com/search") ? (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl">🔍</span>
                  </div>
                  <h1 className="text-2xl font-bold mb-4">Google Search Results</h1>
                  <p className="text-gray-600 mb-4">Search results for: "{urlInput.split('q=')[1]?.replace(/\+/g, ' ') || 'your query'}"</p>
                  <div className="bg-gray-50 p-4 rounded-lg text-left">
                    <h3 className="font-semibold mb-2">Search Results</h3>
                    <div className="space-y-3">
                      <div className="border-l-4 border-blue-500 pl-3">
                        <h4 className="font-medium text-blue-600">Example Result 1</h4>
                        <p className="text-sm text-gray-600">This is a sample search result that would appear in a real Google search...</p>
                        <p className="text-xs text-green-600">https://example.com</p>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-3">
                        <h4 className="font-medium text-blue-600">Example Result 2</h4>
                        <p className="text-sm text-gray-600">Another sample search result with relevant information...</p>
                        <p className="text-xs text-green-600">https://another-example.com</p>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-3">
                        <h4 className="font-medium text-blue-600">Example Result 3</h4>
                        <p className="text-sm text-gray-600">More search results would appear here in a real browser...</p>
                        <p className="text-xs text-green-600">https://more-examples.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : currentUrl.includes("github.com") ? (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl">🐙</span>
                  </div>
                  <h1 className="text-2xl font-bold mb-4">GitHub</h1>
                  <p className="text-gray-600 mb-4">Welcome to GitHub! This is a simulated browser experience.</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Popular Repositories</h3>
                    <div className="space-y-2 text-left">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-sm">microsoft/vscode</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-sm">facebook/react</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-sm">vercel/next.js</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : currentUrl.includes("stackoverflow.com") ? (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl">📚</span>
                  </div>
                  <h1 className="text-2xl font-bold mb-4">Stack Overflow</h1>
                  <p className="text-gray-600 mb-4">The world's largest developer community.</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Popular Questions</h3>
                    <div className="space-y-2 text-left">
                      <div className="text-sm">How to center a div in CSS?</div>
                      <div className="text-sm">What is the difference between let and var in JavaScript?</div>
                      <div className="text-sm">How to install npm packages?</div>
                    </div>
                  </div>
                </div>
              ) : currentUrl.includes("developer.mozilla.org") ? (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl">🌐</span>
                  </div>
                  <h1 className="text-2xl font-bold mb-4">MDN Web Docs</h1>
                  <p className="text-gray-600 mb-4">Resources for developers, by developers.</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Web Technologies</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="bg-blue-100 px-2 py-1 rounded">HTML</span>
                      <span className="bg-blue-100 px-2 py-1 rounded">CSS</span>
                      <span className="bg-blue-100 px-2 py-1 rounded">JavaScript</span>
                      <span className="bg-blue-100 px-2 py-1 rounded">React</span>
                    </div>
                  </div>
                </div>
              ) : currentUrl.includes("ubuntu.com") ? (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl">🐧</span>
                  </div>
                  <h1 className="text-2xl font-bold mb-4">Ubuntu</h1>
                  <p className="text-gray-600 mb-4">The world's most popular open source operating system.</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Ubuntu Features</h3>
                    <div className="space-y-2 text-left">
                      <div className="text-sm">• Free and open source</div>
                      <div className="text-sm">• Secure and reliable</div>
                      <div className="text-sm">• Easy to use</div>
                      <div className="text-sm">• Great for developers</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-400 rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl">🌐</span>
                  </div>
                  <h1 className="text-2xl font-bold mb-4">New Tab</h1>
                  <p className="text-gray-600">Start browsing by entering a URL or searching.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
  const ImageViewerWindow = () => {
    const [currentImage, setCurrentImage] = useState(0)
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
      "/assets/wallpapers/lightbulb.png"
    ]

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
                onClick={() => setCurrentImage(Math.min(images.length - 1, currentImage + 1))}
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
                className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${index === currentImage ? 'border-orange-500' : 'border-gray-600'
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
    )
  }

  const ProjectDetailWindow = ({ project }: { project: string }) => {
    const projectDetails = {
      ecommerce: {
        title: "E-commerce Platform",
        description: "A full-featured e-commerce solution built with modern web technologies",
        features: [
          "User authentication and authorization",
          "Product catalog with search and filtering",
          "Shopping cart and checkout process",
          "Payment integration with Stripe",
          "Admin dashboard for inventory management",
          "Order tracking and history",
          "Responsive design for all devices",
        ],
        tech: ["React", "Node.js", "MongoDB", "Stripe API", "JWT", "Express.js"],
        status: "Production Ready",
        github: "https://github.com/ubuntu-developer/ecommerce-platform",
        demo: "https://ecommerce-demo.ubuntu-portfolio.dev",
      },
      taskmanager: {
        title: "Task Management App",
        description: "Collaborative task management application with real-time updates",
        features: [
          "Real-time collaboration with Socket.io",
          "Project and task organization",
          "Team member assignment",
          "Progress tracking and analytics",
          "File attachments and comments",
          "Deadline notifications",
          "Kanban board interface",
        ],
        tech: ["Next.js", "Socket.io", "PostgreSQL", "Prisma", "TypeScript"],
        status: "In Development",
        github: "https://github.com/ubuntu-developer/task-manager",
        demo: "https://tasks-demo.ubuntu-portfolio.dev",
      },
      apigateway: {
        title: "API Gateway",
        description: "Microservices API gateway with advanced features",
        features: [
          "Request routing and load balancing",
          "Authentication and authorization",
          "Rate limiting and throttling",
          "Request/response transformation",
          "Monitoring and analytics",
          "Circuit breaker pattern",
          "Docker containerization",
        ],
        tech: ["Express.js", "Redis", "JWT", "Docker", "Nginx", "Prometheus"],
        status: "Production Ready",
        github: "https://github.com/ubuntu-developer/api-gateway",
        demo: "https://api-gateway-demo.ubuntu-portfolio.dev",
      },
      portfolio: {
        title: "Ubuntu Portfolio Website",
        description: "Interactive Ubuntu desktop simulation as a portfolio website",
        features: [
          "Full Ubuntu desktop simulation",
          "Draggable windows and icons",
          "Working terminal with commands",
          "Responsive design",
          "Project showcases",
          "Contact integration",
          "Loading screen animation",
        ],
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Lucide Icons"],
        status: "Live",
        github: "https://github.com/ubuntu-developer/portfolio",
        demo: "https://ubuntu-portfolio.dev",
      },
    }

    const details = projectDetails[project as keyof typeof projectDetails]

    return (
      <div className="h-full bg-card p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">{details.title}</h2>
            <p className="text-card-foreground text-lg">{details.description}</p>
            <div className="mt-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${details.status === "Production Ready" || details.status === "Live"
                    ? "bg-chart-3/20 text-chart-3"
                    : "bg-chart-5/20 text-chart-5"
                }`}
              >
                {details.status}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Key Features</h3>
              <ul className="space-y-2">
                {details.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-chart-3 mr-2">✓</span>
                    <span className="text-card-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {details.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-chart-2/20 text-chart-2 text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Demo
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Github className="w-4 h-4 mr-2" />
                  View Source Code
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">System Error</h2>
          <p className="text-red-200 mb-4">Ubuntu Portfolio encountered an error</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-white text-red-800 hover:bg-red-100"
          >
            Restart System
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-gradient-to-br from-purple-900 via-purple-800 to-orange-600">
      {/* Desktop Wallpaper */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentWallpaper})` }} />

      {/* Ubuntu Top Panel - Authentic Ubuntu Style */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#2C2C2C] to-[#1A1A1A] backdrop-blur-md text-white px-4 py-2 flex items-center justify-between z-50 h-12 border-b border-gray-600/30">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 h-8 px-3 rounded-md transition-all duration-200"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm font-medium">Activities</span>
            </div>
          </Button>
          <div className="h-6 w-px bg-gray-600"></div>
          <div className="text-sm font-medium text-gray-200">Portfolio Desktop</div>
        </div>

        <div className="flex items-center space-x-4">
          {/* System indicators */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-300">Online</span>
          </div>

          {/* Time display */}
          <div className="text-sm text-white font-mono bg-black/20 px-3 py-1 rounded-md">
            {isClient ? currentTime : "--:--:--"}
          </div>

          {/* System menu */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 h-8 w-8 rounded-md transition-all duration-200"
            onClick={() => openWindow("settings", "Settings", <SettingsWindow />)}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Ubuntu Sidebar - Authentic Ubuntu Dock */}
      <div className="absolute left-0 top-12 bottom-12 w-20 bg-gradient-to-b from-gray-900/80 to-black/90 backdrop-blur-xl border-r border-gray-700/50 z-40 shadow-2xl">
        <div className="flex flex-col items-center py-4 space-y-3">
          {sidebarIcons.map((icon, index) => (
            <div
              key={icon.id}
              className="w-14 h-14 flex items-center justify-center rounded-2xl hover:bg-orange-500/20 transition-all duration-300 cursor-pointer group hover:scale-105 relative"
              onClick={() => {
                playClickSound()
                icon.action()
              }}
              title={icon.name}
            >
              {/* Active indicator */}
              <div className="absolute -left-1 w-1 h-10 bg-orange-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Icon with glow effect */}
              <div className="group-hover:drop-shadow-xl transition-all duration-300 group-hover:brightness-125">
                {icon.icon}
              </div>

              {/* Tooltip */}
              <div className="absolute left-20 bg-gray-900/95 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg border border-gray-700">
                {icon.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute inset-0 p-4" style={{ paddingTop: "64px", paddingBottom: "64px", paddingLeft: "100px" }}>
        {memoizedDesktopIcons.map((icon) => (
          <div
            key={icon.id}
            className={`absolute cursor-pointer select-none ${draggedIcon === icon.id ? "opacity-50" : ""}`}
            style={{
              left: icon.position.x,
              top: icon.position.y,
            }}
            onMouseDown={(e) => {
              playClickSound()
              handleIconMouseDown(e, icon.id)
            }}
            onDoubleClick={icon.action}
          >
            <div className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-all duration-300 w-24 ${draggedIcon === icon.id
              ? "bg-white/20 scale-110 shadow-2xl backdrop-blur-sm"
              : "hover:bg-white/10 hover:scale-105 hover:shadow-lg"
              }`}>
              <div className="drop-shadow-lg w-12 h-12 flex items-center justify-center">
              {icon.icon}
              </div>
              <span className="text-white text-xs text-center w-full truncate font-medium drop-shadow-md leading-tight">{icon.name}</span>
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
              className="bg-gradient-to-r from-gray-200 to-gray-300 border-b border-gray-400 px-4 py-3 flex items-center justify-between cursor-move select-none shadow-sm"
              onMouseDown={(e) => handleWindowMouseDown(e, window.id)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-semibold text-gray-800">{window.title}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  className="w-4 h-4 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    minimizeWindow(window.id)
                  }}
                  title="Minimize"
                  aria-label="Minimize window"
                >
                  <Minus className="w-3 h-3 text-white" />
                </button>
                <button
                  className="w-4 h-4 bg-green-500 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Toggle maximize/restore functionality
                    if (window.isMaximized) {
                      restoreWindow(window.id)
                    } else {
                      maximizeWindow(window.id)
                    }
                  }}
                  title={window.isMaximized ? "Restore" : "Maximize"}
                  aria-label={window.isMaximized ? "Restore window" : "Maximize window"}
                >
                  <Square className="w-3 h-3 text-white" />
                </button>
                <button
                  className="w-4 h-4 bg-red-500 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    closeWindow(window.id)
                  }}
                  title="Close"
                  aria-label="Close window"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>

            {/* Window Content */}
            <div className="h-full bg-white" style={{ height: "calc(100% - 40px)" }}>
              {window.component}
            </div>
          </div>
        ))}

      {/* Ubuntu Bottom Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#2C2C2C] to-[#1A1A1A] backdrop-blur-lg text-white px-4 py-2 flex items-center justify-between z-50 h-12 border-t border-gray-600/30 shadow-2xl">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-200"
          >
        <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-[#E95420] to-[#F7A072] rounded-md flex items-center justify-center">
                <span className="text-xs font-bold text-white">U</span>
            </div>
              <span className="text-sm font-medium">Show Applications</span>
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
                className={`text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-200 ${window.isMinimized
                  ? "opacity-60 bg-white/5"
                  : "bg-white/10 shadow-md"
                  }`}
              onClick={() => (window.isMinimized ? restoreWindow(window.id) : bringToFront(window.id))}
            >
                <span className="text-sm font-medium">{window.title}</span>
            </Button>
          ))}
        </div>
        </div>

        {/* System tray */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-300">Connected</span>
        </div>
      </div>

      {/* Ubuntu-style Notifications */}
      <div className="fixed top-16 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white/95 backdrop-blur-md rounded-lg shadow-lg border-l-4 px-4 py-3 max-w-sm transform transition-all duration-300 ${notification.type === 'error' ? 'border-red-500' :
              notification.type === 'warning' ? 'border-yellow-500' :
                notification.type === 'success' ? 'border-green-500' :
                  'border-blue-500'
              }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${notification.type === 'error' ? 'bg-red-500' :
                notification.type === 'warning' ? 'bg-yellow-500' :
                  notification.type === 'success' ? 'bg-green-500' :
                    'bg-blue-500'
                }`}></div>
              <span className="text-sm font-medium text-gray-800">{notification.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
