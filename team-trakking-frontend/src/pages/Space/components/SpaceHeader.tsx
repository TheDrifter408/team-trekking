import React from 'react';
import { Button } from '@/components';
import { LayoutDashboard, List } from 'lucide-react';

export const SpaceHeader: React.FC = () => {
  return (
    <div className="sticky top-12 py-2 z-20 border-b border-border-primary shadow-sm bg-header-secondary">
      <div className="flex flex-row gap-2 mb-1 px-6">
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
