import { ListIcon } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { cn } from '@/lib/utils/utils.ts';
import { useNavigate } from 'react-router-dom';
import { ContextMenu } from '@/components/common/context-menu.tsx';
import { Icon } from '@/assets/icon-path.tsx';
import { listMenuConfig } from '@/lib/constants/staticData.ts';

interface ListItemProps {
  id: string;
  name: string;
}

interface Props {
  listItem: ListItemProps;
}

export const SidebarListItems = ({ listItem }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      key={listItem.id}
      className="flex items-center justify-between pl-2 rounded-md hover:bg-gray-200 transition-all duration-200"
    >
      <div className="flex items-center gap-1">
        <div className="flex items-center">
          <ListIcon className="w-3 text-muted-foreground" />
          <Button
            variant={'link'}
            size={'sm'}
            onClick={() => navigate('/list')}
            className={
              'hover:text-primary text-base no-underline hover:no-underline decoration-1 transition-colors duration-600'
            }
          >
            <span className={cn('')}>{listItem.name}</span>
          </Button>
        </div>
      </div>
      <ContextMenu
        trigger={
          <Button size={'icon'} variant={'ghost'} className={'h-5 w-5'}>
            <Icon name={'menu03'} />
          </Button>
        }
        sections={listMenuConfig}
        width="w-64"
        onItemClick={() => {}}
      />
    </div>
  );
};
