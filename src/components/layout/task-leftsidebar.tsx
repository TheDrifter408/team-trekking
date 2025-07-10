'use client';
import {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { cn, handleMutation } from '@/lib/utils/utils.ts';
import { Task } from '@/types/request-response/task/ApiResponse';
import { ChevronRight, Edit, Ellipsis, Plus } from 'lucide-react';
import { Icon } from '@/assets/icon-path';
import { useNavigate } from '@tanstack/react-router';
import {
  useGetSubtasksQuery,
  useUpdateTaskMutation,
} from '@/service/rtkQueries/taskQuery';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/shadcn-ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

interface TaskListProps {
  task?: Task;
}

export const TaskList: FC<TaskListProps> = ({ task }) => {
  const { data: subTasks, isFetching } = useGetSubtasksQuery(task.id, {
    skip: !task?.id,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task?.name || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [updateTask] = useUpdateTaskMutation();

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value);
  };

  const onInputBlur = () => {
    if (!isEditing) return;

    const trimmedName = taskName.trim();

    // If empty, revert to original name
    if (!trimmedName) {
      setTaskName(task ? task.name : '');
      setIsEditing(false);
      return;
    }

    // If no change, just exit edit mode
    if (trimmedName === task?.name) {
      setIsEditing(false);
      return;
    }

    // Save the change (call your RTK mutation here)
    // updateSubtaskName({ id: subtask.id, name: trimmedName });
    setIsEditing(false);
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.preventDefault();
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      // Cancel editing - revert to original name
      setTaskName(task ? task.name : '');
      setIsEditing(false);
      inputRef.current?.blur(); // Remove focus
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await handleMutation(updateTask, {
        id: task?.id,
        name: taskName,
      });
      toast.success(`Task updated`);
      setIsEditing(false);
    } catch (e) {
      toast.error('Could not update task');
    }
  };

  const onEditName = () => {
    setIsEditing(true);
    return;
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      // Small delay to ensure input is enabled
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(taskName.length, taskName.length);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isEditing]);

  if (isFetching) {
    return <LoadingSubtasks />;
  }

  return (
    <>
      <div className="pl-2 flex items-center justify-between hover:bg-slate-300 group">
        <div className="flex gap-2 py-2">
          <Icon name="progress2" className="text-green-500" />
          <form ref={formRef} className="bg-inherit" onSubmit={onSubmit}>
            <input
              value={taskName}
              className="bg-inherit focus:outline-0 focus:ring-0"
              disabled={!isEditing}
              onChange={onNameChange}
              onBlur={onInputBlur}
              onKeyDown={onInputKeyDown}
              ref={inputRef}
            />
          </form>
        </div>
        <div className="flex">
          <SubtaskDropdown
            trigger={
              <Button variant={'ghost'} size="icon_sm">
                <Ellipsis />
              </Button>
            }
          >
            <DropdownMenuItem
              onClick={(e) => {
                onEditName();
                e.stopPropagation();
              }}
              className="flex items-center justify-between px-4 py-1.5 text-sm hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Edit />
                <span className="text-gray-900">{'Rename'}</span>
              </div>
            </DropdownMenuItem>
          </SubtaskDropdown>
          <Button variant={'ghost'} size="icon_sm">
            <Plus />
          </Button>
        </div>
      </div>
      {subTasks?.map((task, idx) => (
        <ExpandableSubTasks key={idx} subtask={task} />
      ))}
    </>
  );
};

interface ExpandableSubtasks {
  subtask: Task;
  depth?: number;
}

const ExpandableSubTasks = ({ subtask, depth = 0 }: ExpandableSubtasks) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(subtask.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [updateTask] = useUpdateTaskMutation();

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value);
  };

  const onInputBlur = () => {
    if (!isEditing) return;

    const trimmedName = taskName.trim();

    // If empty, revert to original name
    if (!trimmedName) {
      setTaskName(subtask.name);
      setIsEditing(false);
      return;
    }

    // If no change, just exit edit mode
    if (trimmedName === subtask.name) {
      setIsEditing(false);
      return;
    }

    // Save the change (call your RTK mutation here)
    // updateSubtaskName({ id: subtask.id, name: trimmedName });
    setIsEditing(false);
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.preventDefault();
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      // Cancel editing - revert to original name
      setTaskName(subtask.name);
      setIsEditing(false);
      inputRef.current?.blur(); // Remove focus
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await handleMutation(updateTask, {
        id: subtask.id,
        name: taskName,
      });
      toast.success(`Task updated`);
      setIsEditing(false);
    } catch (e) {
      toast.error('Could not update task');
    }
  };

  const onEditName = () => {
    setIsEditing(true);
    return;
  };

  const onTaskClick = (e: MouseEvent<HTMLDivElement>) => {
    // Don't navigate the user if isEditing === true
    if (isEditing) {
      return;
    }
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }

    navigate({ to: `/task/${subtask.id}` });
  };

  const onToggleExpand = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const hasSubtasks = subtask.subTasks && subtask.subTasks.length > 0;
  const depthPadding = `pl-${depth * 4 + 1}`;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      // Small delay to ensure input is enabled
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(taskName.length, taskName.length);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isEditing]);

  return (
    <div className="w-full">
      {/* outer row to handle the full width row hover */}
      <div
        className="group w-full hover:bg-slate-300"
        onClickCapture={onTaskClick}
      >
        {/* Indented inner row content */}
        <div
          className={`flex items-center justify-between gap-2 ${depthPadding}`}
        >
          <div className="flex items-center gap-2">
            {/* Expand Icon */}
            <Button
              variant={'ghost'}
              onClick={onToggleExpand}
              size={'icon_sm'}
              className={cn(
                'hover:bg-slate-200 p-1 m-0 ml-1 w-min h-min',
                hasSubtasks ? 'visible' : 'invisible',
                isExpanded ? 'rotate-90' : 'rotate-0'
              )}
            >
              <ChevronRight size={12} />
            </Button>
            <div>
              <Icon name="progress2" className="text-green-500" />
            </div>
            <form ref={formRef} className="bg-inherit" onSubmit={onSubmit}>
              <input
                value={taskName}
                className="py-2 bg-inherit focus:outline-0 focus:ring-0"
                disabled={!isEditing}
                onChange={onNameChange}
                onBlur={onInputBlur}
                onKeyDown={onInputKeyDown}
                ref={inputRef}
              />
            </form>
          </div>
          {/* Hover buttons on far right */}
          <div className="flex">
            <SubtaskDropdown
              trigger={
                <Button variant={'ghost'} size="icon_sm">
                  <Ellipsis />
                </Button>
              }
            >
              <DropdownMenuItem
                onClick={(e) => {
                  onEditName();
                  e.stopPropagation();
                }}
                className="flex items-center justify-between px-4 py-1.5 text-sm hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Edit />
                  <span className="text-gray-900">{'Rename'}</span>
                </div>
              </DropdownMenuItem>
            </SubtaskDropdown>
            <Button variant={'ghost'} size="icon_sm">
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isExpanded && hasSubtasks && (
          <motion.div
            layoutId={`subtask-${subtask.id}`}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: 'auto', opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
            style={{ originY: 0 }}
            className="space-y-1 overflow-hidden"
          >
            {subtask.subTasks?.map((s) => (
              <ExpandableSubTasks key={s.id} subtask={s} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LoadingSubtasks = () => {
  return (
    <div className="flex items-center gap-1 hover:bg-slate-200 py-1 animate-pulse">
      {/* Expand Icon Placeholder */}
      <div className="max-w-[40px] flex-shrink-0 flex justify-start items-center">
        <div className="w-5 h-5 bg-gray-300 rounded-sm ml-2" />
      </div>

      {/* Icon Placeholder */}
      <div>
        <div className="w-5 h-5 bg-gray-300 rounded-full" />
      </div>

      {/* Content Placeholder */}
      <div className="flex flex-col overflow-hidden flex-1">
        <div className="flex items-center overflow-hidden px-2">
          {/* Task name skeleton */}
          <div className="h-4 bg-gray-300 rounded w-40" />

          {/* Action buttons */}
          <div className="flex ml-auto gap-1">
            <div className="w-5 h-5 bg-gray-300 rounded" />
            <div className="w-5 h-5 bg-gray-300 rounded" />
          </div>
        </div>

        {/* Subtask rows skeleton */}
        <div className="grid grid-rows-2 mt-1 gap-1">
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-3 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
};

interface SubtaskDropdown {
  trigger: ReactNode;
  children: ReactNode;
}

const SubtaskDropdown = ({ trigger, children }: SubtaskDropdown) => {
  return (
    <DropdownMenu modal={true}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent
        className={`w-10 py-3 bg-white border border-gray-200 rounded-xl shadow-lg`}
        align={'start'}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
