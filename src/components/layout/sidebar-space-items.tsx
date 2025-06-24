import { ReactNode, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
} from '@/components/shadcn-ui/collapsible.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import {
  IconCaretRightFilled,
  IconFolder,
  IconFolderOpen,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { UpdateSpace } from '@/components/features/update-space.tsx';
import { ContextMenu } from '@/components/common/context-menu.tsx';
import { Icon } from '@/assets/icon-path.tsx';
import { spacesMenuConfig } from '@/lib/constants/staticData.ts';
import { cn } from '@/lib/utils/utils.ts';

interface Props {
  name: string;
  children: ReactNode;
}

export const SidebarSpaceItems = ({ name, children }: Props) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isRename, setIsRename] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onToggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Collapsible open={isOpen}>
      <div
        className="flex h-[36px] ml-2 items-center justify-between rounded-lg hover:bg-muted transition-colors duration-200 group/space"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center flex-1">
          <Button
            onClick={onToggleCollapse}
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-slate-600 hover:text-slate-800 hover:bg-slate-200 transition-all"
          >
            {!isHovered ? (
              isOpen ? (
                <IconFolderOpen />
              ) : (
                <IconFolder />
              )
            ) : (
              <IconCaretRightFilled
                className={cn(
                  'h-4 w-4 transition-transform',
                  isOpen ? 'rotate-90' : 'rotate-0'
                )}
              />
            )}
          </Button>
          <div className="flex flex-1 items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/space')}
                    className="hover:text-primary transition-colors duration-600"
                  >
                    <span className="text-base truncate max-w-[120px]">
                      {name}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <Button
          onClick={() => setIsRename(true)}
          size={'icon'}
          variant={'ghost'}
          className={'h-5 w-5'}
        >
          <Icon name={'menu03'} />
        </Button>
        {/*<ContextMenu*/}
        {/*  trigger={*/}
        {/*    <Button size={'icon'} variant={'ghost'} className={'h-5 w-5'}>*/}
        {/*      <Icon name={'menu03'} />*/}
        {/*    </Button>*/}
        {/*  }*/}
        {/*  sections={spacesMenuConfig}*/}
        {/*  width="w-64"*/}
        {/*  onItemClick={() => {}}*/}
        {/*  hasButton={true}*/}
        {/*  buttonElement={*/}
        {/*    <Button*/}
        {/*      type={'button'}*/}
        {/*      onClick={(e) => {*/}
        {/*        e.preventDefault();*/}
        {/*        e.stopPropagation(); // prevent closing ContextMenu*/}
        {/*        setTimeout(() => setIsRename(true), 0); // delay state update to avoid ContextMenu unmount issues*/}
        {/*      }}*/}
        {/*      className="w-full mt-2 rounded-xl"*/}
        {/*    >*/}
        {/*      Sharing &amp; Permissions*/}
        {/*    </Button>*/}
        {/*  }*/}
        {/*/>*/}
      </div>

      <UpdateSpace isActive={isRename} setIsActive={setIsRename} />

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
