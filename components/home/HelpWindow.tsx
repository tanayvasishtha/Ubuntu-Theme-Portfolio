const HelpWindow = () => (
  <div className="h-full bg-card p-6 overflow-y-auto">
    <h2 className="text-2xl font-bold text-foreground mb-6">Help & Support</h2>
    <div className="space-y-4">
      <div className="border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-2">Getting Started</h3>
        <p className="text-card-foreground">
          Welcome to Ubuntu Portfolio Desktop! This is an interactive portfolio
          showcasing development projects.
        </p>
      </div>
      <div className="border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-2">Desktop Icons</h3>
        <p className="text-card-foreground">
          Double-click any desktop icon to open applications. Drag icons to
          reposition them.
        </p>
      </div>
      <div className="border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-2">
          Terminal Commands
        </h3>
        <p className="text-card-foreground">
          Open the Terminal and type 'help' to see available commands.
        </p>
      </div>
    </div>
  </div>
);

export default HelpWindow;
