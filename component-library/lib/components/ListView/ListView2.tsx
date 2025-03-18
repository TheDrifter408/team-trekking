import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {mockSubTasks, mockTasks} from "../../data/task.ts";
import {Table} from "../Table/Table.tsx";
import {Task} from "../../store/Features/TasksSlice.ts";
import {FiChevronDown, FiChevronRight, FiMoreVertical} from "react-icons/fi";

// Extend the Task type to include expanded state
interface ExtendedTask extends Task {
  isExpanded?: boolean;
  isSubtask?: boolean;
  parentId?: string;
  sortIndex?: number; // Added for maintaining sort order
}

// Generate combined data with proper sorting and expansion handling
const generateCombinedData = (
  tasks: ExtendedTask[],
  subtasks: ExtendedTask[],
  sortConfig: { key: keyof ExtendedTask; direction: "asc" | "desc" } | null,
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
        (subtask) => subtask.parentId === task.id,
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
  config: { key: keyof T; direction: "asc" | "desc" },
): T[] => {
  return [...items].sort((a, b) => {
    const aValue = a[config.key];
    const bValue = b[config.key];

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return config.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return config.direction === "asc"
      ? (aValue as any) - (bValue as any)
      : (bValue as any) - (aValue as any);
  });
};

// Status badge component with enhanced styling
const StatusTag = ({
  status,
}: {
  status: { id: string; name: string; statusColor: string };
}) => <StatusBadge color={status.statusColor}>{status.name}</StatusBadge>;

// Priority badge with colors based on level
const PriorityBadge = ({ priority }: { priority: string }) => {
  const getColor = () => {
    switch (priority.toLowerCase()) {
      case "high":
        return "#ff4d4f";
      case "medium":
        return "#faad14";
      case "low":
        return "#52c41a";
      default:
        return "#d9d9d9";
    }
  };

  return <PriorityTag color={getColor()}>{priority}</PriorityTag>;
};

// Enhanced progress bar with animations
const ProgressBar = ({ progress }: { progress: number }) => (
  <ProgressCell>
    <ProgressBarWrapper>
      <ProgressBarOuter>
        <ProgressBarInner progress={progress} />
        <ProgressLabel progress={progress}>{progress}%</ProgressLabel>
      </ProgressBarOuter>
    </ProgressBarWrapper>
  </ProgressCell>
);

const TaskName = ({
  row,
  onToggle,
}: {
  row: ExtendedTask;
  onToggle: (task: ExtendedTask) => void;
}) => {
  const hasSubtasks = mockSubTasks.some(
    (subtask) => subtask.parentId === row.id,
  );

  return (
    <TaskNameWrapper isSubtask={!!row.isSubtask}>
      {!row.isSubtask && hasSubtasks && (
        <ExpandButton
          onClick={(e) => {
            e.stopPropagation(); // Prevent row click from triggering
            onToggle(row);
          }}
        >
          {row.isExpanded ? <FiChevronDown /> : <FiChevronRight />}
        </ExpandButton>
      )}
      {row.isSubtask && <SubtaskIndicator />}
      <span>{row.name}</span>
    </TaskNameWrapper>
  );
};

export const ListView2: React.FC = () => {
  const [tasks, setTasks] = useState<ExtendedTask[]>(mockTasks);
  const [displayData, setDisplayData] = useState<ExtendedTask[]>([]);

  useEffect(() => {
    setDisplayData(generateCombinedData(tasks, mockSubTasks));
  }, [tasks]);

  const toggleTaskExpansion = (task: ExtendedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, isExpanded: !t.isExpanded } : t,
      ),
    );
  };

  const columns: any = [
    {
      key: "name",
      header: "Task",
      width: "250px",
      sortable: true,
      sticky: true,
      render: (row: Task) => (
        <TaskName row={row} onToggle={toggleTaskExpansion} />
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "center",
      sortable: true,
      render: (row: Task) => <StatusTag status={row.status} />,
    },
    {
      key: "priority",
      header: "Priority",
      align: "center",
      sortable: true,
      render: (row: Task) => <PriorityBadge priority={row.priority} />,
    },
    {
      key: "dueDate",
      header: "Due Date",
      align: "center",
      sortable: true,
    },
    {
      key: "progress",
      header: "Progress",
      align: "left",
      sortable: true,
      render: (row: Task) => <ProgressBar progress={row.progress ?? 0} />,
    },
    {
      key: "progress",
      header: "Progress",
      align: "left",
      sortable: true,
      render: (row: Task) => <ProgressBar progress={row.progress ?? 0} />,
    },
    {
      key: "progress",
      header: "Progress",
      align: "left",
      sortable: true,
      render: (row: Task) => <ProgressBar progress={row.progress ?? 0} />,
    },
    {
      key: "progress",
      header: "Progress",
      align: "left",
      sortable: true,
      render: (row: Task) => <ProgressBar progress={row.progress ?? 0} />,
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: () => (
        <ActionButton>
          <FiMoreVertical />
        </ActionButton>
      ),
    },
  ];

  return (
    <ListViewContainer>
      <Table
        columns={columns}
        data={displayData}
        onRowClick={toggleTaskExpansion}
      />
    </ListViewContainer>
  );
};

// Styled components
const ListViewContainer = styled.div`
  margin: 30px 0;
  padding: 30px;
`;

const StatusBadge = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 4px 12px;
  border-radius: 12px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  min-width: 80px;
  text-align: center;
`;

const PriorityTag = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  background-color: ${(props) => props.color}10;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  min-width: 80px;
  text-align: center;
`;

const ProgressCell = styled.div`
  width: 100%;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProgressBarOuter = styled.div`
  width: 150px;
  height: 20px;
  background-color: #e0e4eb;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
`;

const ProgressBarInner = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: ${(props) => {
    if (props.progress >= 80) return "#52c41a";
    if (props.progress >= 40) return "#7b68ee";
    return "#faad14";
  }};
  transition:
    width 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
  border-radius: 10px;
`;

const ProgressLabel = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: ${(props) => (props.progress > 40 ? "white" : "#5e6577")};
`;

const TaskNameWrapper = styled.div<{ isSubtask?: boolean }>`
  display: flex;
  align-items: center;
  padding-left: ${(props) => (props.isSubtask ? "24px" : "0")};
  font-weight: ${(props) => (props.isSubtask ? "normal" : "bold")};
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7f8595;

  &:hover {
    color: #7b68ee;
  }
`;

const SubtaskIndicator = styled.div`
  width: 16px;
  height: 1px;
  background-color: #7f8595;
  margin-right: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #7f8595;
  padding: 4px 8px;
  border-radius: 4px;

  &:hover {
    background-color: #f0f2f5;
    color: #7b68ee;
  }
`;
