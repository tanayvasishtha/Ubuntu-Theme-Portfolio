import { en } from "@/data/en";

const HelpWindow = () => (
  <div className="h-full bg-card p-6 overflow-y-auto">
    <h2 className="text-2xl font-bold text-foreground mb-6">{en.help.title}</h2>
    <div className="space-y-4">
      {en.help.sections.map((section, index) => (
        <div key={index} className="border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-2">
            {section.title}
          </h3>
          <p className="text-card-foreground">{section.content}</p>
        </div>
      ))}
    </div>
  </div>
);

export default HelpWindow;
