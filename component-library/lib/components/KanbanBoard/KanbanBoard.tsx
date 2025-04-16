import React, { useEffect, useState } from 'react';
import styles from '../../styles/KanbanBoard.module.css';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useDroppable,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import 'bootstrap/dist/css/bootstrap.min.css';
import { mockTasks } from '../../data/task.ts';

// Interface definitions
interface Task {
  id: UniqueIdentifier;
  title: string;
  description: string;
  assignee?: string;
  priority: 'low' | 'medium' | 'high';
}

interface Column {
  id: UniqueIdentifier;
  title: string;
  tasks: Task[];
}

// Task Card Component
const TaskCard = ({
  task,
  isOverlay = false,
}: {
  task: Task;
  isOverlay: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Translate priority to label for display
  const priorityLabels: Record<Task['priority'], string> = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };

  // Determine the appropriate class names based on priority and state
  const taskCardClasses = [
    styles.taskCard,
    isDragging ? styles.taskCardDragging : '',
    isOverlay ? styles.taskCardOverlay : '',
    task.priority === 'high'
      ? styles.taskCardHighPriority
      : task.priority === 'medium'
        ? styles.taskCardMediumPriority
        : styles.taskCardLowPriority,
  ]
    .filter(Boolean)
    .join(' ');

  const priorityBadgeClasses = [
    styles.priorityBadge,
    task.priority === 'high'
      ? styles.priorityBadgeHigh
      : task.priority === 'medium'
        ? styles.priorityBadgeMedium
        : styles.priorityBadgeLow,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={taskCardClasses}
      {...attributes}
      {...listeners}
    >
      <div className={styles.taskTitle}>{task.title}</div>
      <div className={styles.taskMeta}>
        <div className={priorityBadgeClasses}>
          {priorityLabels[task.priority]}
        </div>
      </div>
      <div className={styles.taskDescription}>{task.description}</div>
      {task.assignee && (
        <div className={styles.taskFooter}>
          <div className={styles.assigneeContainer}>
            <div className={styles.assigneeAvatar}>
              {task.assignee.charAt(0).toUpperCase()}
            </div>
            <span className={styles.assigneeName}>{task.assignee}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const EmptyColumn = ({ columnId }: { columnId: number | string }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `empty-${columnId}`,
    data: {
      type: 'column',
      columnId,
    },
  });

  const emptyPlaceholderClasses = [
    styles.emptyPlaceholder,
    isOver ? styles.emptyPlaceholderOver : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={setNodeRef} className={emptyPlaceholderClasses}>
      Drop tasks here
    </div>
  );
};

// Column Component with droppable area
const Column = ({ column, tasks }: { column: Column; tasks: Task[] }) => {
  const { id, title } = column;

  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: {
      type: 'column',
      columnId: id,
    },
  });

  const droppableAreaClasses = [
    styles.droppableArea,
    isOver ? styles.droppableAreaOver : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Convert column IDs to colors for visual distinction
  const getColumnColor = (columnId: string) => {
    switch (columnId) {
      case 'todo':
        return 'var(--column-todo)';
      case 'in-progress':
        return 'var(--column-in-progress)';
      case 'review':
        return 'var(--column-review)';
      case 'done':
        return 'var(--column-done)';
      default:
        return 'var(--color-light-gray)';
    }
  };

  return (
    <div className={styles.columnWrapper}>
      <div className={styles.columnHeader}>
        <h3 className={styles.columnTitle}>
          <div
            className={styles.columnColorIndicator}
            style={{ backgroundColor: getColumnColor(id.toString()) }}
          />
          {title}
          <span className={styles.columnCount}>{tasks.length}</span>
        </h3>
      </div>
      <div ref={setNodeRef} className={droppableAreaClasses}>
        <div className={styles.tasksContainer}>
          <SortableContext
            items={tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard
                  key={task.id.toString()}
                  task={task}
                  isOverlay={false}
                />
              ))
            ) : (
              <EmptyColumn columnId={id} />
            )}
          </SortableContext>
        </div>
      </div>
    </div>
  );
};

interface TaskStatus {
  id: string;
}

interface MockTask {
  id: string;
  name: string;
  description: string;
  assignees: Array<{ name: string }>;
  priority: string;
  status: TaskStatus;
}

export const KanbanBoard = () => {
  // Initial state with sample data
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  useEffect(() => {
    interface GroupedTasks {
      [key: string]: Task[];
    }

    const groupedTasks: GroupedTasks = {
      todo: [],
      inProgress: [],
      inReview: [],
      done: [],
    };

    Object.values(mockTasks as Record<string, MockTask>).forEach((task) => {
      const taskColumnId = task.status.id;
      if (groupedTasks[taskColumnId]) {
        groupedTasks[taskColumnId].push({
          id: task.id,
          title: task.name,
          description: task.description,
          assignee: task.assignees[0]?.name, // Assuming assignee is an optional field
          priority: task.priority.toLowerCase() as Task['priority'], // Normalize priority
        });
      }
    });

    const columnsArray = Object.entries(groupedTasks).map(
      ([status, tasks]) => ({
        id: status,
        title: status.charAt(0).toUpperCase() + status.slice(1), // Capitalize the first letter for title
        tasks,
      })
    );

    setColumns(columnsArray);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);

    const activeData = active.data.current;
    if (activeData?.type === 'task') {
      setActiveTask(activeData.task as Task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || !activeId) return;

    // Find the source column
    const sourceColumnId = findColumnIdByTaskId(activeId);
    if (!sourceColumnId) return;

    // Get the target column id
    let targetColumnId: UniqueIdentifier | null = null;

    // Check if over a task
    if (isTaskId(over.id)) {
      targetColumnId = findColumnIdByTaskId(over.id);
    }
    // Check if over a column or empty placeholder
    else {
      const overData = over.data.current;

      // Get columnId from data if available
      if (overData && overData.type === 'column' && overData.columnId) {
        targetColumnId = overData.columnId;
      }
      // Direct column id match
      else if (columns.some((col) => col.id === over.id)) {
        targetColumnId = over.id;
      }
      // Empty placeholder id match (format: empty-[columnId])
      else if (typeof over.id === 'string' && over.id.startsWith('empty-')) {
        targetColumnId = over.id.replace('empty-', '');
      }
    }

    // If couldn't determine target or same as source, exit
    if (!targetColumnId || sourceColumnId === targetColumnId) return;

    // Move the task between columns
    setColumns((prevColumns) => {
      // Find the source column and the task being dragged
      const sourceColumn = prevColumns.find((col) => col.id === sourceColumnId);
      if (!sourceColumn) return prevColumns;

      const taskToMove = sourceColumn.tasks.find(
        (task) => task.id === activeId
      );
      if (!taskToMove) return prevColumns;

      // Create updated columns
      return prevColumns.map((column) => {
        // Remove from source column
        if (column.id === sourceColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== activeId),
          };
        }

        // Add to target column
        if (column.id === targetColumnId) {
          // If dropping on a task, add after that task
          if (isTaskId(over.id)) {
            const overTaskIndex = column.tasks.findIndex(
              (task) => task.id === over.id
            );
            if (overTaskIndex >= 0) {
              const newTasks = [...column.tasks];
              newTasks.splice(overTaskIndex + 1, 0, taskToMove);
              return { ...column, tasks: newTasks };
            }
          }

          // If dropping directly on column (or couldn't find task), add to end
          return {
            ...column,
            tasks: [...column.tasks, taskToMove],
          };
        }

        return column;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Clean up state
    setActiveTask(null);
    setActiveId(null);

    if (!over) return;

    // If same item, no need to update
    if (active.id === over.id) return;

    // If both are tasks and in the same column, reorder
    if (isTaskId(active.id) && isTaskId(over.id)) {
      const activeColumnId = findColumnIdByTaskId(active.id);
      const overColumnId = findColumnIdByTaskId(over.id);

      if (activeColumnId && overColumnId && activeColumnId === overColumnId) {
        setColumns((prevColumns) => {
          const columnIndex = prevColumns.findIndex(
            (col) => col.id === activeColumnId
          );
          if (columnIndex < 0) return prevColumns;

          const column = prevColumns[columnIndex];
          const oldIndex = column.tasks.findIndex(
            (task) => task.id === active.id
          );
          const newIndex = column.tasks.findIndex(
            (task) => task.id === over.id
          );

          const newTasks = arrayMove(column.tasks, oldIndex, newIndex);

          const updatedColumns = [...prevColumns];
          updatedColumns[columnIndex] = { ...column, tasks: newTasks };

          return updatedColumns;
        });
      }
    }
    // Handle drops on columns directly
    else {
      const sourceColumnId = findColumnIdByTaskId(active.id);

      if (!sourceColumnId) return;

      let targetColumnId: UniqueIdentifier | null = null;

      // Get the target column id from the over target
      if (over.data.current?.type === 'column') {
        targetColumnId = over.data.current.columnId;
      } else if (typeof over.id === 'string' && over.id.startsWith('empty-')) {
        targetColumnId = over.id.replace('empty-', '');
      } else if (columns.some((col) => col.id === over.id)) {
        targetColumnId = over.id;
      }

      if (targetColumnId && sourceColumnId !== targetColumnId) {
        setColumns((prevColumns) => {
          // Find the source column and task being moved
          const sourceColumn = prevColumns.find(
            (col) => col.id === sourceColumnId
          );
          if (!sourceColumn) return prevColumns;

          const taskToMove = sourceColumn.tasks.find(
            (task) => task.id === active.id
          );
          if (!taskToMove) return prevColumns;

          return prevColumns.map((column) => {
            // Remove from source column
            if (column.id === sourceColumnId) {
              return {
                ...column,
                tasks: column.tasks.filter((task) => task.id !== active.id),
              };
            }

            // Add to target column
            if (column.id === targetColumnId) {
              return {
                ...column,
                tasks: [...column.tasks, taskToMove],
              };
            }

            return column;
          });
        });
      }
    }
  };

  // Helper functions
  const findColumnIdByTaskId = (
    taskId: UniqueIdentifier
  ): UniqueIdentifier | undefined => {
    for (const column of columns) {
      if (column.tasks.some((task) => task.id === taskId)) {
        return column.id;
      }
    }
    return undefined;
  };

  // Check if an ID belongs to a task
  const isTaskId = (id: UniqueIdentifier): boolean => {
    return typeof id === 'string' && id.startsWith('task-');
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.boardContainer}>
        <h1 className={styles.boardTitle}>Kanban Board</h1>
        <div className={styles.columnsContainer}>
          {columns.map((column) => (
            <Column
              key={column.id.toString()}
              column={column}
              tasks={column.tasks}
            />
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} isOverlay={true} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
