import { createFileRoute, useParams } from '@tanstack/react-router';
import { FC } from 'react';
import { TaskDialog } from './-components/task-dialog';
import TaskLayout from '@/components/layout/task-layout';
import { motion } from 'framer-motion';
const TaskComponent: FC = () => {
  const { taskId } = useParams({ from: '/_auth/task/$taskId' });
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.25, 0, 1] }}
      className="h-full"
    >
      <TaskLayout>
        <TaskDialog taskId={taskId} />
      </TaskLayout>
    </motion.div>
  );
};

export const Route = createFileRoute('/_auth/task/$taskId')({
  component: TaskComponent,
});
