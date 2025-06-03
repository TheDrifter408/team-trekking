import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/shadcn-ui/collapsible';
import { Folder, ListIcon } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { cn } from '@/lib/utils';
import { IconCaretRightFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/assets/icon-path.tsx';
import { folderMenuConfig } from '@/lib/constants/staticData.ts';
import { ContextMenu } from '@/components/context-menu.tsx';
import { SidebarFolderItemsProps } from '@/types/props/Common';

export const SidebarFolderItems = ({
  name,
  folder,
}: SidebarFolderItemsProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonEntered, setIsButtonEntered] = useState(false);
  const listData = folder.lists;

  return (
    <>
      <Collapsible>
        <div
          className="flex h-[36px] items-center justify-between rounded-lg hover:bg-muted transition-colors duration-200 group/space"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center">
            {!isHovered ? (
              <Folder className="h-4 w-4 ml-1  text-indigo-600" />
            ) : (
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 p-0 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 transition-all"
                >
                  <IconCaretRightFilled className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                </Button>
              </CollapsibleTrigger>
            )}

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
              onItemClick={() => {}}
            />
          )}
        </div>

        <CollapsibleContent className="pl-6 mt-1 space-y-1">
          {listData &&
            listData.length > 0 &&
            listData.map((listItem) => (
              <div
                key={listItem.id}
                className="flex items-center justify-between px-1 rounded-md hover:bg-gray-200 transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <ListIcon className="h-3 w-3 text-blue-700" />
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
                  onItemClick={() => {}}
                />
              </div>
            ))}
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
