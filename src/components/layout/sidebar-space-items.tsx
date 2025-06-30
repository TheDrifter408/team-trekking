import { ReactNode, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
} from '@/components/shadcn-ui/collapsible.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { IconCaretRightFilled } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { ContextMenu } from '@/components/common/context-menu.tsx';
import { Icon } from '@/assets/icon-path.tsx';
import { spacesMenuConfig } from '@/lib/constants/staticData.ts';
import { cn } from '@/lib/utils/utils.ts';
import { PlaceholderAvatar } from '@/components/common/avatar-generator.tsx';
import { CreateList } from '../features/create-list';
import { MenuItem, SubmenuItem } from '@/types/interfaces/ContextMenu';
import { ACTION } from '@/lib/constants';
import { UpdateSpace } from '../features/update-space';
import { ShareSpaceDialog } from '@/components/common/share-space-dialog';
import { CreateFolder } from '../features/create-folder';

interface Props {
  space: {
    id: number;
    name: string;
    description: string;
    shareLink?: string;
    folders: {
      id: number;
      name: string;
      lists: {
        id: number;
        name: string;
        taskNumber: number;
      }[];
    }[];
  };
  children: ReactNode;
}

export const SidebarSpaceItems = ({ space, children }: Props) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isShareSpace, setIsShareSpace] = useState(false);
  const [isEditingSpace, setIsEditingSpace] = useState(false);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);

  const onToggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const onClickItem = (item: MenuItem | SubmenuItem, event?: MouseEvent) => {
    event?.stopPropagation(); // to prevent the modal from closing as parent is closing
    if (item.action && item.action === ACTION.CREATE_LIST) {
      setIsCreateListOpen(true);
    } else if (item.action && item.action === ACTION.EDIT_SPACE) {
      setIsEditingSpace(true);
    } else if (item.action && item.action === ACTION.CREATE_FOLDER) {
      setIsCreateFolderOpen(true);
    }
  };

  return (
    <>
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
                <PlaceholderAvatar
                  className={'w-[20px] h-[20px] font-medium text-xl rounded-sm'}
                  variant={'initials'}
                  seed={space.name}
                />
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
                        {space.name}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{space.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <ContextMenu
            trigger={
              <Button size={'icon'} variant={'ghost'} className={'h-5 w-5'}>
                <Icon name={'menu03'} />
              </Button>
            }
            sections={spacesMenuConfig}
            width="w-64"
            onItemClick={(item) => onClickItem(item)}
            hasButton={true}
            buttonElement={
              <Button
                type={'button'}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // prevent closing ContextMenu
                  setTimeout(() => setIsShareSpace(true), 0); // delay state update to avoid ContextMenu unmount issues
                }}
                className="w-full mt-2 rounded-xl"
              >
                Sharing &amp; Permissions
              </Button>
            }
          />
        </div>
        <CreateList
          space={space}
          createListOpen={isCreateListOpen}
          setCreateListOpen={setIsCreateListOpen}
        />
        <CreateFolder
          createFolderOpen={isCreateFolderOpen}
          setCreateFolderOpen={setIsCreateFolderOpen}
        />
        <UpdateSpace
          isActive={isEditingSpace}
          setIsActive={setIsEditingSpace}
        />
        <ShareSpaceDialog
          isOpen={isShareSpace}
          setIsOpen={setIsShareSpace}
          space={space}
        />
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
    </>
  );
};
