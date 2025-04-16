import { ListIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { IconDots } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  listItem: any;
}

export const SidebarListItems = ({ listItem }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      key={listItem.id}
      className="flex items-center justify-between px-1 bg-secondary rounded-md hover:bg-gray-200 transition-all duration-200"
    >
      <div className="flex items-center gap-2">
        <ListIcon className="h-3 w-3 text-blue-700" />
        <Button
          variant={'link'}
          size={'sm'}
          onClick={() => navigate('/list')}
          className={
            'text-sm hover:text-primary hover:underline underline-gray-600 decoration-1 underline-offset-4 transition-colors duration-600'
          }
        >
          <span className={cn('text-xs truncate')}>{listItem.name}</span>
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-5 w-5 text-gray-500 hover:text-gray-700 hover:bg-gray-200"
      >
        <IconDots className="h-3 w-3" />
      </Button>
    </div>
  );
};
