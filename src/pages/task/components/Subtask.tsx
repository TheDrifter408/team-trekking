import { Button } from '@/components/shadcn-ui/button.tsx';
import { Plus } from 'lucide-react';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableTaskRow } from '@/pages/task/components/sortable-task-row.tsx';
import { ChangeEvent } from 'react';
import { Task } from '@/types/props/Common';

interface SubtaskProps {
  onPressAddSubtask: () => void;
  sensors: any;
  onHandleSubtaskSelect: (taskId: number) => void;
  onHandleSubtaskDragEnd: (event: DragEndEvent) => void;
  onHandleSelectAllSubtasks: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedSubtasks: Set<number>;
  task: Task;
}

export const Subtask = ({
  onPressAddSubtask,
  sensors,
  onHandleSubtaskDragEnd,
  onHandleSelectAllSubtasks,
  selectedSubtasks,
  task,
  onHandleSubtaskSelect,
}: SubtaskProps) => {
  return (
    <div className="rounded-lg shadow-sm">
      <div className="flex justify-between items-center py-2 px-2 mb-2  ">
        <h3 className="text-lg font-medium text-gray-900">Subtasks</h3>
        <Button
          size={'icon'}
          className={'bg-indigo-600 h-6 w-6 rounded-1 mr-1'}
          onClick={onPressAddSubtask}
        >
          <Plus color={'white'} size={18} />
        </Button>
      </div>
      <div className="bg-accent rounded-lg shadow overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onHandleSubtaskDragEnd}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="sticky left-0 bg-gray-50 px-6 py-3 text-left z-10 border-r">
                  <input
                    type="checkbox"
                    onChange={onHandleSelectAllSubtasks}
                    checked={selectedSubtasks.size === task.subTask?.length}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th className="sticky left-[68px] bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider z-10 border-r">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Est. Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <SortableContext
                items={
                  task.subTask !== undefined
                    ? task.subTask.map((st) => st.id)
                    : []
                }
                strategy={verticalListSortingStrategy}
              >
                {task.subTask !== undefined &&
                  task.subTask.map((subtask) => (
                    <SortableTaskRow
                      key={subtask.id}
                      id={subtask.id}
                      selected={selectedSubtasks.has(subtask.id)}
                      onSelect={() => onHandleSubtaskSelect(subtask.id)}
                      subtask={subtask}
                    />
                  ))}
              </SortableContext>
            </tbody>
          </table>
        </DndContext>
      </div>
    </div>
  );
};
