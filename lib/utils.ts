import { DesktopIcon } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const snapToGrid = (x: number, y: number) => {
  const gridSize = 80;
  const startX = 100;
  const startY = 100;

  const gridX = Math.round((x - startX) / gridSize);
  const gridY = Math.round((y - startY) / gridSize);

  const clampedY = Math.max(0, gridY);

  return {
    x: startX + gridX * gridSize,
    y: startY + clampedY * gridSize,
  };
};

export const checkCollision = (
  iconId: string,
  newX: number,
  newY: number,
  desktopIcons: DesktopIcon[]
) => {
  const snapPos = snapToGrid(newX, newY);

  return desktopIcons.some(
    (icon) =>
      icon.id !== iconId &&
      Math.abs(icon.position.x - snapPos.x) < 70 &&
      Math.abs(icon.position.y - snapPos.y) < 70
  );
};
