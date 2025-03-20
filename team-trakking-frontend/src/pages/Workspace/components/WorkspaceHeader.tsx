import React from 'react';
import { Button } from '@/components';
import { LayoutDashboard, List } from 'lucide-react';

export const WorkspaceHeader: React.FC<{}> = () => {
  return (
    <div className="sticky top-12 bg-bg-primary-light py-2  border-t border-b border-border-primary shadow-sm">
      <div className="border-b mb-2 pb-2 items-center  px-6 border-border-primary">
        <span className="text-sm">Workspace</span>
      </div>
      <div className="flex flex-row gap-2 px-6">
        <Button size={'sm'} className={'w-auto '} variant={'outline'}>
          <div className="flex gap-2 justify-center items-center">
            <LayoutDashboard className={'h-4'} />
            <span className="font-normal text-sm">Overview</span>
          </div>
        </Button>
        <Button size={'sm'} className={'w-auto'} variant={'outline'}>
          <div className="flex gap-2 justify-center items-center">
            <List className={'h-4'} />
            <span className="font-normal text-sm">List</span>
          </div>
        </Button>
      </div>
    </div>
  );
};
