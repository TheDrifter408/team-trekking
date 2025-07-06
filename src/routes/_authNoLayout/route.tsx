import TaskLayout from '@/components/layout/task-layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authNoLayout')({
  component: TaskLayout,
});
