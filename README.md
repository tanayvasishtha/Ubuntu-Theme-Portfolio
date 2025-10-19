# Ubuntu Portfolio Desktop

An interactive Ubuntu-themed portfolio website that simulates a complete desktop environment. Built with Next.js, TypeScript, and Tailwind CSS, this portfolio showcases projects and skills through an immersive Ubuntu desktop experience.

![Ubuntu Portfolio](https://img.shields.io/badge/Next.js-14.2.16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css)
![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04.3_LTS-E95420?style=for-the-badge&logo=ubuntu)

## Features

### Desktop Environment Simulation
- **Authentic Ubuntu Loading Screen** - Complete with Ubuntu logo and loading animation
- **Draggable Desktop Icons** - Interactive icons that can be repositioned
- **Window Management** - Minimize, maximize, close, and drag windows
- **Taskbar** - Bottom taskbar with running applications
- **Top Panel** - Ubuntu-style top panel with time display and system controls

### Interactive Terminal
- **Working Terminal Commands** - Fully functional terminal with real commands
- **Command History** - Persistent command history
- **Project Launchers** - Launch specific projects with `./project-name`
- **System Information** - `neofetch` command displays system specs
- **File Operations** - `ls`, `cat`, `pwd`, `whoami` commands
- **Fun Commands** - `fortune` for random quotes, `tree` for directory structure

### Application Windows
- **Projects Window** - Showcase of development projects with detailed information
- **About Me** - Personal information and professional background
- **Skills** - Technical skills organized by category
- **Contact** - Contact information and social links
- **Gallery** - Project screenshots and visual content
- **Settings** - System preferences and configuration
- **Commands Guide** - Interactive help documentation

### Design & UX
- **Ubuntu Color Scheme** - Authentic Ubuntu orange (#E95420) and terminal colors
- **Responsive Design** - Works seamlessly across all device sizes
- **Smooth Animations** - Fluid transitions and hover effects
- **Accessibility** - Keyboard navigation and screen reader support
- **Dark Theme** - Terminal-inspired dark mode

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
Open the Terminal application and try these commands:

```bash
# Basic navigation
ls                    # List files and directories
pwd                   # Show current directory
whoami                # Display current user

# Project launchers
./ecommerce          # Launch e-commerce project
./taskmanager        # Launch task manager project
./apigateway         # Launch API gateway project
./portfolio          # About this portfolio

# Application shortcuts
open projects        # Open projects window
open about          # Open about me window
open skills         # Open skills window
open contact        # Open contact window

# System information
neofetch            # Display system information
fortune             # Get a random quote
date                # Show current date and time
tree                # Show directory structure

# Help
help                # Show available commands
clear               # Clear terminal history
exit                # Close terminal
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

## Acknowledgments

- **Ubuntu** - For the amazing Linux distribution and design inspiration
- **Next.js Team** - For the excellent React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Radix UI** - For accessible component primitives
- **Lucide** - For the beautiful icon library

<div align="center">
  <p>Made with Ubuntu</p>
  <p>
    <a href="#ubuntu-portfolio-desktop">Back to Top</a>
  </p>
</div>"# Ubuntu-Theme-Portfolio" 
