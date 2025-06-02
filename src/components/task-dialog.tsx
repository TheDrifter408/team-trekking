import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, List, SlidersHorizontal, Snowflake } from 'lucide-react';
import { LABEL } from '@/lib/constants';

interface Project {
  id: string;
  name: string;
}

interface DuplicateData {
  taskName: string;
  project: string;
  copyOption: string;
  copyActivity: boolean;
  sendNotifications: boolean;
}

interface DuplicateTaskDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
  onDuplicate?: (data: DuplicateData) => void;
  initialTaskName?: string;
  projects?: Project[];
  defaultProject?: string;
}

const TaskDialog: React.FC<DuplicateTaskDialogProps> = ({
  isOpen = false,
  onClose = () => {},
  onDuplicate = () => {},
  initialTaskName = '',
  projects = [],
  defaultProject = '',
}) => {
  const [taskName, setTaskName] = useState<string>(initialTaskName);
  const [selectedProject, setSelectedProject] =
    useState<string>(defaultProject);
  const [copyOption, setCopyOption] = useState<string>('everything');
  const [copyActivity, setCopyActivity] = useState<boolean>(false);
  const [sendNotifications, setSendNotifications] = useState<boolean>(true);

  const handleDuplicate = (): void => {
    const duplicateData: DuplicateData = {
      taskName,
      project: selectedProject,
      copyOption,
      copyActivity,
      sendNotifications,
    };
    onDuplicate(duplicateData);
    onClose();
  };

  const handleCancel = (): void => {
    // Reset form state
    setTaskName(initialTaskName);
    setSelectedProject(defaultProject);
    setCopyOption('everything');
    setCopyActivity(false);
    setSendNotifications(true);
    onClose();
  };

  const handleTaskNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTaskName(e.target.value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[520px] p-0 bg-white rounded-lg shadow-xl">
        <DialogHeader className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Duplicate task
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="px-6 py-6 space-y-6">
          {/* Task Name Input */}
          <div className="space-y-3">
            <Label
              htmlFor="task-name"
              className="text-sm font-medium text-gray-700"
            >
              New task name
            </Label>
            <div className="relative">
              <Check className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
              <Input
                id="task-name"
                value={taskName}
                onChange={handleTaskNameChange}
                className="pl-10 h-11 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter task name"
              />
            </div>
          </div>

          {/* Project Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Where should this task be created?
            </Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="h-11 border-gray-300">
                <div className="flex items-center gap-2">
                  <List className="h-4 w-4 text-gray-600" />
                  <SelectValue placeholder="Select a project" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {projects.length > 0 ? (
                  projects.map((project: Project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="final-initiative">
                    Final-Initiative
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Copy Options */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">
              {LABEL.WHAT_WOULD_YOU_LIKE_TO_COPY}
            </Label>

            <Tabs
              value={copyOption}
              onValueChange={setCopyOption}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="everything"
                  className="flex items-center gap-2"
                >
                  <Snowflake className="h-4 w-4" />
                  {LABEL.EVERYTHING}
                </TabsTrigger>
                <TabsTrigger
                  value="customize"
                  className="flex items-center gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  {LABEL.CUSTOMIZE}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="everything" className="mt-4">
                <p className="text-sm text-gray-600">
                  {
                    LABEL.ALL_COMMENTS_FIELDS_AND_SETTINGS_WILL_BE_DUPLICATED_EXACTLY_AS_IS
                  }
                </p>
              </TabsContent>

              <TabsContent value="customize" className="mt-4">
                <p className="text-sm text-gray-600">
                  {
                    LABEL.CHOOSE_SPECIFIC_ELEMENTS_TO_COPY_FROM_THE_ORIGINAL_TASK
                  }
                </p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Copy Activity Toggle */}
          <div className="flex items-start justify-between py-3 border-t border-gray-100">
            <div className="space-y-1 flex-1 pr-4">
              <Label className="text-sm font-medium text-gray-900">
                Copy the task activity
              </Label>
              <p className="text-sm text-gray-600 leading-relaxed">
                {
                  LABEL.INCLUDE_THE_FULL_HISTORY_AND_ACTIVITY_ON_THE_TASK_IN_THE_NEW_TASK
                }
              </p>
            </div>
            <Switch
              checked={copyActivity}
              onCheckedChange={setCopyActivity}
              className="mt-1"
            />
          </div>

          {/* Send Notifications Toggle */}
          <div className="flex items-start justify-between py-3">
            <div className="space-y-1 flex-1 pr-4">
              <Label className="text-sm font-medium text-gray-900">
                Send notifications
              </Label>
              <p className="text-sm text-gray-600 leading-relaxed">
                {LABEL.NOTIFY_TEAM_MEMBERS_ABOUT_THE_NEW_DUPLICATED_TASK}
              </p>
            </div>
            <Switch
              checked={sendNotifications}
              onCheckedChange={setSendNotifications}
              className="mt-1"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            {LABEL.CANCEL}
          </Button>
          <Button
            onClick={handleDuplicate}
            disabled={!taskName.trim()}
            className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-medium"
          >
            {LABEL.DUPLICATE}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default TaskDialog;
