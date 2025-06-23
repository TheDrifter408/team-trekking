import { Column } from '@/types/props/Common';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (hours: number): string => {
  return `${Math.floor(hours)}h ${Math.round((hours % 1) * 60)}m`;
};

export const getInitials = (name: string) => {
  if (name.length === 0) {
    return '';
  }
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

export const getWelcomeMessage = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export const hexToRgba = (hex: string, alpha: number) => {
  const sanitizedHex = hex.replace('#', '');
  const num = parseInt(sanitizedHex, 16);

  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


export const columnsEqual = (cols1: Column[], cols2: Column[]): boolean => {
  if (cols1.length !== cols2.length) return false;

  for (let i = 0; i < cols1.length; i++) {
    const col1 = cols1[i];
    const col2 = cols2[i];

    if (col1.id !== col2.id) return false;

    if (col1.tasks.length !== col2.tasks.length) return false;

    for (let j = 0; j < col1.tasks.length; j++) {
      if (col1.tasks[j].id !== col2.tasks[j].id) return false;
    }
  }

  return true;
}