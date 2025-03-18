import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    useDroppable,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import "bootstrap/dist/css/bootstrap.min.css";
import {mockTasks} from "../../data/task.ts";

// Styled Components - ClickUp Inspired Modern UI

interface StyledTaskCardProps {
  isDragging: boolean;
  isOverlay?: boolean;
  priority: "low" | "medium" | "high";
}

interface PriorityBadgeProps {
  priority: "low" | "medium" | "high";
}

interface Task {
  id: UniqueIdentifier;
  title: string;
  description: string;
  assignee?: string;
  priority: "low" | "medium" | "high";
}

interface Column {
  id: UniqueIdentifier;
  title: string;
  tasks: Task[];
}

// Task Card Component
const TaskCard: React.FC<{
  task: Task;
  isOverlay?: boolean;
}> = ({ task, isOverlay = false }) => {
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
      type: "task",
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Translate priority to label for display
  const priorityLabels = {
    high: "High",
    medium: "Medium",
    low: "Low",
  };

  return (
    <StyledTaskCard
      ref={setNodeRef}
      style={style}
      isDragging={isDragging}
      isOverlay={isOverlay}
      priority={task.priority}
      {...attributes}
      {...listeners}
    >
      <TaskTitle>{task.title}</TaskTitle>
      <TaskMeta>
        <PriorityBadge priority={task.priority}>
          {priorityLabels[task.priority]}
        </PriorityBadge>
      </TaskMeta>
      <TaskDescription>{task.description}</TaskDescription>
      {task.assignee && (
        <TaskFooter>
          <AssigneeContainer>
            <AssigneeAvatar>
              {task.assignee.charAt(0).toUpperCase()}
            </AssigneeAvatar>
            <AssigneeName>{task.assignee}</AssigneeName>
          </AssigneeContainer>
        </TaskFooter>
      )}
    </StyledTaskCard>
  );
};

const EmptyColumn: React.FC<{
  columnId: UniqueIdentifier;
}> = ({ columnId }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `empty-${columnId}`,
    data: {
      type: "column",
      columnId,
    },
  });

  const style = {
    backgroundColor: isOver ? "#f5f8ff" : undefined,
    borderColor: isOver ? "#7b68ee" : undefined,
  };

  return (
    <EmptyPlaceholder ref={setNodeRef} style={style}>
      Drop tasks here
    </EmptyPlaceholder>
  );
};

// Column Component with droppable area
const Column: React.FC<{
  column: Column;
  tasks: Task[];
}> = ({ column, tasks }) => {
  const { id, title } = column;

  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: {
      type: "column",
      columnId: id,
    },
  });

  const style = {
    backgroundColor: isOver ? "#f5f8ff" : undefined,
  };

  // Convert column IDs to colors for visual distinction
  const getColumnColor = (columnId: UniqueIdentifier) => {
    switch (columnId) {
      case "todo":
        return "#4bade8";
      case "in-progress":
        return "#7b68ee";
      case "review":
        return "#ffbd3e";
      case "done":
        return "#68d391";
      default:
        return "#a3adc2";
    }
  };

  return (
    <ColumnWrapper>
      <ColumnHeader>
        <ColumnTitle>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "3px",
              backgroundColor: getColumnColor(id),
              marginRight: "8px",
            }}
          />
          {title}
          <ColumnCount>{tasks.length}</ColumnCount>
        </ColumnTitle>
      </ColumnHeader>
      <DroppableArea ref={setNodeRef} style={style}>
        <TasksContainer>
          <SortableContext
            items={tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard key={task.id.toString()} task={task} />
              ))
            ) : (
              <EmptyColumn columnId={id} />
            )}
          </SortableContext>
        </TasksContainer>
      </DroppableArea>
    </ColumnWrapper>
  );
};

export const KanbanBoard: React.FC = () => {
  // Initial state with sample data
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const groupedTasks: any = {
      todo: [],
      inProgress: [],
      inReview: [],
      done: [],
    };

    Object.values(mockTasks).forEach((task) => {
      const taskColumnId = task.status.id;
      if (groupedTasks[taskColumnId]) {
        groupedTasks[taskColumnId].push({
          id: task.id,
          title: task.name,
          description: task.description,
          assignee: task.assignees[0]?.name, // Assuming assignee is an optional field
          priority: task.priority.toLowerCase(), // Normalize priority
        });
      }
    });

    const columnsArray: Column[] = Object.entries(groupedTasks).map(
      ([status, tasks]) => ({
        id: status,
        title: status.charAt(0).toUpperCase() + status.slice(1), // Capitalize the first letter for title
        tasks,
      }),
    );

    setColumns(columnsArray);
  }, [mockTasks]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);

    const activeData = active.data.current;
    if (activeData?.type === "task") {
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
      if (overData && overData.type === "column" && overData.columnId) {
        targetColumnId = overData.columnId;
      }
      // Direct column id match
      else if (columns.some((col) => col.id === over.id)) {
        targetColumnId = over.id;
      }
      // Empty placeholder id match (format: empty-[columnId])
      else if (typeof over.id === "string" && over.id.startsWith("empty-")) {
        targetColumnId = over.id.replace("empty-", "");
      }
    }

    // If couldn't determine target or same as source, exit
    if (!targetColumnId || sourceColumnId === targetColumnId) return;

    // Move the task between columns
    setColumns((prevColumns) => {
      // Find the source column and the task being dragged
      const sourceColumn = prevColumns.find(
        (col) => col.id === sourceColumnId,
      )!;
      const taskToMove = sourceColumn.tasks.find(
        (task) => task.id === activeId,
      )!;

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
              (task) => task.id === over.id,
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
            (col) => col.id === activeColumnId,
          );
          if (columnIndex < 0) return prevColumns;

          const column = prevColumns[columnIndex];
          const oldIndex = column.tasks.findIndex(
            (task) => task.id === active.id,
          );
          const newIndex = column.tasks.findIndex(
            (task) => task.id === over.id,
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
      if (over.data.current?.type === "column") {
        targetColumnId = over.data.current.columnId;
      } else if (typeof over.id === "string" && over.id.startsWith("empty-")) {
        targetColumnId = over.id.replace("empty-", "");
      } else if (columns.some((col) => col.id === over.id)) {
        targetColumnId = over.id;
      }

      if (targetColumnId && sourceColumnId !== targetColumnId) {
        setColumns((prevColumns) => {
          // Find the source column and task being moved
          const sourceColumn = prevColumns.find(
            (col) => col.id === sourceColumnId,
          )!;
          const taskToMove = sourceColumn.tasks.find(
            (task) => task.id === active.id,
          )!;

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
    taskId: UniqueIdentifier,
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
    return typeof id === "string" && id.startsWith("task-");
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <BoardContainer>
        <BoardTitle>Kanban Board</BoardTitle>
        <ColumnsContainer>
          {columns.map((column) => (
            <Column
              key={column.id.toString()}
              column={column}
              tasks={column.tasks}
            />
          ))}
        </ColumnsContainer>
      </BoardContainer>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} isOverlay={true} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

const BoardContainer = styled.div`
  padding: 32px;
  background-color: #f7f9fb;
  min-height: 100vh;
`;

const BoardTitle = styled.h1`
  margin-bottom: 32px;
  font-weight: 700;
  color: #292d34;
  font-size: 28px;
  display: flex;
  align-items: center;

  &:before {
    content: "";
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: #7b68ee;
    border-radius: 6px;
    margin-right: 12px;
  }
`;

const ColumnsContainer = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  min-height: 80px;
  padding-bottom: 24px;
  align-items: flex-start;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f2f5;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c5c9d5;
    border-radius: 10px;
  }
`;

const ColumnWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  width: 280px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #ebedf2;
  overflow: hidden;
`;

const ColumnHeader = styled.div`
  font-weight: 600;
  color: #292d34;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f2f5;
`;

const ColumnTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const ColumnCount = styled.span`
  color: #7f8595;
  font-size: 13px;
  background-color: #f0f2f5;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 8px;
  font-weight: 500;
`;

const TasksContainer = styled.div`
  overflow-y: auto;
  padding: 12px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #e0e4ea;
    border-radius: 8px;
  }
`;

const StyledTaskCard = styled.div<StyledTaskCardProps>`
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  border-left: 3px solid
    ${(props) =>
      props.priority === "high"
        ? "#ff5c5c"
        : props.priority === "medium"
          ? "#ffbd3e"
          : "#4bade8"};
  background-color: ${(props) => (props.isOverlay ? "#f8faff" : "white")};
  box-shadow: ${(props) =>
    props.isOverlay
      ? "0 8px 24px rgba(0,0,0,0.15)"
      : props.isDragging
        ? "0 4px 12px rgba(0,0,0,0.1)"
        : "0 1px 3px rgba(0,0,0,0.06)"};
  opacity: ${(props) => (props.isDragging ? 0.7 : 1)};
  cursor: grab;
  transition:
    transform 0.1s,
    box-shadow 0.1s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const TaskTitle = styled.div`
  font-weight: 600;
  color: #292d34;
  margin-bottom: 8px;
  font-size: 15px;
`;

const TaskMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const PriorityBadge = styled.div<PriorityBadgeProps>`
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: ${(props) =>
    props.priority === "high"
      ? "#fff0f0"
      : props.priority === "medium"
        ? "#fff8e8"
        : "#ebf7ff"};
  color: ${(props) =>
    props.priority === "high"
      ? "#ff5c5c"
      : props.priority === "medium"
        ? "#ffbd3e"
        : "#4bade8"};
`;

const TaskDescription = styled.p`
  font-size: 13px;
  color: #7f8595;
  margin-bottom: 12px;
  line-height: 1.5;
`;

const TaskFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AssigneeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AssigneeAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #7b68ee;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
`;

const AssigneeName = styled.span`
  margin-left: 8px;
  font-size: 13px;
  color: #5e6577;
  font-weight: 500;
`;

const DroppableArea = styled.div`
  flex-grow: 1;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const EmptyPlaceholder = styled.div`
  border: 2px dashed #e0e4ea;
  border-radius: 8px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a3adc2;
  font-size: 14px;
  margin: 16px 12px;
  flex-grow: 1;
  transition: background-color 0.2s;
`;
