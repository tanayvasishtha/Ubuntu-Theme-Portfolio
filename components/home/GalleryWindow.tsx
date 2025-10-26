import { en } from "@/data/en";

const GalleryWindow = () => {
  const projects = en.gallery.items;

  return (
    <div className="h-full bg-card p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        {en.gallery.title}
      </h2>
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
              <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2">
                {project.name}
              </h3>
              <p className="text-xs text-card-foreground line-clamp-2">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryWindow;
