const FilesWindow = () => (
  <div className="h-full bg-card p-6 overflow-y-auto">
    <h2 className="text-2xl font-bold text-foreground mb-6">File Manager</h2>
    <div className="space-y-2">
      {[
        { name: "📁 Documents", type: "folder", size: "2.3 GB" },
        { name: "📁 Downloads", type: "folder", size: "1.1 GB" },
        { name: "📁 Pictures", type: "folder", size: "856 MB" },
        { name: "📁 Music", type: "folder", size: "3.2 GB" },
        { name: "📁 Videos", type: "folder", size: "12.4 GB" },
        { name: "📄 README.md", type: "file", size: "7.8 KB" },
        { name: "📄 portfolio.txt", type: "file", size: "1.2 KB" },
      ].map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg">{item.name}</span>
          </div>
          <span className="text-sm text-muted-foreground">{item.size}</span>
        </div>
      ))}
    </div>
  </div>
);

export default FilesWindow;
