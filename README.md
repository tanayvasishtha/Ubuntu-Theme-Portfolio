# Ubuntu Portfolio Desktop

An interactive Ubuntu-themed portfolio website that simulates a complete desktop environment. Built with Next.js, TypeScript, and Tailwind CSS, this portfolio showcases projects and skills through an immersive Ubuntu desktop experience.

![Ubuntu Portfolio](https://img.shields.io/badge/Next.js-14.2.16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css)
![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04.3_LTS-E95420?style=for-the-badge&logo=ubuntu)

## Features

### Desktop Environment Simulation
- **Authentic Ubuntu Loading Screen** - Complete with Ubuntu logo and loading animation
- **Draggable Desktop Icons** - Interactive icons that can be repositioned with collision detection
- **Window Management** - Minimize, maximize, close, and drag windows with smooth animations
- **Ubuntu Dock** - Left sidebar with application launchers and indicators
- **Top Panel** - Ubuntu-style top panel with time display, system status, and controls
- **Bottom Taskbar** - Running applications and system tray
- **Wallpaper System** - Dynamic wallpaper switching with Ubuntu-themed backgrounds

#### Ubuntu Dock Applications
The left sidebar features essential Ubuntu applications:

- **🏠 Home** - Return to desktop overview
- **🌐 Google Chrome** - Web browser with search functionality
- **❓ Help** - Interactive help and support system
- **📁 Files** - File manager for browsing project assets
- **💻 Terminal** - Command-line interface
- **⚙️ Settings** - System preferences and configuration
- **🧮 Calculator** - Built-in calculator application
- **🎵 Spotify** - Music player with playlist integration
- **🖼️ Image Viewer** - Gallery for viewing project screenshots

### Interactive Terminal
- **Working Terminal Commands** - Fully functional terminal with real commands
- **Command History** - Persistent command history
- **Project Launchers** - Launch specific projects with `./project-name`
- **System Information** - `neofetch` command displays system specs
- **File Operations** - `ls`, `cat`, `pwd`, `whoami` commands
- **Fun Commands** - `fortune` for random quotes, `tree` for directory structure

### Ubuntu Applications

#### Core Applications
- **Terminal** - Fully functional command-line interface with real Ubuntu commands
- **Projects** - Interactive showcase of development projects with detailed descriptions
- **About Me** - Personal information, professional background, and career journey
- **Skills** - Comprehensive technical skills organized by categories and proficiency levels
- **Contact** - Professional contact information with direct links to social profiles
- **Gallery** - Visual project showcase with screenshots and interactive demos
- **Settings** - System preferences, theme customization, and configuration options
- **Commands Guide** - Interactive help documentation with all available commands

#### Entertainment & Media
- **Spotify Music Player** - Integrated Spotify web player with playlist support
- **Image Viewer** - Built-in image gallery for viewing project screenshots
- **Wallpaper Gallery** - Collection of Ubuntu-themed wallpapers and backgrounds

#### Productivity Tools
- **Calculator** - Functional calculator application with standard operations
- **Text Editor** - Simple text editor for notes and documentation
- **File Manager** - File system browser for navigating project assets

#### System Applications
- **System Monitor** - Real-time system information and performance metrics
- **Settings Panel** - Comprehensive system configuration and preferences
- **Help & Support** - Interactive help system with tutorials and documentation

### Design & UX
- **Ubuntu Color Scheme** - Authentic Ubuntu orange (#E95420) and terminal colors
- **Responsive Design** - Works seamlessly across all device sizes (mobile, tablet, desktop)
- **Smooth Animations** - Fluid transitions, hover effects, and window animations
- **Accessibility** - Keyboard navigation, screen reader support, and ARIA labels
- **Dark Theme** - Terminal-inspired dark mode with proper contrast ratios
- **Custom Scrollbars** - Styled scrollbars matching Ubuntu aesthetic
- **Icon System** - Consistent iconography with proper sizing and spacing

### Technical Highlights
- **Content Security Policy** - Secure iframe embedding for Spotify and external content
- **Performance Optimized** - Lazy loading, memoization, and efficient rendering
- **Type Safety** - Full TypeScript implementation with strict type checking
- **Component Architecture** - Modular, reusable components with proper separation of concerns
- **State Management** - Efficient React state management with hooks and context
- **Error Handling** - Graceful error boundaries and user feedback
- **SEO Optimized** - Proper meta tags, structured data, and semantic HTML

## Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tanayvasishtha/Ubuntu-Theme-Portfolio.git
   cd Ubuntu-Theme-Portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Tech Stack

### Frontend
- **Next.js 14.2.16** - React framework with App Router
- **TypeScript 5.0** - Type-safe JavaScript
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Radix UI** - Accessible component primitives

### Styling & Theming
- **Custom Ubuntu Theme** - Authentic Ubuntu color palette
- **CSS Variables** - Dynamic theming system
- **Responsive Design** - Mobile-first approach
- **Animation Library** - Smooth transitions and effects

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Project Structure

```
ubuntu-portfolio/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Ubuntu theme
│   ├── layout.tsx         # Root layout with fonts
│   └── page.tsx           # Main portfolio component
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── theme-provider.tsx # Theme context provider
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
│   ├── ubuntu-*.png      # Ubuntu branding images
│   └── ubuntu-wallpaper.png
└── styles/               # Additional stylesheets
```

## How to Use

### Desktop Interaction
1. **Double-click icons** to open applications
2. **Drag icons** to reposition them on the desktop
3. **Use window controls** (minimize, maximize, close) in the top-right corner
4. **Click and drag** window title bars to move windows

### Terminal Commands
The portfolio features a fully functional terminal with authentic Ubuntu commands:

#### Basic Navigation Commands
```bash
ls                    # List files and directories
pwd                   # Show current working directory
whoami                # Display current user information
whois                 # Learn about the developer
cat [file]            # Display file contents (about.txt, contact.txt, skills.txt)
tree                  # Show directory structure
history               # View command history
clear                 # Clear terminal screen
```

#### Application Launchers
```bash
open projects        # Open projects showcase window
open about          # Open about me window
open skills         # Open technical skills window
open contact        # Open contact information window
open gallery        # Open project gallery window
open settings       # Open system settings window
```

#### Project Commands
```bash
./ecommerce          # Launch e-commerce platform project
./taskmanager        # Launch task management application
./apigateway         # Launch API gateway system
./portfolio          # About this portfolio website
```

#### Social & Contact Commands
```bash
social               # Display social media links
email                # Show contact email address
sponsor me           # Support the developer on Buy Me a Coffee
github               # Open GitHub profile
linkedin             # Open LinkedIn profile
twitter              # Open Twitter/X profile
```

#### Fun & Interactive Commands
```bash
ai                   # Chat with AI assistant
matrix               # Enter the Matrix (fun animation)
hack                 # Activate hacker mode
love                 # Show some love with ASCII art
fortune              # Get random inspirational quotes
neofetch             # Display system information
date                 # Show current date and time
banner               # Display ASCII art banner
```

#### Secret Commands
```bash
secret               # Access hidden commands (password: "Banger")
sudo                 # Admin privileges (fun easter egg)
```

#### Help & Documentation
```bash
help                 # Show complete command reference
commands             # Display available commands
```

## Customization

### Adding New Projects
1. Update the `projectDetails` object in `app/page.tsx`
2. Add new project entries with title, description, features, and tech stack
3. Update terminal commands to include new project launchers

### Modifying Desktop Icons
1. Edit the `desktopIcons` array in `app/page.tsx`
2. Add new icons with custom actions and positions
3. Update the terminal `open` command to include new applications

### Styling Changes
1. Modify `app/globals.css` for global theme changes
2. Update CSS variables for color scheme modifications
3. Customize Ubuntu branding in the `public/` directory

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain Ubuntu design consistency
- Add proper error handling
- Include accessibility features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## What Makes This Portfolio Unique

### 🎯 **Immersive Experience**
This isn't just another portfolio website - it's a complete Ubuntu desktop simulation that allows visitors to interact with your work in a familiar, engaging environment. Users can explore your projects, skills, and personality through an authentic Ubuntu interface.

### 🚀 **Interactive Features**
- **Real Terminal Commands** - Visitors can actually use terminal commands to navigate and explore
- **Draggable Interface** - Desktop icons can be moved and repositioned like a real OS
- **Window Management** - Full window controls with minimize, maximize, and close functionality
- **Music Integration** - Spotify player for a complete desktop experience
- **Secret Commands** - Hidden features and easter eggs for curious visitors

### 💡 **Technical Innovation**
- **Responsive Ubuntu Design** - Maintains Ubuntu aesthetics across all screen sizes
- **Performance Optimized** - Smooth animations and interactions without lag
- **Accessibility First** - Full keyboard navigation and screen reader support
- **Modern Tech Stack** - Built with the latest web technologies for optimal performance

### 🎨 **Visual Excellence**
- **Authentic Ubuntu Theme** - Perfect recreation of Ubuntu's visual design language
- **Consistent Iconography** - Professional icon system throughout the interface
- **Smooth Animations** - Fluid transitions that enhance the user experience
- **Custom Styling** - Tailored scrollbars, buttons, and UI elements

## Acknowledgments

- **Ubuntu** - For the amazing Linux distribution and design inspiration
- **Next.js Team** - For the excellent React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Radix UI** - For accessible component primitives
- **Lucide** - For the beautiful icon library
- **Spotify** - For the music integration API

<div align="center">
  <p>Made with Ubuntu</p>
  <p>
    <a href="#ubuntu-portfolio-desktop">Back to Top</a>
  </p>
</div>"# Ubuntu-Theme-Portfolio" 
