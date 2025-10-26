import { en } from "@/data/en";

const NotepadWindow = () => {
  // Build the command guide content from en data
  const buildCommandGuide = () => {
    let content = `# ${en.commands.title}\n# ${en.commands.subtitle}\n\n`;

    Object.entries(en.commands.categories).forEach(([key, category]) => {
      content += `## ${category.title}\n`;
      category.items.forEach((item) => {
        content += `${item.command.padEnd(15)} - ${item.description}\n`;
      });
      content += `\n`;
    });

    content += `## Tips:\n`;
    en.commands.tips.forEach((tip) => {
      content += `- ${tip}\n`;
    });

    content += `\n${en.commands.footer}`;
    return content;
  };

  return (
    <div className="h-full bg-card p-4 font-mono text-sm">
      <div className="h-full overflow-y-auto whitespace-pre-wrap text-foreground">
        {buildCommandGuide()}
      </div>
    </div>
  );
};

export default NotepadWindow;
