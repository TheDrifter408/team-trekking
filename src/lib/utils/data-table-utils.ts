import { Task } from '@/types/props/Common.ts';
import { Row } from '@tanstack/react-table';
import { arrayMove } from '@dnd-kit/sortable';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { flattenTasks } from '@/mock/task';

function getDragDepth(offset: number, indentationWidth: number) {
  return Math.round(offset / indentationWidth);
}
export interface Projection {
  depth: number;
  maxDepth: number;
  minDepth: number;
  parentId: UniqueIdentifier | null;
}
export function getProjection(
  items: Row<Task>[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  dragOffset: number,
  indentationWidth: number
): Projection {
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  const activeItem = items[activeItemIndex];
  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem = newItems[overItemIndex - 1];
  const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = activeItem.depth + dragDepth;
  const maxDepth = previousItem?.depth ?? -1 + 1;
  const minDepth = nextItem?.depth ?? 0;
  let depth = projectedDepth;

  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }
  if (minDepth > maxDepth) {
    depth = maxDepth;
  }

  function parentId(): string | null {
    if (depth === 0 && !previousItem) return null;
    if (depth === previousItem.depth) return previousItem.parentId || null;
    if (depth > previousItem.depth) return previousItem.id;

    const newParent = newItems
      .slice(0, overItemIndex)
      .reverse()
      .find((item) => item.depth === depth)?.parentId;
    return newParent ?? null;
  }

  return { depth, maxDepth, minDepth, parentId: parentId() };
}

/**
 * Builds a hierarchical task tree from a flat array of tasks
 * @param flatTasks - Flat array of tasks with parentId references
 * @returns Array of root tasks with nested subTask arrays
 */
export const buildTaskTree = (flatTasks: Task[]): Task[] => {
  // Create a map for O(1) lookup of tasks by ID
  const taskMap = new Map<string, Task>();

  // First pass: Create a copy of each task and add to map
  flatTasks.forEach((task) => {
    const taskCopy: Task = {
      ...task,
      subTask: [], // Reset subTask array
    };
    taskMap.set(task.id, taskCopy);
  });

  const rootTasks: Task[] = [];

  // Second pass: Build the tree structure
  flatTasks.forEach((task) => {
    const taskCopy = taskMap.get(task.id)!;

    if (task.parentId === null) {
      // This is a root task
      rootTasks.push(taskCopy);
    } else {
      // This is a child task, find its parent
      const parent = taskMap.get(task.parentId);
      if (parent) {
        parent.subTask.push(taskCopy);
      } else {
        rootTasks.push(taskCopy);
      }
    }
  });

  // Update subTaskCount for all tasks
  const updateSubTaskCount = (task: Task) => {
    task.subTaskCount = task.subTask.length;
    task.subTask.forEach(updateSubTaskCount);
  };

  rootTasks.forEach(updateSubTaskCount);

  return rootTasks;
};

/**
 * Validates that a flat task array can be properly converted to a tree
 * @param flatTasks - Flat array of tasks
 * @returns Object with validation results
 */
export const validateTaskStructure = (flatTasks: Task[]) => {
  const taskIds = new Set(flatTasks.map((task) => task.id));
  const orphanedTasks: Task[] = [];
  const duplicateIds: string[] = [];

  // Check for duplicate IDs
  const seenIds = new Set<string>();
  flatTasks.forEach((task) => {
    if (seenIds.has(task.id)) {
      duplicateIds.push(task.id);
    }
    seenIds.add(task.id);
  });

  // Check for invalid parent references and orphaned tasks
  flatTasks.forEach((task) => {
    if (task.parentId !== null) {
      if (!taskIds.has(task.parentId)) {
        orphanedTasks.push(task);
      }
    }
  });

  // Check for circular references (basic check)
  const hasCircularReference = (
    taskId: string,
    visited = new Set<string>()
  ): boolean => {
    if (visited.has(taskId)) return true;

    const task = flatTasks.find((t) => t.id === taskId);
    if (!task || !task.parentId) return false;

    visited.add(taskId);
    return hasCircularReference(task.parentId, visited);
  };

  const circularTasks = flatTasks.filter((task) =>
    hasCircularReference(task.id)
  );

  return {
    isValid:
      orphanedTasks.length === 0 &&
      duplicateIds.length === 0 &&
      circularTasks.length === 0,
    orphanedTasks,
    duplicateIds,
    circularTasks,
    totalTasks: flatTasks.length,
    rootTasks: flatTasks.filter((task) => task.parentId === null).length,
  };
};

export const removeTaskById = (tasks: Task[], taskId: string): Task[] => {
  return tasks
    .map((task) => {
      if (task.id === taskId) return null;
      if (task.subTask?.length) {
        task.subTask = removeTaskById(task.subTask, taskId);
      }
      return task;
    })
    .filter(Boolean) as Task[];
};
