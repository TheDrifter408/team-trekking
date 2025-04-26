import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Main } from '@/components/layout/main.tsx';
import { DataTable } from '@/components/dataTable/data-table.tsx';
import { columns } from '@/pages/dashboard/components/columns.tsx';
import { HeaderType } from '@/types/props/common.ts';
import { ListCard } from './components/list-card.tsx';
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

  // Add state for filter value
  const [filterValue, setFilterValue] = useState('');

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
    <div className={''}>
      <PageHeader currentPage={currentPage} parents={parents} />
      <Main>
        <div className="px-6">
          <ListCard filterValue={filterValue} onFilterChange={setFilterValue} />
          <DataTable
            columns={columns}
            data={tasks}
            onDataChange={handleDataChange}
            filterValue={filterValue}
            onFilterChange={setFilterValue}
          />
        </div>
      </Main>
    </div>
  );
};
