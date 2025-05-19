'use client';

import { Main } from '@/components/layout/main.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { recentData } from '@/mock';
import { WELCOME_MESSAGE } from '@/lib/constants';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { cn } from '@/lib/utils';
import { List, Circle } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div>
      <Main>
        <div className="p-[25px] h-screen">
          <span className="text-3xl font-semibold ml-3">{WELCOME_MESSAGE}</span>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <Card className="h-[336px] w-full">
              <CardHeader>
                <CardTitle>Recents</CardTitle>
              </CardHeader>
              <CardContent className="overflow-y-scroll space-y-1 !px-[10px]">
                {recentData.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 hover:bg-accent py-1 rounded"
                  >
                    <div className="w-[20px]">
                      {item.type === 'List' ? (
                        <List size={15} className={'bg-text-muted'} />
                      ) : (
                        <Circle size={15} className={'bg-text-muted'} />
                      )}
                    </div>
                    <div className="relative w-[45%] shrink-0">
                      <span className="block text-base font-normal whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-muted-foreground w-[45%] text-base truncate">
                      {item.location}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="h-[336px] w-full">
              <CardHeader>
                <CardTitle>My Work</CardTitle>
              </CardHeader>
              <CardContent className="overflow-y-scroll space-y-1 !px-[10px]"></CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </div>
  );
};
