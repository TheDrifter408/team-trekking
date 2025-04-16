import { ReactNode, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible.tsx';
import { Button } from '@/components/ui/button.tsx';
import { IconCaretRightFilled } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SidebarSpacePopup } from '@/components/layout/sidebar-space-popup.tsx';

interface Props {
  name: string;
  children: ReactNode;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

export const SidebarSpaceItems = ({ name, children }: Props) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const initials = getInitials(name).slice(0, 3);

  return (
    <Collapsible>
      <div
        className="flex items-center justify-between rounded-lg bg-secondary hover:bg-muted transition-colors duration-200 group/space"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center flex-1  ">
          {!isHovered ? (
            <div className="h-6 w-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-medium">
              {initials}
            </div>
          ) : (
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 transition-all"
              >
                <IconCaretRightFilled className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
              </Button>
            </CollapsibleTrigger>
          )}
          <div className="flex flex-1 items-center">
            <Button
              variant={'link'}
              size={'sm'}
              onClick={() => navigate('/space')}
              className={
                ' hover:text-primary hover:underline underline-gray-600 decoration-1 underline-offset-4 transition-colors duration-600'
              }
            >
              <span className="text-xs truncate max-w-[95px] ">{name}</span>
            </Button>
          </div>
        </div>
        <SidebarSpacePopup />
      </div>

      <CollapsibleContent>
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className=" pl-2 mt-1 space-y-1 border-l border-gray-200 ml-3"
        >
          {children}
        </motion.div>
      </CollapsibleContent>
    </Collapsible>
  );
};
