"use client"

import React, { useState, useRef, useEffect } from "react"

interface TerminalComponentProps {
    onClose: () => void
}

const TerminalComponent: React.FC<TerminalComponentProps> = ({ onClose }) => {
    const [terminalHistory, setTerminalHistory] = useState<string[]>([])
    const [currentCommand, setCurrentCommand] = useState("")
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [isTyping, setIsTyping] = useState(false)
    const [passwordMode, setPasswordMode] = useState(false)
    const [password, setPassword] = useState("")
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false)
    const [cursorPosition, setCursorPosition] = useState(0)
    const terminalRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const cursorRef = useRef<HTMLDivElement>(null)
    const didInitRef = useRef(false)

    const secretPassword = "Banger"
    const git = commandHistory.length

    // ASCII Art Banner
    const banner = [
        '<span class="index">Tanay Vasishtha (TV) Not A Corporation. All rights reserved.</span>',
        "",
        " /*",
        "  *    ⣿⣿⣿⣿⠀⢸⣿⡇⠀⢸⣿⣿⣿⣿     _________  ________  ________   ________      ___    ___      ___      ___ ________  ________  ___  ________  ___  ___  _________  ___  ___  ________         ",
        "  *    ⣇⣀⠀⠀⠀⢀⣀⣀⠀⠀⠀⠉⠻⣿    |\\___   ___\\\\   __  \\|\\   ___  \\|\\   __  \\    |\\  \\  /  /|    |\\  \\    /  /|\\   __  \\|\\   ____\\|\\  \\|\\   ____\\|\\  \\|\\  \\|\\___   ___\\\\  \\|\\  \\|\\   __  \\        ",
        "  *    ⣿⣿⡇⠀⠀⢸⣿⣿⣿⣷⠀⠀⠀⣿    \\|___ \\  \\_\\ \\  \\|\\  \\ \\  \\\\ \\  \\ \\  \\|\\  \\   \\ \\  \\/  / /    \\ \\  \\  /  / | \\  \\|\\  \\ \\  \\___|\\ \\  \\ \\  \\___|\\ \\  \\\\\\  \\|___ \\  \\_\\ \\  \\\\\\  \\ \\  \\|\\  \\       ",
        "  *    ⣿⣿⡇⠀⠀⢸⣿⣿⡿⠟⠀⠀⣠⣿         \\ \\  \\ \\ \\   __  \\ \\  \\\\ \\  \\ \\   __  \\   \\ \\    / /      \\ \\  \\/  / / \\ \\   __  \\ \\_____  \\ \\  \\ \\_____  \\ \\   __  \\   \\ \\  \\ \\ \\   __  \\ \\   __  \\      ",
        "  *    ⣿⣿⡇⠀⠀⢀⣀⣀⣀⠀⠀⠚⠻⣿          \\ \\  \\ \\ \\  \\ \\  \\ \\  \\\\ \\  \\ \\  \\ \\  \\   \\/  /  /        \\ \\    / /   \\ \\  \\ \\  \\|____|\\  \\ \\  \\|____|\\  \\ \\  \\ \\  \\   \\ \\  \\ \\ \\  \\ \\  \\ \\  \\ \\  \\     ",
        "  *    ⣿⣿⡇⠀⠀⢸⣿⣿⣿⣿⡄⠀⠀⠘           \\ \\__\\ \\ \\__\\ \\__\\ \\__\\\\ \\__\\ \\__\\ \\__\\__/  / /           \\ \\__/ /     \\ \\__\\ \\__\\____\\_\\  \\ \\__\\____\\_\\  \\ \\__\\ \\__\\   \\ \\__\\ \\ \\__\\ \\__\\ \\__\\ \\__\\    ",
        "  *    ⣿⣿⡇⠀⠀⢸⣿⣿⣿⣿⠃⠀⠀⠀            \\|__|  \\|__|\\|__|\\|__| \\|__|\\|__|\\|__|\\___/ /             \\|__|/       \\|__|\\|__|\\_________\\|__|\\_________\\|__|\\|__|    \\|__|  \\|__|\\|__|\\|__|\\|__|    ",
        "  *    ⡏⠉⠀⠀⠀⠈⠉⠉⠁⠀⠀⣀⣤⣾                                                 \\|___|/                                    \\|_________|   \\|_________|                                            ",
        "  *    ⣿⣿⣿⣿⠀⢸⣿⡇⠀⢸⣿⣿⣿⣿                                                                                                                                                                   ",
        "  *                                                                                                                                                             @2025      ",
        "  */",
        "",

        '<span class="color2">Welcome to my interactive web terminal.</span>',
        '<span class="color2">For a list of available commands, type</span> <span class="command">\'help\'</span><span class="color2">.</span>',
    ]

    const whois = [
        "<br>",
        "Hey, I'm Tanay!👋",
        "I'm a full-stack developer and browser extension creator, who builds engaging websites like this one",
        "and creates innovative browser extensions that solve real-world problems.",
        "With expertise in React, Node.js, Python, TypeScript, and browser APIs, I specialize in",
        "building scalable web applications, browser extensions, and mobile solutions.",
        "I'm the creator of popular browser extensions like Dark Mode Bang, Volume Bang, and Speed Bang,",
        "which have helped thousands of users improve their browsing experience.",
        "I'm passionate about creating user-friendly interfaces and browser tools",
        "that solve complex problems with elegant solutions.",
        "When I'm not coding, you'll find me exploring new technologies,",
        "contributing to open-source projects, or working on my organization SynthraLabs.",
        "This terminal website is just one example of my creative approach",
        "to showcasing technical skills and personality.",
        "<br>"
    ]

    const whoami = [
        "<br>",
        "The paradox of 'Who am I?' is: we never know, but, we constantly find out.",
        "I am a developer, a problem-solver, and a lifelong learner.",
        "<br>"
    ]

    const social = [
        "<br>",
        'github         <a href="https://github.com/tanayvasishtha" target="_blank">github/tanayvasishtha' + "</a>",
        'linkedin       <a href="https://linkedin.com/in/tanayvasishtha" target="_blank">linkedin/tanayvasishtha' + '</a>',
        'twitter        <a href="https://twitter.com/tanayvasishtha" target="_blank">twitter/tanayvasishtha' + '</a>',
        'email          <a href="mailto:edgepersonal2004@example.com">edgepersonal2004@example.com</a>',
        "<br>"
    ]

    const secret = [
        "<br>",
        '<span class="command">sudo</span>           Only use if you\'re admin',
        '<span class="command">ai</span>            Ask the AI assistant',
        '<span class="command">matrix</span>        Enter the Matrix',
        '<span class="command">hack</span>          Hacker mode activated',
        "<br>"
    ]

    const projects = [
        "<br>",
        "🌙 Dark Mode Bang - Chrome & Firefox extension for instant dark mode",
        "🔊 Volume Bang - Browser extension for instant volume control",
        "⚡ Speed Bang - Performance optimization extension",
        "📱 WeLoveQR - QR code generator and scanner web app",
        "🏢 SynthraLabs - Organization and project management platform",
        "💻 Ubuntu Portfolio - This interactive terminal experience",
        "🎯 Debtrix - Financial management and debt tracking app",
        "🤖 AI/ML Projects - Machine learning and automation tools",
        "<br>"
    ]

    const help = [
        "<br>",
        '<span class="command">whois</span>          Who is Tanay?',
        '<span class="command">whoami</span>         Who are you?',
        '<span class="command">ai</span>             Ask the AI assistant',
        '<span class="command">social</span>         Display social networks',
        '<span class="command">secret</span>         Find the password',
        '<span class="command">projects</span>       View coding projects',
        '<span class="command">history</span>        View command history',
        '<span class="command">help</span>           You obviously already know what this does',
        '<span class="command">email</span>          Contact me',
        '<span class="command">clear</span>          Clear terminal',
        '<span class="command">banner</span>         Display the header',
        '<span class="command">matrix</span>         Enter the Matrix',
        '<span class="command">hack</span>           Hacker mode',
        '<span class="command">love</span>           Show some love',
        "",
        "Project Commands:",
        '<span class="command">darkmodebang</span>   Open Dark Mode Bang extension',
        '<span class="command">volumebang</span>     Open Volume Bang extension',
        '<span class="command">speedbang</span>      Open Speed Bang extension',
        '<span class="command">weloveqr</span>       Open WeLoveQR web app',
        "<br>",
    ]

    const aiResponses = [
        "I'm an AI assistant created by Tanay. How can I help you today?",
        "That's an interesting question! Let me think about that...",
        "Based on my training data, I'd suggest exploring the available commands.",
        "I'm here to assist you with any questions about Tanay's portfolio.",
        "Have you tried the 'secret' command? There might be hidden features!",
        "I can help you navigate this terminal. Try 'help' for more options.",
        "Fascinating! Let me process that information...",
        "I'm constantly learning and evolving, just like the code that created me.",
    ]

    useEffect(() => {
        // Initialize terminal with banner (guard against StrictMode double-invoke)
        if (didInitRef.current) return
        didInitRef.current = true
        setTimeout(() => {
            loopLines(banner, "", 80)
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }, 100)
    }, [])

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
    }, [terminalHistory])

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    const addLine = (text: string, style: string, time: number) => {
        setTimeout(() => {
            const isHtml = /[<][a-zA-Z!/]/.test(text)
            const el = document.createElement(isHtml ? "p" : "pre")
            if (isHtml) {
                el.innerHTML = text
            } else {
                el.textContent = text
            }
            el.className = style
            if (terminalRef.current) {
                terminalRef.current.appendChild(el)
                terminalRef.current.scrollTop = terminalRef.current.scrollHeight
            }
        }, time)
    }

    const loopLines = (lines: Array<string | undefined>, style: string, time: number) => {
        lines.forEach((line, index) => {
            if (typeof line !== "string") return
            addLine(line, style, index * time)
        })
    }

    const newTab = (link: string) => {
        setTimeout(() => {
            window.open(link, "_blank")
        }, 500)
    }

    const executeCommand = (command: string) => {
        if (!command.trim()) return

        setCommandHistory(prev => [...prev, command])
        setHistoryIndex(-1)

        addLine("visitor@tanaycodes.com:~$ " + command, "no-animation", 0)
        commander(command.toLowerCase())
        setCurrentCommand("")
    }

    const commander = (cmd: string) => {
        switch (cmd) {
            case "help":
                loopLines(help, "color2 margin", 80)
                break
            case "whois":
                loopLines(whois, "color2 margin", 80)
                break
            case "whoami":
                loopLines(whoami, "color2 margin", 80)
                break
            case "ai":
                const aiResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
                addLine("🤖 AI: " + aiResponse, "color2", 80)
                addLine("", "", 0)
                break
            case "sudo":
                addLine("Oh no, you're not admin...", "color2", 80)
                setTimeout(() => {
                    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                }, 1000)
                break
            case "social":
                loopLines(social, "color2 margin", 80)
                break
            case "secret":
                setPasswordMode(true)
                addLine("Enter password:", "color2", 80)
                break
            case "projects":
                loopLines(projects, "color2 margin", 80)
                break
            case "password":
                addLine("<span class=\"inherit\"> Lol! You're joking, right? You're gonna have to try harder than that!😂</span>", "error", 100)
                break
            case "history":
                addLine("<br>", "", 0)
                loopLines(commandHistory, "color2", 80)
                addLine("<br>", "command", 80 * commandHistory.length + 50)
                break
            case "email":
                addLine('Opening mailto:<a href="mailto:tanay@example.com">tanay@example.com</a>...', "color2", 80)
                newTab('mailto:tanay@example.com')
                break
            case "clear":
                setTimeout(() => {
                    if (terminalRef.current) {
                        terminalRef.current.innerHTML = ''
                    }
                }, 1)
                break
            case "banner":
                loopLines(banner, "", 80)
                break
            case "matrix":
                addLine("🔴 ENTERING MATRIX MODE... 🔴", "color2", 80)
                addLine("Wake up, Neo...", "color2", 200)
                addLine("The Matrix has you...", "color2", 400)
                addLine("Follow the white rabbit.", "color2", 600)
                addLine("", "", 800)
                break
            case "hack":
                addLine("🚨 INITIATING HACKER MODE... 🚨", "color2", 80)
                addLine("Accessing mainframe...", "color2", 200)
                addLine("Bypassing security protocols...", "color2", 400)
                addLine("System compromised! 💀", "color2", 600)
                addLine("", "", 800)
                break
            case "love":
                addLine("💕 LOVE DETECTED! 💕", "color2", 80)
                addLine("    ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥", "color2", 200)
                addLine("  ♥                                   ♥", "color2", 300)
                addLine(" ♥                                     ♥", "color2", 400)
                addLine("♥           I LOVE CODING! 💻           ♥", "color2", 500)
                addLine("♥                                       ♥", "color2", 600)
                addLine(" ♥                                     ♥", "color2", 700)
                addLine("  ♥                                   ♥", "color2", 800)
                addLine("    ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥", "color2", 900)
                addLine("", "", 1000)
                break
            // Social links
            case "github":
                addLine("Opening GitHub...", "color2", 0)
                newTab("https://github.com/tanayvasishtha")
                break
            case "linkedin":
                addLine("Opening LinkedIn...", "color2", 0)
                newTab("https://linkedin.com/in/tanayvasishtha")
                break
            case "twitter":
                addLine("Opening Twitter...", "color2", 0)
                newTab("https://twitter.com/tanayvasishtha")
                break
            // Project-specific commands
            case "darkmodebang":
            case "darkmode":
                addLine("Opening Dark Mode Bang...", "color2", 0)
                newTab("https://chromewebstore.google.com/detail/dark-mode-bang-universal/hnnplkbhhlfopkkhfepdiljdbclfbpjh")
                break
            case "volumebang":
            case "volume":
                addLine("Opening Volume Bang...", "color2", 0)
                newTab("https://chromewebstore.google.com/detail/volume-bang-premium-audio/ancjplaiedoominjbebhdgjipcgfbopl")
                break
            case "speedbang":
            case "speed":
                addLine("Opening Speed Bang...", "color2", 0)
                newTab("https://chromewebstore.google.com/detail/speedbang-multiplatform-v/kaacodjcoaepldmhnpgodhafbcmlkfgo")
                break
            case "weloveqr":
            case "qr":
                addLine("Opening WeLoveQR...", "color2", 0)
                newTab("https://weloveqr.netlify.app")
                break
            default:
                addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100)
                break
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (passwordMode) {
            if (e.key === "Enter") {
                if (password === secretPassword) {
                    setIsPasswordCorrect(true)
                    loopLines(secret, "color2 margin", 120)
                    setPasswordMode(false)
                    setPassword("")
                } else {
                    addLine("Wrong password", "error", 0)
                    setPasswordMode(false)
                    setPassword("")
                }
            } else if (e.key === "Backspace") {
                setPassword(prev => prev.slice(0, -1))
            } else if (e.key.length === 1) {
                setPassword(prev => prev + e.key)
            }
        } else {
            if (e.key === "Enter") {
                executeCommand(currentCommand)
            } else if (e.key === "ArrowUp") {
                e.preventDefault()
                if (historyIndex < commandHistory.length - 1) {
                    const newIndex = historyIndex + 1
                    setHistoryIndex(newIndex)
                    setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
                }
            } else if (e.key === "ArrowDown") {
                e.preventDefault()
                if (historyIndex > 0) {
                    const newIndex = historyIndex - 1
                    setHistoryIndex(newIndex)
                    setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
                } else if (historyIndex === 0) {
                    setHistoryIndex(-1)
                    setCurrentCommand("")
                }
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!passwordMode) {
            setCurrentCommand(e.target.value)
        }
    }

    return (
        <div className="h-full terminal-container p-4 flex flex-col relative">
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                <div ref={terminalRef} className="flex-1 overflow-y-auto overflow-x-hidden space-y-1 pr-2">
                    {/* Terminal content will be dynamically added here */}
                </div>
            </div>
            <div className="flex items-center relative flex-shrink-0 mt-4" onClick={() => inputRef.current?.focus()}>
                <span className="text-green-400 mr-2">visitor@tanaycodes.com:~$</span>
                <div className="flex-1 relative">
                    <input
                        ref={inputRef}
                        type={passwordMode ? "password" : "text"}
                        value={passwordMode ? password : currentCommand}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent text-green-400 outline-none caret-green-400"
                        placeholder=""
                        autoFocus
                    />
                    {passwordMode && (
                        <div className="absolute right-0 top-0 text-green-400">
                            {password.split('').map(() => '*').join('')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TerminalComponent