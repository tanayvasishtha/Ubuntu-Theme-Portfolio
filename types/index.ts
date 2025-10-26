export type Window = {
  id: string;
  title: string;
  component: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
};

export type DesktopIcon = {
  id: string;
  name: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  action: () => void;
};
