import React, {useState} from "react";
import styled from "styled-components";

interface PriorityFlagProps {
  priority: "low" | "medium" | "high";
}

interface TaskStatusProps {
  status: string;
}

interface ProgressBarProps {
  progress: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: "low" | "medium" | "high";
  assignee?: string;
  dueDate?: string;
  progress: number;
  selected?: boolean;
}

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Design Mockups",
    description: "Create initial design mockups for review",
    status: "To Do",
    priority: "medium",
    dueDate: "2025-03-10",
    progress: 0,
  },
  {
    id: "task-2",
    title: "User Research",
    description: "Conduct user interviews and surveys",
    status: "To Do",
    priority: "high",
    assignee: "Alex",
    dueDate: "2025-03-05",
    progress: 15,
  },
  {
    id: "task-3",
    title: "Project Timeline",
    description: "Draft initial project timeline",
    status: "To Do",
    priority: "low",
    assignee: "Sam",
    dueDate: "2025-03-07",
    progress: 5,
  },
  {
    id: "task-4",
    title: "Frontend Implementation",
    description: "Implement React components",
    status: "In Progress",
    priority: "high",
    assignee: "Jordan",
    dueDate: "2025-03-15",
    progress: 60,
  },
  {
    id: "task-5",
    title: "API Integration",
    description: "Connect frontend to backend APIs",
    status: "In Progress",
    priority: "medium",
    dueDate: "2025-03-20",
    progress: 45,
  },
  {
    id: "task-6",
    title: "Code Review",
    description: "Review pull requests for new features",
    status: "Review",
    priority: "medium",
    assignee: "Taylor",
    dueDate: "2025-03-08",
    progress: 85,
  },
  {
    id: "task-7",
    title: "Documentation",
    description: "Update project documentation with new features",
    status: "Done",
    priority: "low",
    assignee: "Jamie",
    dueDate: "2025-03-01",
    progress: 100,
  },
];

export const ListView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle task selection
  const toggleTaskSelection = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, selected: !task.selected } : task,
      ),
    );
  };

  // Filter tasks by search query
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getPriorityLabel = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      default:
        return "";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <ListViewContainer>
      <ToolbarContainer>
        <SearchContainer>
          <SearchIcon>
            <SearchIconSvg />
          </SearchIcon>
          <SearchInput
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        <FiltersContainer>
          <FilterButton>
            Status <FilterIcon />
          </FilterButton>
          <FilterButton>
            Priority <FilterIcon />
          </FilterButton>
          <FilterButton>
            Assignee <FilterIcon />
          </FilterButton>
          <AddTaskButton>
            <PlusIcon /> Add Task
          </AddTaskButton>
        </FiltersContainer>
      </ToolbarContainer>

      {/* Task List Table */}
      <TableContainer>
        <StyledTable>
          <TableHeader>
            <tr>
              <CheckboxHeaderCell>
                <Checkbox />
              </CheckboxHeaderCell>
              <TaskTitleHeaderCell>
                Task <SortIcon />
              </TaskTitleHeaderCell>
              <th>
                Status <SortIcon />
              </th>
              <th>
                Priority <SortIcon />
              </th>
              <th>
                Progress <SortIcon />
              </th>
              <th>
                Assignee <SortIcon />
              </th>
              <th>
                Due Date <SortIcon />
              </th>
              <th>Actions</th>
            </tr>
          </TableHeader>

          <TableBody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <CheckboxDataCell>
                  <Checkbox
                    className={task.selected ? "checked" : ""}
                    onClick={() => toggleTaskSelection(task.id)}
                  >
                    <CheckIcon />
                  </Checkbox>
                </CheckboxDataCell>

                <TaskNameDataCell>
                  <TaskTitle>{task.title}</TaskTitle>
                  <TaskDescription>{task.description}</TaskDescription>
                </TaskNameDataCell>

                <td>
                  <TaskStatus status={task.status}>{task.status}</TaskStatus>
                </td>

                <td>
                  <PriorityCell>
                    <PriorityFlag priority={task.priority} />
                    {getPriorityLabel(task.priority)}
                  </PriorityCell>
                </td>

                <td>
                  <ProgressCell>
                    <ProgressBarWrapper>
                      <ProgressBarOuter>
                        <ProgressBarInner progress={task.progress} />
                        <ProgressLabel progress={task.progress}>
                          {task.progress}%
                        </ProgressLabel>
                      </ProgressBarOuter>
                    </ProgressBarWrapper>
                  </ProgressCell>
                </td>

                <td>
                  <AssigneeCell>
                    {task.assignee ? (
                      <>
                        <Avatar>{task.assignee.charAt(0).toUpperCase()}</Avatar>
                        <AssigneeName>{task.assignee}</AssigneeName>
                      </>
                    ) : (
                      <AssigneeName>Unassigned</AssigneeName>
                    )}
                  </AssigneeCell>
                </td>

                <td>
                  <DateCell>{formatDate(task.dueDate)}</DateCell>
                </td>

                <td>
                  <ActionsCell>
                    <ActionButton>
                      <EditIcon />
                    </ActionButton>
                    <ActionButton>
                      <MoreIcon />
                    </ActionButton>
                  </ActionsCell>
                </td>
              </tr>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </ListViewContainer>
  );
};

// Styled components
const ListViewContainer = styled.div`
  padding: 32px;
  background-color: #f7f9fb;
  min-height: 100vh;
`;

const TableContainer = styled.div`
  position: relative;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #ebedf2;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f2f5;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c5c9d5;
    border-radius: 4px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 900px;
`;

const TableHeader = styled.thead`
  background-color: #f9fafc;

  th {
    padding: 16px;
    text-align: left;
    font-size: 13px;
    font-weight: 600;
    color: #7f8595;
    border-bottom: 1px solid #ebedf2;
    white-space: nowrap;

    &:hover {
      color: #292d34;
      cursor: pointer;
    }
  }
`;

const TableBody = styled.tbody`
  tr {
    &:hover {
      background-color: #f9fafc;
    }

    &:last-child td {
      border-bottom: none;
    }
  }

  td {
    padding: 16px;
    border-bottom: 1px solid #ebedf2;
    vertical-align: middle;
  }
`;

// Fixed the sticky positioning by adding proper background and z-index
const CheckboxHeaderCell = styled.th`
  width: 50px;
  position: sticky;
  left: 0;
  z-index: 3;
  background-color: #f9fafc;
  border-right: 1px solid #ebedf2;
`;

const TaskTitleHeaderCell = styled.th`
  min-width: 250px;
  position: sticky;
  left: 50px;
  z-index: 3;
  background-color: #f9fafc;
  border-right: 1px solid #ebedf2;
`;

// Fixed sticky columns to ensure proper layering and background
const CheckboxDataCell = styled.td`
  width: 50px;
  position: sticky;
  left: 0;
  z-index: 2;
  background-color: inherit;
  border-right: 1px solid #ebedf2;
  text-align: center;

  tr:hover & {
    background-color: #f9fafc;
  }
`;

const TaskNameDataCell = styled.td`
  min-width: 250px;
  position: sticky;
  left: 50px;
  z-index: 2;
  background-color: inherit;
  border-right: 1px solid #ebedf2;

  tr:hover & {
    background-color: #f9fafc;
  }
`;

const Checkbox = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid #c5c9d5;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  &:hover {
    border-color: #7b68ee;
  }

  &.checked {
    background-color: #7b68ee;
    border-color: #7b68ee;
  }

  svg {
    color: white;
    width: 12px;
    height: 12px;
    visibility: hidden;
  }

  &.checked svg {
    visibility: visible;
  }
`;

const TaskTitle = styled.div`
  font-weight: 500;
  color: #292d34;
  font-size: 14px;
  margin-bottom: 4px;
`;

const TaskDescription = styled.div`
  color: #7f8595;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 230px;
`;

const TaskStatus = styled.div<TaskStatusProps>`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 12px;
  font-weight: 500;
  background-color: ${(props) => {
    switch (props.status) {
      case "To Do":
        return "#f0f2f5";
      case "In Progress":
        return "#e9e5ff";
      case "Review":
        return "#fff2e0";
      case "Done":
        return "#e8f7f0";
      default:
        return "#f0f2f5";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "To Do":
        return "#5e6577";
      case "In Progress":
        return "#7b68ee";
      case "Review":
        return "#ffbd3e";
      case "Done":
        return "#68d391";
      default:
        return "#5e6577";
    }
  }};
`;

const PriorityFlag = styled.div<PriorityFlagProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${(props) => {
    switch (props.priority) {
      case "high":
        return "#ff5c5c";
      case "medium":
        return "#ffbd3e";
      case "low":
        return "#4bade8";
      default:
        return "#a3adc2";
    }
  }};
  display: inline-block;
`;

const PriorityCell = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #5e6577;
`;

const AssigneeCell = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
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
`;

const DateCell = styled.div`
  font-size: 13px;
  color: #7f8595;
`;

const ProgressCell = styled.div`
  width: 100%;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

// Redesigned progress bar to match ClickUp style
const ProgressBarOuter = styled.div`
  width: 120px;
  height: 20px;
  background-color: #e0e4eb;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
`;

const ProgressBarInner = styled.div<ProgressBarProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: ${(props) => {
    if (props.progress >= 100) return "#68d391";
    if (props.progress >= 75) return "#7b68ee";
    if (props.progress >= 50) return "#4bade8";
    if (props.progress >= 25) return "#ffbd3e";
    return "#ff5c5c";
  }};
  transition: width 0.3s ease-in-out;
  border-radius: 10px;
`;

// Added label inside progress bar like ClickUp
const ProgressLabel = styled.div<ProgressBarProps>`
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

const ActionsCell = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #a3adc2;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f0f2f5;
    color: #5e6577;
  }
`;

const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 16px;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 10px 16px 10px 40px;
  border-radius: 8px;
  border: 1px solid #e0e4ea;
  width: 100%;
  font-size: 14px;
  background-color: #ffffff;

  &:focus {
    outline: none;
    border-color: #7b68ee;
    box-shadow: 0 0 0 3px rgba(123, 104, 238, 0.1);
  }

  &::placeholder {
    color: #a3adc2;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #a3adc2;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const FilterButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #e0e4ea;
  border-radius: 8px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #5e6577;
  cursor: pointer;

  &:hover {
    background-color: #f0f2f5;
  }

  svg {
    margin-left: 8px;
  }

  @media (max-width: 576px) {
    padding: 8px 12px;
    font-size: 12px;
  }
`;

const AddTaskButton = styled.button`
  background-color: #7b68ee;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #6a5cd6;
  }

  svg {
    margin-right: 8px;
  }

  @media (max-width: 576px) {
    padding: 8px 12px;
    font-size: 12px;
  }
`;

// Icons
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SearchIconSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const SortIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 5h10"></path>
    <path d="M11 9h7"></path>
    <path d="M11 13h4"></path>
    <path d="M3 17l3 3 3-3"></path>
    <path d="M6 18V4"></path>
  </svg>
);

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

const MoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
);
