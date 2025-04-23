import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Main } from '@/components/layout/main.tsx';
import { DataTable } from '@/components/dataTable/data-table.tsx';
import { columns } from '@/pages/dashboard/components/columns.tsx';
import { HeaderType } from '@/types/props/common.ts';
import { PageHeader } from '@/components/layout/page-header';
import * as Task from '@/mock/task.ts';

const convertDates = (task: any): any => ({
  ...task,
  startDate: new Date(task.startDate),
  dueDate: new Date(task.dueDate),
  subRows: task.subRows?.map(convertDates) || [],
});

export const List = () => {
  const currentPage = {
    type: 'LIST' as HeaderType,
    label: 'Steps',
  };
  const parents = [
    { meta: 'SPACE' as HeaderType, label: 'ProjecX Moon', link: '/space' },
    { meta: 'FOLDER' as HeaderType, label: 'Space Shuttle', link: '/folder' },
  ];
  // Use state to manage tasks data
  const [tasks, setTasks] = useState(() => Task.data.map(convertDates));

  // Handle data updates from drag and drop
  const handleDataChange = (newData: any[]) => {
    // Important: Create a completely new reference to ensure React detects the change
    const updatedTasks = JSON.parse(JSON.stringify(newData));

    // Re-convert dates after JSON parsing
    const processedTasks = updatedTasks.map(convertDates);

    // Update state with the new processed data
    setTasks(processedTasks);
  };

  return (
    <>
      <PageHeader currentPage={currentPage} parents={parents} />
      <Main>
        <div className="flex flex-col min-h-screen">
          <div className="px-4 rounded-lg">
            <div className="flex justify-end items-center my-2">
              <Button size="sm" className="w-auto" onClick={() => {}}>
                Add Task
              </Button>
            </div>
            <DataTable
              columns={columns}
              data={tasks}
              onDataChange={handleDataChange}
            />
          </div>
        </div>
      </Main>
    </>
  );
};
