import { useState, useMemo, useCallback } from 'react';
import { HeaderType } from '@/types/props/Common.ts';
import { ListCard } from '@/pages/list/components/list-card.tsx';
import { PageHeader } from '@/components/layout/page-header';
import { DataTable } from '@/components/data-table/data-table.tsx';
import {
  createDataTableStore,
  DataTableProvider,
} from '@/stores/zustand/data-table-store.ts';

export const List = () => {
  const currentPage = useMemo(
    () => ({
      type: 'LIST' as HeaderType,
      label: 'Steps',
    }),
    []
  );

  const parents = useMemo(
    () => [
      { meta: 'SPACE' as HeaderType, label: 'ProjecX Moon', link: '/space' },
      { meta: 'FOLDER' as HeaderType, label: 'Space Shuttle', link: '/folder' },
    ],
    []
  );

  const [isTableExpanded, setIsTableExpanded] = useState(true);

  const onToggleExpand = useCallback(() => {
    setIsTableExpanded(!isTableExpanded);
  }, [isTableExpanded]);

  const store = createDataTableStore({});

  return (
    <DataTableProvider value={store}>
      <div className="flex flex-col h-screen overflow-hidden">
        <PageHeader currentPage={currentPage} parents={parents} />
        <DrawerDemo />

        <div className="flex-1 min-h-0 flex flex-col px-[20px] mt-[40px] flex-shrink-0">
          <ListCard
            isTableExpanded={isTableExpanded}
            onToggleExpand={onToggleExpand}
          />
          <DataTable />
        </div>
      </div>
    </DataTableProvider>
  );
};

import * as React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';

import { Button } from '@/components/shadcn-ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/shadcn-ui/drawer';

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

const DrawerDemo = () => {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Drawer direction={'right'}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[calc(100vh-92px)]">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
                disabled={goal <= 200}
              >
                <Minus />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-muted-foreground text-[0.70rem] uppercase">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={
                      {
                        fill: 'hsl(var(--foreground))',
                        opacity: 0.9,
                      } as React.CSSProperties
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default List;
