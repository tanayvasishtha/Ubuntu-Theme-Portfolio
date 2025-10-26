import { ExternalLink } from "lucide-react";

const ProjectsWindow = () => (
  <div className="h-full bg-card p-6 overflow-y-auto">
    <h2 className="text-2xl font-bold text-foreground mb-6">My Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          title: "WeLoveQR",
          description:
            "Modern QR code generator with advanced customization, analytics, and bulk generation features",
          tech: ["React", "Node.js", "MongoDB", "QR Code API"],
          status: "Live",
          link: "https://weloveqr.netlify.app",
        },
        {
          title: "Dark Mode Bang",
          description:
            "Chrome & Firefox extension that instantly applies dark mode to any website with one click",
          tech: [
            "JavaScript",
            "Chrome Extension API",
            "Firefox WebExtensions",
            "CSS",
          ],
          status: "Live",
          link: "https://chromewebstore.google.com/detail/dark-mode-bang-universal/hnnplkbhhlfopkkhfepdiljdbclfbpjh",
        },
        {
          title: "Volume Bang",
          description:
            "Browser extension for instant volume control and audio management across all tabs",
          tech: [
            "JavaScript",
            "Web Audio API",
            "Chrome Extension API",
            "Firefox WebExtensions",
          ],
          status: "Live",
          link: "https://chromewebstore.google.com/detail/volume-bang-premium-audio/ancjplaiedoominjbebhdgjipcgfbopl",
        },
        {
          title: "Speed Bang",
          description:
            "Performance optimization extension that accelerates web browsing and reduces loading times",
          tech: [
            "JavaScript",
            "Performance API",
            "Chrome Extension API",
            "Firefox WebExtensions",
          ],
          status: "Live",
          link: "https://chromewebstore.google.com/detail/speedbang-multiplatform-v/kaacodjcoaepldmhnpgodhafbcmlkfgo",
        },
        {
          title: "Portfolio Website",
          description:
            "Interactive Ubuntu desktop simulation as a portfolio website",
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
        <div
          key={index}
          className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {project.title}
          </h3>
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
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                project.status === "Completed" || project.status === "Live"
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
);

export default ProjectsWindow;
