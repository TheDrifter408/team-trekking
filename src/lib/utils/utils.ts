import { Column } from '@/types/props/Common.ts';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { QueryLifecycleApi } from '@reduxjs/toolkit/query';
import { StatusItem, View } from '@/types/request-response/space/ApiResponse';

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
};

/**
 * Skips re-fetching if data is already cached within the given number of days.
 *
 * @param ttlInDays Number of days to keep data "fresh"
 */
export function withPersistentCache(ttlInDays: number) {
  const ttlInMs = ttlInDays * 24 * 60 * 60 * 1000;

  return {
    async onQueryStarted<T>(
      arg: T,
      api: QueryLifecycleApi<any, any, any, any>
    ): Promise<void> {
      const { getState, queryFulfilled, endpointName } = api;
      const state = getState() as Record<string, any>;
      const reducerPath = (api as any).api.reducerPath;

      const cacheKey = `${endpointName}(${JSON.stringify(arg)})`;
      const cacheEntry = state?.[reducerPath]?.queries?.[cacheKey];
      const lastFetched = cacheEntry?.fulfilledTimeStamp ?? 0;

      if (Date.now() - lastFetched < ttlInMs) {
        // Skip re-fetch if within TTL
        return;
      }

      try {
        await queryFulfilled;
      } catch (error) {
        console.error(`[${endpointName}] Fetch failed:`, error);
      }
    },
  };
}

export const convertToEmbedURL = (url: string): string => {
  const videoIdMatch = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  const videoId = videoIdMatch?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

export const extractDefaultViews = (views: View[]): string => {
  return views.map((view: View) => view.title).join(', ');
};

export const extractTaskStatus = (
  statusItems: Record<string, StatusItem[]>
) => {
  return Object.values(statusItems) // first convert it to this type: StatusItem[][]
    .flat() // StatusItem[]
    .map(({ name, color }) => ({ name, color }));
};

interface Projection {
  depth: number;
  parentId: string | null;
  type: 'before' | 'after' | 'child';
}

interface RowLike {
  id: string;
  parentId: string | null;
  depth: number;
}

interface GetProjectionArgs {
  rows: RowLike[];
  activeId: string;
  overId: string;
  offsetLeft: number;
  indentationWidth: number;
  maxDepth: number;
}

export function getProjection({
  rows,
  activeId,
  overId,
  offsetLeft,
  indentationWidth = 25,
  maxDepth,
}: GetProjectionArgs): Projection | null {
  if (!activeId || !overId) return null;
  if (activeId === overId) return null;

  const overRow = rows.find((r) => r.id === overId);
  const activeRow = rows.find((r) => r.id === activeId);

  if (!overRow || !activeRow) return null;

  const projectedDepth = Math.min(
    Math.max(0, overRow.depth + Math.round(offsetLeft / indentationWidth)),
    maxDepth
  );

  const findParentId = (depth: number, index: number): string | null => {
    for (let i = index - 1; i >= 0; i--) {
      if (rows[i].depth === depth - 1) {
        return rows[i].id;
      }
    }
    return null;
  };

  const overIndex = rows.findIndex((r) => r.id === overId);
  const parentId =
    projectedDepth === 0 ? null : findParentId(projectedDepth, overIndex);

  const type: Projection['type'] =
    projectedDepth > overRow.depth
      ? 'child'
      : projectedDepth === overRow.depth
        ? 'after'
        : 'before';

  return {
    depth: projectedDepth,
    parentId,
    type,
  };
}
