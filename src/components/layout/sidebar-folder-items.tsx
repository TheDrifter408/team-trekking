import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
} from '@/components/shadcn-ui/collapsible';
import { ListIcon } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { cn } from '@/lib/utils';
import { IconCaretRightFilled, IconFolder, IconFolderOpen } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/assets/icon-path.tsx';
import { folderMenuConfig } from '@/lib/constants/staticData.ts';
import { ContextMenu } from '@/components/common/context-menu.tsx';
import { SidebarFolderItemsProps } from '@/types/props/Common';

export const SidebarFolderItems = ({
  name,
  folder,
}: SidebarFolderItemsProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonEntered, setIsButtonEntered] = useState(false);
  const listData = folder.lists;

  const onToggleCollapse = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Collapsible open={isOpen}>
        <div
          className="flex h-[36px] items-center justify-between rounded-lg hover:bg-muted transition-colors duration-200 group/space"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center">
            <Button
              onClick={onToggleCollapse}
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 text-muted-foreground hover:bg-indigo-100 transition-all"
            >
              {
                !isHovered ? isOpen ? (
                  <IconFolderOpen />
                ) : (
                  <IconFolder />
                ) : (
                  <IconCaretRightFilled className={cn(
                    "h-4 w-4 transition-transform",
                    isOpen ? 'rotate-90' : 'rotate-0'
                  )} />
                )
              }
            </Button>

            <div className="flex flex-1 items-center">
              <Button
                variant={'link'}
                size={'sm'}
                onMouseEnter={() => setIsButtonEntered(true)}
                onMouseLeave={() => setIsButtonEntered(false)}
                onClick={() => navigate('/folder')}
                className={
                  'text-sm hover:text-primary hover:underline underline-gray-600 decoration-1 underline-offset-4 transition-colors duration-600'
                }
              >
                <span
                  className={cn(
                    'text-xs truncate',
                    isButtonEntered ? 'max-w-[120px]' : 'max-w-[80px] '
                  )}
                >
                  {name}
                </span>
              </Button>
            </div>
          </div>
          {!isButtonEntered && (
            <ContextMenu
              trigger={
                <Button size={'icon'} variant={'ghost'} className={'h-5 w-5'}>
                  <Icon name={'menu03'} />
                </Button>
              }
              sections={folderMenuConfig}
              width="w-64"
              onItemClick={() => { }}
            />
          )}
        </div>

        <CollapsibleContent className="pl-6 mt-1 space-y-1">
          {listData.map((listItem) => (
              <div
                key={listItem.id}
                className="flex items-center justify-between pl-1 rounded-md hover:bg-gray-200 transition-all duration-200"
              >
                <div className="flex items-center">
                  <div className="flex items-center">
                    <ListIcon className="w-3 text-muted-foreground" />
                    <Button
                      variant={'link'}
                      size={'sm'}
                      onMouseEnter={() => setIsButtonEntered(true)}
                      onMouseLeave={() => setIsButtonEntered(false)}
                      className={
                        'text-sm hover:text-primary hover:underline underline-gray-600 decoration-1 underline-offset-4 transition-colors duration-600'
                      }
                    >
                      <span
                        onClick={() => navigate('/link')}
                        className={cn('text-xs truncate')}
                      >
                        {listItem.name}
                      </span>
                    </Button>
                  </div>
                </div>
                <ContextMenu
                  trigger={
                    <Button
                      size={'icon'}
                      variant={'ghost'}
                      className={'h-5 w-5'}
                    >
                      <Icon name={'menu03'} />
                    </Button>
                  }
                  sections={folderMenuConfig}
                  width="w-64"
                  onItemClick={() => { }}
                />
              </div>
            ))}
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
