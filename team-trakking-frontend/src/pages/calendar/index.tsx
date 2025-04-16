import React, { useState, useRef, useEffect } from 'react';
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from 'date-fns';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import { useBreadcrumbNavigation } from '@/lib/hooks/use-breadcrumb.tsx';
import { Main } from '@/components/layout/main.tsx';

// Add these imports at the top where other imports are
import { DragEvent } from 'react';
import { usePageHeader } from '@/lib/context/page-header-context.tsx';

interface Task {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  color?: string;
}

const HOUR_HEIGHT = 64; // Height of each hour slot in pixels

const statusColors = {
  todo: 'bg-blue-100 border-blue-500 text-blue-800',
  'in-progress': 'bg-amber-100 border-amber-500 text-amber-800',
  done: 'bg-green-100 border-green-500 text-green-800',
};

const priorityIndicators = {
  low: 'bg-gray-400',
  medium: 'bg-amber-500',
  high: 'bg-red-500',
};

export const Calendar = () => {
  const { setCurrentView } = usePageHeader();
  setCurrentView('calendar');

  useBreadcrumbNavigation({
    currentTitle: 'ProjecX Moon',
    workspace: { label: 'Apptitive', href: '/home' },
    space: { label: 'ProjecX Moon', href: '/space' },
    folder: { label: 'Space Shuttle', href: '/folder' },
  });

  // Add these new state variables inside the component
  // (right after other useState declarations)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragOverDay, setDragOverDay] = useState<Date | null>(null);
  const [dragOverHour, setDragOverHour] = useState<number | null>(null);

  // Add these functions before the return statement

  // Handle start of drag
  const handleDragStart = (e: DragEvent<HTMLDivElement>, task: Task) => {
    e.stopPropagation();
    setDraggedTask(task);
    // Set ghost drag image
    const dragImg = document.createElement('div');
    dragImg.classList.add('bg-purple-200', 'p-2', 'rounded', 'text-sm');
    dragImg.innerText = task.title;
    document.body.appendChild(dragImg);
    e.dataTransfer.setDragImage(dragImg, 10, 10);
    setTimeout(() => {
      document.body.removeChild(dragImg);
    }, 0);
  };

  // Handle dragover on time slot
  const handleDragOver = (
    e: DragEvent<HTMLDivElement>,
    day: Date,
    hour?: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverDay(day);
    if (hour !== undefined) {
      setDragOverHour(hour);
    }
  };

  // Handle drop to update task time
  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    day: Date,
    hour?: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedTask) return;

    // Calculate the new start time
    const newStart = new Date(day);

    // If hour is provided (week view), use it, otherwise keep the same hours (month view)
    if (hour !== undefined) {
      newStart.setHours(hour, draggedTask.start.getMinutes(), 0, 0);
    } else {
      // In month view, keep the same time just change the date
      newStart.setHours(
        draggedTask.start.getHours(),
        draggedTask.start.getMinutes(),
        0,
        0
      );
    }

    // Calculate duration of original task
    const originalDuration =
      draggedTask.end.getTime() - draggedTask.start.getTime();

    // Create new end time by adding the same duration
    const newEnd = new Date(newStart.getTime() + originalDuration);

    // Update the task with new times
    const updatedTasks = tasks.map((task) => {
      if (task.id === draggedTask.id) {
        return {
          ...task,
          start: newStart,
          end: newEnd,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    setDraggedTask(null);
    setDragOverDay(null);
    setDragOverHour(null);
  };

  // Clear drag state when drag ends
  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverDay(null);
    setDragOverHour(null);
  };

  // Calculate task position for multi-day events in the weekly grid
  const calculateTaskPositionMultiDay = (task: Task, day: Date) => {
    // Check if the day is within the task start and end dates
    const taskStartDate = new Date(task.start);
    taskStartDate.setHours(0, 0, 0, 0);

    const taskEndDate = new Date(task.end);
    taskEndDate.setHours(23, 59, 59, 999);

    const currentDate = new Date(day);
    currentDate.setHours(0, 0, 0, 0);

    // If the day is not within the task date range, return null
    if (currentDate < taskStartDate || currentDate > taskEndDate) {
      return null;
    }

    // Different calculations for the start day, end day, and middle days
    let startHour = 0;
    let endHour = 24;
    let startMinute = 0;
    let endMinute = 0;

    if (isSameDay(day, task.start)) {
      // For the first day, start from the actual start time
      startHour = task.start.getHours();
      startMinute = task.start.getMinutes();
    }

    if (isSameDay(day, task.end)) {
      // For the last day, end at the actual end time
      endHour = task.end.getHours();
      endMinute = task.end.getMinutes();
    }

    const top = (startHour + startMinute / 60) * HOUR_HEIGHT;
    const height =
      (endHour + endMinute / 60 - (startHour + startMinute / 60)) * HOUR_HEIGHT;

    return { top, height };
  };

  // Get tasks for a specific day (updated to include multi-day events)
  const getTasksForDay = (day: Date) => {
    return tasks.filter((task) => {
      const taskStart = new Date(task.start);
      taskStart.setHours(0, 0, 0, 0);

      const taskEnd = new Date(task.end);
      taskEnd.setHours(23, 59, 59, 999);

      const currentDay = new Date(day);
      currentDay.setHours(0, 0, 0, 0);

      return currentDay >= taskStart && currentDay <= taskEnd;
    });
  };

  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Project Planning',
      start: new Date(new Date().setHours(9, 0, 0, 0)),
      end: new Date(new Date().setHours(11, 0, 0, 0)),
      status: 'todo',
      priority: 'medium',
    },
    {
      id: '2',
      title: 'Team Meeting',
      start: new Date(new Date().setHours(13, 0, 0, 0)),
      end: new Date(new Date().setHours(14, 30, 0, 0)),
      status: 'in-progress',
      priority: 'high',
    },
    {
      id: '3',
      title: 'Client Call',
      start: new Date(addDays(new Date(), 1).setHours(10, 0, 0, 0)),
      end: new Date(addDays(new Date(), 1).setHours(11, 0, 0, 0)),
      status: 'todo',
      priority: 'high',
    },
    {
      id: '4',
      title: 'Code Review',
      start: new Date(addDays(new Date(), -1).setHours(15, 0, 0, 0)),
      end: new Date(addDays(new Date(), -1).setHours(16, 30, 0, 0)),
      status: 'done',
      priority: 'medium',
    },
    {
      id: '5',
      title: 'Weekly Sync',
      start: addDays(new Date(), 3),
      end: addDays(new Date(), 3),
      status: 'todo',
      priority: 'low',
    },
  ]);

  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  const [formPosition, setFormPosition] = useState({ top: 0, left: 0 });
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    status: 'todo',
    priority: 'medium',
    start: new Date(),
    end: new Date(new Date().getTime() + 60 * 60 * 1000), // Default 1 hour duration
  });
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Generate week days based on current date
  const weekDays = React.useMemo(() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    return Array.from({ length: 7 }, (_, i) => {
      const day = addDays(weekStart, i);
      return {
        date: day,
        name: format(day, 'EEEE'),
        shortDate: format(day, 'd MMM'),
        isToday: isSameDay(day, new Date()),
        isWeekend: [0, 6].includes(getDay(day)),
      };
    });
  }, [currentDate]);

  // Generate month days based on current date
  const monthDays = React.useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    return eachDayOfInterval({ start: startDate, end: endDate }).map((day) => ({
      date: day,
      day: format(day, 'd'),
      isCurrentMonth: day.getMonth() === currentDate.getMonth(),
      isToday: isSameDay(day, new Date()),
      isWeekend: [0, 6].includes(getDay(day)),
    }));
  }, [currentDate]);

  // Generate time slots for week view
  const timeSlots = React.useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const hour = i % 12 === 0 ? 12 : i % 12;
      const ampm = i < 12 ? 'am' : 'pm';
      return {
        hour: i,
        label: `${hour}${ampm}`,
      };
    });
  }, []);

  // Handle clicking on a time slot
  const handleTimeSlotClick = (
    e: React.MouseEvent,
    day: Date,
    hour: number
  ) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();

    // Calculate the click position within the time slot to determine minutes
    const clickY = e.clientY - rect.top;
    const percentOfHour = clickY / rect.height;
    const minutes = Math.floor(percentOfHour * 60);

    const startTime = new Date(day);
    startTime.setHours(hour, minutes, 0, 0);

    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);

    setSelectedDay(day);
    setSelectedSlot(hour);
    setFormPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });

    setNewTask({
      title: '',
      status: 'todo',
      priority: 'medium',
      start: startTime,
      end: endTime,
    });

    setShowTaskForm(true);
  };

  // Handle clicking on a day cell in month view
  const handleDayClick = (e: React.MouseEvent, day: Date) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();

    const startTime = new Date(day);
    startTime.setHours(9, 0, 0, 0); // Default to 9 AM for day view

    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);

    setSelectedDay(day);
    setSelectedSlot(null);
    setFormPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });

    setNewTask({
      title: '',
      status: 'todo',
      priority: 'medium',
      start: startTime,
      end: endTime,
    });

    setShowTaskForm(true);
  };

  // Handle adding a new task
  const handleAddTask = () => {
    if (!newTask.title || !newTask.start || !newTask.end) return;

    const taskToAdd: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      start: newTask.start,
      end: newTask.end,
      status: newTask.status as 'todo' | 'in-progress' | 'done',
      priority: newTask.priority as 'low' | 'medium' | 'high',
    };

    setTasks([...tasks, taskToAdd]);
    setShowTaskForm(false);
    setNewTask({
      title: '',
      status: 'todo',
      priority: 'medium',
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
    });
  };

  // Close task form when clicking outside
  useEffect(() => {
    if (!showTaskForm) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (showTaskForm && !(e.target as Element).closest('.task-form')) {
        setShowTaskForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showTaskForm]);

  // Navigate to next/previous week or month
  const navigate = (direction: 'prev' | 'next') => {
    const days = viewMode === 'week' ? 7 : 30;
    const amount = direction === 'prev' ? -days : days;
    setCurrentDate(addDays(currentDate, amount));
  };

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Main>
      <div className="rounded-lg shadow-lg max-w-full overflow-hidden">
        {/* Calendar Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
              onClick={goToToday}
            >
              Today
            </button>
            <div className="border border-gray-200 rounded overflow-hidden flex">
              <button
                className={`px-3 py-1 ${viewMode === 'week' ? 'bg-gray-400' : ''}`}
                onClick={() => setViewMode('week')}
              >
                Week
              </button>
              <button
                className={`px-3 py-1 ${viewMode === 'month' ? 'bg-gray-400' : ''}`}
                onClick={() => setViewMode('month')}
              >
                Month
              </button>
            </div>
            <button
              className="px-2 text-gray-600 hover:bg-gray-100 rounded"
              onClick={() => navigate('prev')}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              className="px-2 text-gray-600 hover:bg-gray-100 rounded"
              onClick={() => navigate('next')}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <div className="text-base font-medium">
              {viewMode === 'week'
                ? `${format(weekDays[0].date, 'MMM d')} - ${format(weekDays[6].date, 'MMM d, yyyy')}`
                : format(currentDate, 'MMMM yyyy')}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded flex items-center gap-1  hover:bg-accent">
              <AdjustmentsHorizontalIcon className="h-4 w-4" /> Filter
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded flex items-center gap-1 hover:bg-accent">
              <XMarkIcon className="h-4 w-4" /> Close
            </button>
          </div>
        </div>

        {/* Week View */}
        {viewMode === 'week' && (
          <div
            className="w-full overflow-auto"
            style={{ height: 'calc(100vh - 130px)' }}
          >
            {/* All-day section */}
            <div className="grid grid-cols-8 border-b border-gray-200">
              <div className="flex items-center justify-center text-xs text-gray-500 p-2 border-r border-gray-200">
                All day
              </div>
              <div className="col-span-7 grid grid-cols-7">
                {weekDays.map((day) => (
                  <div
                    key={day.name}
                    className={`border-r border-gray-200 min-h-16 relative p-1 ${day.isWeekend ? 'bg-gray-50' : ''}`}
                    onClick={(e) => handleDayClick(e, day.date)}
                  >
                    {tasks
                      .filter(
                        (task) =>
                          isSameDay(task.start, day.date) &&
                          task.start.getHours() === 0 &&
                          task.end.getHours() === 0
                      )
                      .map((task) => (
                        <div
                          key={task.id}
                          className={`${statusColors[task.status]} border-l-4 rounded p-1 mb-1 text-xs cursor-pointer group`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="truncate">{task.title}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTask(task.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <XMarkIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                            </button>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span
                              className={`h-2 w-2 rounded-full ${priorityIndicators[task.priority]}`}
                            ></span>
                            <span className="text-xs opacity-75">
                              {task.status}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-8 border-b border-gray-200">
              <div className="p-3 border-r border-gray-200"></div>
              {weekDays.map((day) => (
                <div
                  key={day.name}
                  className={`p-3 text-center border-r border-gray-200 ${day.isWeekend ? 'bg-gray-50' : ''}`}
                >
                  <div
                    className={`font-medium ${day.isToday ? 'text-blue-600' : ''}`}
                  >
                    {day.name}
                  </div>
                  <div
                    className={`text-sm ${day.isToday ? 'bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mx-auto' : 'text-gray-500'}`}
                  >
                    {day.shortDate.split(' ')[0]}
                  </div>
                </div>
              ))}
            </div>

            {/* Time grid */}
            <div className="grid grid-cols-8" ref={calendarRef}>
              {/* Time column */}
              <div className="border-r border-gray-200">
                {timeSlots.map((time, idx) => (
                  <div
                    key={idx}
                    className="h-16 border-b border-gray-200 flex items-start justify-center pt-1 text-xs text-gray-500"
                  >
                    {time.label}
                  </div>
                ))}
              </div>

              {/* Day columns */}
              {weekDays.map((day) => (
                <div
                  key={day.name}
                  className={`border-r border-gray-200 relative ${day.isWeekend ? 'bg-gray-50' : ''}`}
                >
                  {/* // Replace the time slot div in Week View with this: */}
                  {timeSlots.map((time, idx) => (
                    <div
                      key={idx}
                      className={`h-16 border-b border-gray-200 cursor-pointer relative ${
                        dragOverDay &&
                        isSameDay(dragOverDay, day.date) &&
                        dragOverHour === time.hour
                          ? 'bg-purple-50'
                          : ''
                      }`}
                      onClick={(e) =>
                        handleTimeSlotClick(e, day.date, time.hour)
                      }
                      onDragOver={(e) => handleDragOver(e, day.date, time.hour)}
                      onDrop={(e) => handleDrop(e, day.date, time.hour)}
                    >
                      {/* Half-hour marker */}
                      <div className="absolute left-0 right-0 top-1/2 border-b border-gray-100"></div>
                    </div>
                  ))}

                  {/* // Replace the task rendering code in the Week View with this: */}
                  {/* Tasks rendered with absolute positioning */}
                  {getTasksForDay(day.date).map((task) => {
                    // Use the new position calculation function for multi-day events
                    const position = calculateTaskPositionMultiDay(
                      task,
                      day.date
                    );
                    if (!position) return null;

                    const isBeingDragged = draggedTask?.id === task.id;

                    return (
                      <div
                        key={task.id}
                        className={`absolute left-0 right-0 mx-1 ${statusColors[task.status]} border-l-4 rounded px-2 py-1 text-xs cursor-move group overflow-hidden ${isBeingDragged ? 'opacity-50' : ''}`}
                        style={{
                          top: `${position.top}px`,
                          height: `${position.height}px`,
                          zIndex: 10,
                        }}
                        onClick={(e) => e.stopPropagation()}
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, task)}
                        onDragEnd={handleDragEnd}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{task.title}</span>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <XMarkIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <span
                            className={`h-2 w-2 rounded-full ${priorityIndicators[task.priority]}`}
                          ></span>
                          <span className="text-xs opacity-75">
                            {isSameDay(task.start, day.date)
                              ? format(task.start, 'h:mm')
                              : 'all day'}
                            {isSameDay(task.end, day.date)
                              ? ` - ${format(task.end, 'h:mm a')}`
                              : ''}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Month View */}
        {viewMode === 'month' && (
          <div
            className="w-full overflow-auto"
            style={{ height: 'calc(100vh - 130px)' }}
          >
            {/* Weekday headers */}
            <div className="grid grid-cols-7 text-center border-b border-gray-200">
              <div className="py-2 font-medium">Sun</div>
              <div className="py-2 font-medium">Mon</div>
              <div className="py-2 font-medium">Tue</div>
              <div className="py-2 font-medium">Wed</div>
              <div className="py-2 font-medium">Thu</div>
              <div className="py-2 font-medium">Fri</div>
              <div className="py-2 font-medium">Sat</div>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {monthDays.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-32 border-b border-r border-gray-200 p-2 ${
                    day.isCurrentMonth
                      ? day.isWeekend
                        ? 'bg-gray-50'
                        : ''
                      : 'bg-gray-100'
                  } ${
                    dragOverDay && isSameDay(dragOverDay, day.date)
                      ? 'bg-purple-50'
                      : ''
                  }`}
                  onClick={(e) => handleDayClick(e, day.date)}
                  onDragOver={(e) => handleDragOver(e, day.date)}
                  onDrop={(e) => handleDrop(e, day.date)}
                >
                  <div
                    className={`
                  text-right mb-2
                  ${day.isToday ? 'bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center ml-auto' : ''}
                  ${!day.isCurrentMonth ? 'text-gray-400' : ''}
                `}
                  >
                    {day.day}
                  </div>
                  <div className="space-y-1">
                    {getTasksForDay(day.date).map((task) => {
                      // Determine if this is the first day, last day, or middle day of the task
                      const isFirstDay = isSameDay(task.start, day.date);
                      const isLastDay = isSameDay(task.end, day.date);

                      return (
                        <div
                          key={task.id}
                          className={`
                            ${statusColors[task.status]} 
                            border-l-4 rounded p-1 text-xs cursor-move group
                            ${draggedTask?.id === task.id ? 'opacity-50' : ''}
                          `}
                          onClick={(e) => e.stopPropagation()}
                          draggable={true}
                          onDragStart={(e) => handleDragStart(e, task)}
                          onDragEnd={handleDragEnd}
                        >
                          <div className="flex justify-between items-center">
                            <span className="truncate">
                              {task.title}
                              {!isFirstDay && !isLastDay && ' (cont.)'}
                            </span>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <XMarkIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                            </button>
                          </div>
                          {isFirstDay && task.start.getHours() !== 0 && (
                            <div className="text-xs opacity-75">
                              From {format(task.start, 'h:mm a')}
                              {isLastDay
                                ? ` to ${format(task.end, 'h:mm a')}`
                                : ''}
                            </div>
                          )}
                          {!isFirstDay &&
                            isLastDay &&
                            task.end.getHours() !== 0 && (
                              <div className="text-xs opacity-75">
                                Until {format(task.end, 'h:mm a')}
                              </div>
                            )}
                          {!isFirstDay && !isLastDay && (
                            <div className="text-xs opacity-75">All day</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Task Form */}
        {showTaskForm && (
          <div
            className="task-form absolute  border border-gray-300 rounded-lg p-4 shadow-md w-80 z-20"
            style={{
              top: `${formPosition.top}px`,
              left: `${formPosition.left}px`,
            }}
          >
            <div className="mb-3">
              <input
                type="text"
                placeholder="Task name"
                className="w-full p-2 border border-gray-300 rounded mb-3"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Start
                </label>
                <div className="flex flex-col gap-1">
                  <input
                    type="date"
                    className="p-1 border border-gray-300 rounded text-sm"
                    value={format(newTask.start as Date, 'yyyy-MM-dd')}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      const start = new Date(newTask.start as Date);
                      start.setFullYear(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate()
                      );
                      setNewTask({ ...newTask, start });
                    }}
                  />
                  <input
                    type="time"
                    className="p-1 border border-gray-300 rounded text-sm"
                    value={format(newTask.start as Date, 'HH:mm')}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value
                        .split(':')
                        .map(Number);
                      const start = new Date(newTask.start as Date);
                      start.setHours(hours, minutes);
                      setNewTask({ ...newTask, start });
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">End</label>
                <div className="flex flex-col gap-1">
                  <input
                    type="date"
                    className="p-1 border border-gray-300 rounded text-sm"
                    value={format(newTask.end as Date, 'yyyy-MM-dd')}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      const end = new Date(newTask.end as Date);
                      end.setFullYear(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate()
                      );
                      setNewTask({ ...newTask, end });
                    }}
                  />
                  <input
                    type="time"
                    className="p-1 border border-gray-300 rounded text-sm"
                    value={format(newTask.end as Date, 'HH:mm')}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value
                        .split(':')
                        .map(Number);
                      const end = new Date(newTask.end as Date);
                      end.setHours(hours, minutes);
                      setNewTask({ ...newTask, end });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full p-1 border border-gray-300 rounded text-sm"
                  value={newTask.status}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      status: e.target.value as Task['status'],
                    })
                  }
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  className="w-full p-1 border border-gray-300 rounded text-sm"
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      priority: e.target.value as Task['priority'],
                    })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowTaskForm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
                onClick={handleAddTask}
              >
                Create Task
              </button>
            </div>
          </div>
        )}
      </div>
    </Main>
  );
};
