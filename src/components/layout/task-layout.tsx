import { FC, ReactNode } from 'react';
import { Outlet } from '@tanstack/react-router';
import { Dialog, DialogContent } from '@/components/shadcn-ui/dialog';

interface TaskLayoutProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: ReactNode;
}

const TaskLayout: FC<TaskLayoutProps> = ({ open, onOpenChange, children }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-full p-0" hideCloseButton>
        <div className="flex flex-col h-screen">
          <div className="relative flex flex-1 overflow-hidden">
            {children ?? <Outlet />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default TaskLayout;
