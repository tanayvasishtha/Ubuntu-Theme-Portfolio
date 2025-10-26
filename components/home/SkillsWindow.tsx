import { en } from "@/data/en";

const SkillsWindow = () => {
  const skillCategories = en.skills.categories;

  return (
    <div className="h-full bg-card p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        {en.skills.title}
      </h2>
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
  );
};

export default SkillsWindow;
