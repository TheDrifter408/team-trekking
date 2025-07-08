import { FC, ReactNode } from 'react';
import { Outlet } from '@tanstack/react-router';

interface TaskLayoutProps {
  children?: ReactNode;
}

const TaskLayout: FC<TaskLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="relative flex flex-1">{children ?? <Outlet />}</div>
    </div>
  );
};
export default TaskLayout;
