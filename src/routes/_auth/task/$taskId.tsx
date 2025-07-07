import { createFileRoute, useParams } from '@tanstack/react-router';
import { FC } from 'react';
import { TaskDialog } from './-components/task-dialog';

const TaskComponent: FC = () => {
  const { taskId } = useParams({ from: '/_auth/task/$taskId' });
  return (
    <div>
      <TaskDialog taskId={taskId} />
    </div>
  );
};

export const Route = createFileRoute('/_auth/task/$taskId')({
  component: TaskComponent,
});
