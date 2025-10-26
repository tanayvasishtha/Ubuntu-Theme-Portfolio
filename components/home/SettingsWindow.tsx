import { en } from "@/data/en";

interface SettingsWindowProps {
  currentWallpaper: string;
  onWallpaperChange: (wallpaperPath: string) => void;
}

const SettingsWindow = ({
  currentWallpaper,
  onWallpaperChange,
}: SettingsWindowProps) => {
  const wallpapers = en.settings.wallpapers;

  return (
    <div className="h-full bg-card p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        {en.settings.title}
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">
            {en.settings.sections.wallpaper.title}
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {wallpapers.map((wallpaper) => (
              <div
                key={wallpaper.path}
                className="relative cursor-pointer group"
                onClick={() => onWallpaperChange(wallpaper.path)}
              >
                <img
                  src={wallpaper.path}
                  alt={wallpaper.name}
                  className="w-full h-20 object-cover rounded-lg border-2 border-transparent group-hover:border-orange-500 transition-colors"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-colors flex items-center justify-center">
                  <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {wallpaper.name}
                  </span>
                </div>
                {currentWallpaper === wallpaper.path && (
                  <div className="absolute top-1 right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-2">
            {en.settings.sections.display.title}
          </h3>
          <p className="text-card-foreground text-sm">
            {en.settings.sections.display.resolution}
          </p>
          <p className="text-card-foreground text-sm">
            {en.settings.sections.display.theme}
          </p>
        </div>
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-2">
            {en.settings.sections.systemInfo.title}
          </h3>
          <p className="text-card-foreground text-sm">
            {en.settings.sections.systemInfo.os}
          </p>
          <p className="text-card-foreground text-sm">
            {en.settings.sections.systemInfo.kernel}
          </p>
          <p className="text-card-foreground text-sm">
            {en.settings.sections.systemInfo.desktop}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsWindow;
