import React from 'react';
import { Button } from '@/components';
import { LayoutDashboard, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const WorkspaceHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-12 py-2 z-20 border-b border-border-primary shadow-sm bg-accent-header">
      <div className="flex flex-row gap-2 mb-1 px-6">
        <Button
          size={'sm'}
          className={'w-auto hover:bg-button-hover'}
          variant={'outline'}
          onClick={() => navigate('/workspace/1')}
        >
          <div className="flex gap-2 justify-center items-center">
            <LayoutDashboard className={'h-4'} />
            <span className="font-normal text-sm">Overview</span>
          </div>
        </Button>
        <Button
          size={'sm'}
          className={'w-auto hover:bg-button-hover'}
          variant={'outline'}
        >
          <div
            className="flex gap-2 justify-center items-center "
            onClick={() => navigate('/list/1')}
          >
            <List className={'h-4'} />
            <span className="font-normal text-sm">List</span>
          </div>
        </Button>
      </div>
    </div>
  );
};
