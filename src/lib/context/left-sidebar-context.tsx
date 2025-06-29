import {
  forwardRef,
  MouseEvent,
  PropsWithChildren,
  useState,
  createContext,
  useContext,
} from 'react';
import { ButtonProps } from '@headlessui/react';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { cn } from '@/lib/utils/utils.ts';

interface ContextType {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

const SidebarContext = createContext<ContextType | undefined>(undefined);
const useTaskSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useTaskSidebar must be used within TaskSidebarProvider');
  }
  return context;
};
export const LeftSidebarProvider = ({
  children,
  defaultOpen = false,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, open, close }}>
      {children}
    </SidebarContext.Provider>
  );
};

type TaskSidebarTriggerProps = PropsWithChildren<
  Omit<ButtonProps, 'onClick'> & {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
  }
>;

export const TaskSidebarTrigger = forwardRef<
  HTMLButtonElement,
  TaskSidebarTriggerProps
>(({ children, className, onClick, ...props }, ref) => {
  const { toggle } = useTaskSidebar();

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn('items-center justify-center h-auto', className)}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.(event);
        toggle();
      }}
      {...props}
    >
      {children}
    </Button>
  );
});

TaskSidebarTrigger.displayName = 'TaskSidebarTrigger';
