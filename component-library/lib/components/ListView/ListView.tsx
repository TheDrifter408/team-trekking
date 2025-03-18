import React, { useEffect, useState } from 'react';
import { mockSubTasks, mockTasks } from '../../data/task.ts';
import { Table } from '../Table/Table.tsx';
import { Task } from '../../types/DataTypes';
import { FiChevronDown, FiChevronRight, FiMoreVertical } from 'react-icons/fi';
import styles from '../../styles/List.module.css';

// Extend the Task type to include expanded state
interface ExtendedTask extends Task {
  isExpanded?: boolean;
  isSubtask?: boolean;
  parentId?: string;
  sortIndex?: number;
}

// Generate combined data with proper sorting and expansion handling
const generateCombinedData = (
  tasks: ExtendedTask[],
  subtasks: ExtendedTask[],
  sortConfig: {
    key: keyof ExtendedTask;
    direction: 'asc' | 'desc';
  } | null = null
) => {
  // First, create a copy of tasks to work with
  let tasksCopy = [...tasks];

  // Apply sorting to the parent tasks if a sort config exists
  if (sortConfig) {
    tasksCopy = sortItems(tasksCopy, sortConfig);
  }

  // Keep track of the index for proper insertion of subtasks
  let sortIndex = 0;
  const data: ExtendedTask[] = [];

  // Process each task and its subtasks
  tasksCopy.forEach((task) => {
    // Add parent task with its sort index
    const parentTask = { ...task, sortIndex: sortIndex++ };
    data.push(parentTask);

    // If task is expanded, add its subtasks
    if (task.isExpanded) {
      const taskSubtasks = subtasks.filter(
        (subtask) => subtask.parentId === task.id
      );

      // If sorting is applied, sort the subtasks using the same config
      const sortedSubtasks = sortConfig
        ? sortItems(taskSubtasks, sortConfig)
        : taskSubtasks;

      // Add each subtask with proper metadata
      sortedSubtasks.forEach((subtask) => {
        data.push({
          ...subtask,
          isSubtask: true,
          parentId: task.id,
          sortIndex: sortIndex++,
        });
      });
    }
  });

  return data;
};

// Helper function to sort items
const sortItems = <T extends object>(
  items: T[],
  config: { key: keyof T; direction: 'asc' | 'desc' }
): T[] => {
  return [...items].sort((a, b) => {
    const aValue = a[config.key];
    const bValue = b[config.key];

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return config.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return config.direction === 'asc'
      ? (aValue as any) - (bValue as any)
      : (bValue as any) - (aValue as any);
  });
};

// Status badge component with enhanced styling
const StatusTag = ({
  status,
}: {
  status: { id: string; name: string; statusColor: string };
}) => (
  <span
    className={styles.statusBadge}
    style={{ backgroundColor: status.statusColor }}
  >
    {status.name}
  </span>
);

// Priority badge with colors based on level
const PriorityBadge = ({ priority }: { priority: string }) => {
  const getPriorityClass = () => {
    switch (priority.toLowerCase()) {
      case 'high':
        return styles.priorityTagHigh;
      case 'medium':
        return styles.priorityTagMedium;
      case 'low':
        return styles.priorityTagLow;
      default:
        return styles.priorityTagDefault;
    }
  };

  return (
    <span className={`${styles.priorityTag} ${getPriorityClass()}`}>
      {priority}
    </span>
  );
};

// Enhanced progress bar with animations
const ProgressBar = ({ progress }: { progress: number }) => {
  const getProgressColorClass = () => {
    if (progress >= 80) return styles.progressBarInnerHigh;
    if (progress >= 40) return styles.progressBarInnerMedium;
    return styles.progressBarInnerLow;
  };

  return (
    <div className={styles.progressCell}>
      <div className={styles.progressBarWrapper}>
        <div className={styles.progressBarOuter}>
          <div
            className={`${styles.progressBarInner} ${getProgressColorClass()}`}
            style={{ width: `${progress}%` }}
          />
          <div
            className={`${styles.progressLabel} ${progress > 40 ? styles.progressLabelDark : styles.progressLabelLight}`}
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskName = ({
  row,
  onToggle,
}: {
  row: ExtendedTask;
  onToggle: (task: ExtendedTask) => void;
}) => {
  const hasSubtasks = mockSubTasks.some(
    (subtask) => subtask.parentId === row.id
  );

  const taskNameClass = row.isSubtask
    ? styles.taskNameWrapperSubtask
    : styles.taskNameWrapperParent;

  return (
    <div className={`${styles.taskNameWrapper} ${taskNameClass}`}>
      {!row.isSubtask && hasSubtasks && (
        <button
          className={styles.expandButton}
          onClick={(e) => {
            e.stopPropagation(); // Prevent row click from triggering
            onToggle(row);
          }}
        >
          {row.isExpanded ? <FiChevronDown /> : <FiChevronRight />}
        </button>
      )}
      {row.isSubtask && <div className={styles.subtaskIndicator} />}
      <span>{row.name}</span>
    </div>
  );
};

export const ListView: React.FC = () => {
  const [tasks, setTasks] = useState<ExtendedTask[]>(mockTasks);
  const [displayData, setDisplayData] = useState<ExtendedTask[]>([]);

  useEffect(() => {
    setDisplayData(generateCombinedData(tasks, mockSubTasks));
  }, [tasks]);

  const toggleTaskExpansion = (task: ExtendedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, isExpanded: !t.isExpanded } : t
      )
    );
  };

  const columns: any = [
    {
      key: 'name',
      header: 'Task',
      width: '250px',
      sortable: true,
      sticky: true,
      render: (row: Task) => (
        <TaskName row={row as ExtendedTask} onToggle={toggleTaskExpansion} />
      ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      sortable: true,
      render: (row: Task) => <StatusTag status={row.status} />,
    },
    {
      key: 'priority',
      header: 'Priority',
      align: 'center',
      sortable: true,
      render: (row: Task) => <PriorityBadge priority={row.priority} />,
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      align: 'center',
      sortable: true,
    },
    {
      key: 'progress',
      header: 'Progress',
      align: 'left',
      sortable: true,
      render: (row: Task) => <ProgressBar progress={row.progress ?? 0} />,
    },
    {
      key: 'progress',
      header: 'Progress',
      align: 'left',
      sortable: true,
      render: (row: Task) => <ProgressBar progress={row.progress ?? 0} />,
    },
    {
      key: 'progress',
      header: 'Progress',
      align: 'left',
      sortable: true,
      render: (row: Task) => <ProgressBar progress={row.progress ?? 0} />,
    },
    {
      key: 'progress',
      header: 'Progress',
      align: 'left',
      sortable: true,
      render: (row: Task) => <ProgressBar progress={row.progress ?? 0} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'center',
      render: () => (
        <button className={styles.actionButton}>
          <FiMoreVertical />
        </button>
      ),
    },
  ];

  return (
    <div className={styles.listViewContainer}>
      <Table columns={columns} data={displayData} />
    </div>
  );
};

export default ListView;
