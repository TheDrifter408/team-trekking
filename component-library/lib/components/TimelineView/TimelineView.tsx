import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { mockTasks } from '../../data/task.ts';
import { GroupedTasks, TimelineTask } from '../../types/PropTypes.ts';

// Helper Functions
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getDaysBetween = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
};

const getWeekDates = (date: Date): Date[] => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  const monday = new Date(date.setDate(diff));

  const weekDates = [];
  for (let i = 0; i < 14; i++) {
    const newDate = new Date(monday);
    newDate.setDate(monday.getDate() + i);
    weekDates.push(newDate);
  }

  return weekDates;
};

// Timeline Component
export const TimelineView: React.FC = () => {
  const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({});
  const [currentDate] = useState<Date>(new Date());
  const [timelineDates, setTimelineDates] = useState<Date[]>([]);
  const [selectedTask, setSelectedTask] = useState<TimelineTask | null>(null);

  useEffect(() => {
    // Group tasks by assignee
    const grouped: GroupedTasks = {};

    Object.values(mockTasks).forEach((task: any) => {
      const assignee = task.assignees[0]?.name || 'Unassigned';

      if (!grouped[assignee]) {
        grouped[assignee] = [];
      }

      grouped[assignee].push({
        ...task,
        // Ensure there are start and end dates for each task
        startDate: task.startDate || new Date().toISOString(),
        endDate: task.endDate || new Date(Date.now() + 86400000).toISOString(), // Default to tomorrow
      });
    });

    setGroupedTasks(grouped);
    setTimelineDates(getWeekDates(new Date(currentDate)));
  }, [currentDate]);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task === selectedTask ? null : task);
  };

  // Calculate timeline dates
  const firstDate = timelineDates[0] || new Date();

  return (
    <TimelineContainer>
      <TimelineHeader>
        <HeaderTitle>Timeline View</HeaderTitle>
        <HeaderControls>
          <Button>Today</Button>
          <Button>{'<'}</Button>
          <Button>{'>'}</Button>
          <DateDisplay>
            {firstDate.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </DateDisplay>
        </HeaderControls>
      </TimelineHeader>

      <TimelineGrid>
        {/* Left sidebar */}
        <Sidebar>
          <SidebarHeader>Assignees</SidebarHeader>
          {Object.keys(groupedTasks).map((assignee) => (
            <AssigneeRow key={assignee}>
              <AssigneeInfo>
                <AssigneeAvatar>
                  {assignee.charAt(0).toUpperCase()}
                </AssigneeAvatar>
                <AssigneeName>{assignee}</AssigneeName>
              </AssigneeInfo>
            </AssigneeRow>
          ))}
        </Sidebar>

        {/* Timeline content */}
        <TimelineContent>
          {/* Date headers */}
          <DateHeaderRow>
            {timelineDates.map((date, index) => {
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <DateHeader key={index} isWeekend={isWeekend} isToday={isToday}>
                  <DayName>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </DayName>
                  <DayNumber>{date.getDate()}</DayNumber>
                </DateHeader>
              );
            })}
          </DateHeaderRow>

          {/* Task rows */}
          {Object.entries(groupedTasks).map(([assignee, tasks]) => (
            <AssigneeTaskRow key={assignee}>
              {timelineDates.map((date, dateIndex) => {
                const dateStr = date.toISOString().split('T')[0];

                return (
                  <DateCell
                    key={dateIndex}
                    isWeekend={date.getDay() === 0 || date.getDay() === 6}
                  >
                    {tasks.map((task) => {
                      const startDate = new Date(task.startDate)
                        .toISOString()
                        .split('T')[0];
                      const endDate = new Date(task.endDate)
                        .toISOString()
                        .split('T')[0];

                      if (dateStr >= startDate && dateStr <= endDate) {
                        const isFirstDay = dateStr === startDate;
                        const isLastDay = dateStr === endDate;
                        const totalDays =
                          getDaysBetween(task.startDate, task.endDate) + 1;
                        const remainingDays =
                          getDaysBetween(dateStr, task.endDate) + 1;

                        // Only render on the first day of the task
                        if (isFirstDay) {
                          return (
                            <TaskBar
                              key={task.id}
                              priority={task.priority.toLowerCase()}
                              width={totalDays > 14 ? 14 : totalDays}
                              isSelected={selectedTask?.id === task.id}
                              onClick={() => handleTaskClick(task)}
                            >
                              <TaskTitle>{task.name}</TaskTitle>
                              <TaskDates>
                                {formatDate(task.startDate)} -{' '}
                                {formatDate(task.endDate)}
                              </TaskDates>
                            </TaskBar>
                          );
                        }
                      }
                      return null;
                    })}
                  </DateCell>
                );
              })}
            </AssigneeTaskRow>
          ))}
        </TimelineContent>
      </TimelineGrid>

      {/* Task details panel */}
      {selectedTask && (
        <TaskDetailPanel>
          <DetailHeader>
            <DetailTitle>{selectedTask.name}</DetailTitle>
            <CloseButton onClick={() => setSelectedTask(null)}>×</CloseButton>
          </DetailHeader>
          <DetailContent>
            <DetailRow>
              <DetailLabel>Status:</DetailLabel>
              <StatusBadge status={selectedTask.status.id}>
                {selectedTask.status.id.charAt(0).toUpperCase() +
                  selectedTask.status.id.slice(1)}
              </StatusBadge>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Priority:</DetailLabel>
              <PriorityBadge priority={selectedTask.priority.toLowerCase()}>
                {selectedTask.priority}
              </PriorityBadge>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Assignee:</DetailLabel>
              <div>
                {selectedTask.assignees.length > 0
                  ? selectedTask.assignees[0].name
                  : 'Unassigned'}
              </div>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Dates:</DetailLabel>
              <div>
                {formatDate(selectedTask.startDate)} -{' '}
                {formatDate(selectedTask.endDate)}
              </div>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Description:</DetailLabel>
              <Description>{selectedTask.description}</Description>
            </DetailRow>
          </DetailContent>
        </TaskDetailPanel>
      )}
    </TimelineContainer>
  );
};

// Styled Components
const TimelineContainer = styled.div`
  padding: 32px;
  background-color: #f7f9fb;
  min-height: 100vh;
  position: relative;
`;

const TimelineHeader = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-weight: 700;
  color: #292d34;
  font-size: 28px;
  display: flex;
  align-items: center;

  &:before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: #7b68ee;
    border-radius: 6px;
    margin-right: 12px;
  }
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #e0e4ea;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #5e6577;
  cursor: pointer;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const DateDisplay = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #292d34;
`;

const TimelineGrid = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #ebedf2;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 220px;
  border-right: 1px solid #f0f2f5;
  flex-shrink: 0;
`;

const SidebarHeader = styled.div`
  font-weight: 600;
  color: #292d34;
  padding: 16px;
  border-bottom: 1px solid #f0f2f5;
  height: 50px;
  display: flex;
  align-items: center;
`;

const AssigneeRow = styled.div`
  height: 60px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f2f5;
`;

const AssigneeInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AssigneeAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #7b68ee;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
`;

const AssigneeName = styled.span`
  margin-left: 12px;
  font-size: 14px;
  color: #5e6577;
  font-weight: 500;
`;

const TimelineContent = styled.div`
  flex-grow: 1;
  overflow-x: auto;
`;

const DateHeaderRow = styled.div`
  display: flex;
  border-bottom: 1px solid #f0f2f5;
  height: 50px;
`;

interface DateHeaderProps {
  isWeekend: boolean;
  isToday: boolean;
}

const DateHeader = styled.div<DateHeaderProps>`
  width: 100px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #f0f2f5;
  background-color: ${(props) =>
    props.isToday ? '#f0f7ff' : props.isWeekend ? '#f9fafc' : 'transparent'};
`;

const DayName = styled.div`
  font-size: 12px;
  color: #7f8595;
  text-transform: uppercase;
`;

const DayNumber = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #292d34;
`;

const AssigneeTaskRow = styled.div`
  display: flex;
  height: 60px;
  border-bottom: 1px solid #f0f2f5;
  position: relative;
`;

interface DateCellProps {
  isWeekend: boolean;
}

const DateCell = styled.div<DateCellProps>`
  width: 100px;
  min-width: 100px;
  height: 100%;
  border-right: 1px solid #f0f2f5;
  background-color: ${(props) => (props.isWeekend ? '#f9fafc' : 'transparent')};
  position: relative;
`;

interface TaskBarProps {
  priority: string;
  width: number;
  isSelected: boolean;
}

const TaskBar = styled.div<TaskBarProps>`
  position: absolute;
  height: 40px;
  top: 10px;
  left: 5px;
  z-index: 1;
  width: ${(props) => `calc(${props.width * 100}px - 10px)`};
  background-color: ${(props) =>
    props.priority === 'high'
      ? '#ffefef'
      : props.priority === 'medium'
        ? '#fff7e8'
        : '#ebf7ff'};
  border-left: 3px solid
    ${(props) =>
      props.priority === 'high'
        ? '#ff5c5c'
        : props.priority === 'medium'
          ? '#ffbd3e'
          : '#4bade8'};
  border-radius: 6px;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? '0 0 0 2px #7b68ee' : '0 1px 3px rgba(0,0,0,0.1)'};
  overflow: hidden;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
`;

const TaskTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #292d34;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TaskDates = styled.div`
  font-size: 11px;
  color: #7f8595;
`;

const TaskDetailPanel = styled.div`
  position: absolute;
  top: 100px;
  right: 32px;
  width: 320px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid #ebedf2;
  z-index: 10;
`;

const DetailHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f0f2f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #292d34;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #7f8595;
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;

const DetailContent = styled.div`
  padding: 16px;
`;

const DetailRow = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;
`;

const DetailLabel = styled.div`
  width: 100px;
  font-size: 14px;
  font-weight: 500;
  color: #7f8595;
`;

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = styled.div<StatusBadgeProps>`
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
  background-color: ${(props) => {
    switch (props.status) {
      case 'todo':
        return '#ebf7ff';
      case 'inProgress':
        return '#f0f0ff';
      case 'inReview':
        return '#fff7e8';
      case 'done':
        return '#efffef';
      default:
        return '#f0f2f5';
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case 'todo':
        return '#4bade8';
      case 'inProgress':
        return '#7b68ee';
      case 'inReview':
        return '#ffbd3e';
      case 'done':
        return '#68d391';
      default:
        return '#7f8595';
    }
  }};
`;

interface PriorityBadgeProps {
  priority: string;
}

const PriorityBadge = styled.div<PriorityBadgeProps>`
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${(props) =>
    props.priority === 'high'
      ? '#fff0f0'
      : props.priority === 'medium'
        ? '#fff8e8'
        : '#ebf7ff'};
  color: ${(props) =>
    props.priority === 'high'
      ? '#ff5c5c'
      : props.priority === 'medium'
        ? '#ffbd3e'
        : '#4bade8'};
`;

const Description = styled.div`
  font-size: 14px;
  color: #5e6577;
  line-height: 1.5;
`;
