import { useRouter } from '@tanstack/react-router';
import TaskLayout from '@/components/layout/task-layout';
import { TaskDialog } from './task-dialog';

export const TaskDialogOverlay = () => {
  const router = useRouter();

  // Try to find a current match for /task/$taskId
  const taskMatch = router.state.matches.find(
    (m) => m.routeId === '/_auth/task/$taskId'
  );
  const taskId = taskMatch?.params?.taskId;

  const onClose = () => {
    router.history.back();
  };

  return (
    <TaskLayout
      open={taskId ? true : false}
      onOpenChange={(open) => !open && onClose()}
    >
      <TaskDialog taskId={taskId} />
    </TaskLayout>
  );
};
