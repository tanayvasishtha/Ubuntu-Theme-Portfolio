import { ExternalLink } from "lucide-react";
import { en } from "@/data/en";

const ProjectsWindow = () => (
  <div className="h-full bg-card p-6 overflow-y-auto">
    <h2 className="text-2xl font-bold text-foreground mb-6">
      {en.projects.title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {en.projects.items.map((project, index) => (
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
