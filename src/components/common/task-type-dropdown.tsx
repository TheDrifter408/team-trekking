import React, { ReactNode, useState } from 'react';
import {
  Check,
  HelpCircle,
  Circle,
  Diamond,
  FileText,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';

// Mock constants - replace with your actual constants
const LABEL = {
  TASK_TYPES: 'Task Types',
};

interface TaskTypeDropdownProps {
  children: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
}

interface TaskType {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<any>;
}

const TaskTypeDropdown: React.FC<TaskTypeDropdownProps> = ({
  children,
  value = 'task',
  onChange = () => {},
}) => {
  const [selectedTaskType, setSelectedTaskType] = useState<string>(value);

  const taskTypes: TaskType[] = [
    {
      id: 'task',
      label: 'Task',
      description: '(default)',
      icon: Circle,
    },
    {
      id: 'milestone',
      label: 'Milestone',
      icon: Diamond,
    },
    {
      id: 'form-response',
      label: 'Form Response',
      icon: FileText,
    },
    {
      id: 'meeting-note',
      label: 'Meeting Note',
      icon: Calendar,
    },
  ];

  const onHandleTaskTypeChange = (taskTypeId: string): void => {
    setSelectedTaskType(taskTypeId);
    onChange(taskTypeId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 p-0" align="start">
        <Card className="bg-white shadow-none border-0 rounded-2xl">
          <CardContent className="px-3">
            {/* Task Types Header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-400 font-medium text-[12px] leading-none">
                {LABEL.TASK_TYPES}
              </span>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>

            {/* Task Type Options */}
            <div className="gap-1">
              {taskTypes.map((taskType) => {
                const Icon = taskType.icon;
                const isSelected = selectedTaskType === taskType.id;

                return (
                  <Button
                    key={taskType.id}
                    variant="ghost"
                    className="w-full justify-between p-3 hover:bg-gray-50 rounded-lg"
                    onClick={() => onHandleTaskTypeChange(taskType.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {taskType.label}
                        </span>
                        {taskType.description && (
                          <span className="text-sm text-gray-500">
                            {taskType.description}
                          </span>
                        )}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default TaskTypeDropdown;
