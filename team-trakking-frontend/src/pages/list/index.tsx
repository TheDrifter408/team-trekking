import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Main } from '@/components/layout/main.tsx';
import { getColumns } from '@/pages/dashboard/components/columns.tsx';
import { HeaderType } from '@/types/props/Common.ts';
import { ListCard } from './components/list-card.tsx';
import { PageHeader } from '@/components/layout/page-header';
import * as Task from '@/mock/task.ts';
import { DataTable } from '@/components/dataTable/data-table2.tsx';

const convertDates = (task) => ({
  ...task,
  startDate: new Date(task.startDate),
  dueDate: new Date(task.dueDate),
  subRows: task.subRows?.map(convertDates) || [],
});

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

  const [tasks, setTasks] = useState(() => Task.data.map(convertDates));
  const [isTableExpanded, setIsTableExpanded] = useState(true);
  const [filterValue, setFilterValue] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const onToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDataChange = (newData: any[]) => {
    const updatedTasks = JSON.parse(JSON.stringify(newData));
    const processedTasks = updatedTasks.map(convertDates);
    setTasks(processedTasks);
  };

  const onToggleExpand = () => {
    setIsTableExpanded(!isTableExpanded);
  };

  const columns = getColumns(selectedIds, onToggleSelect, hoveredRowId);

  return (
    <div>
      <PageHeader currentPage={currentPage} parents={parents} />
      <Main>
        <div className="px-3">
          <ListCard
            isTableExpanded={isTableExpanded}
            onToggleExpand={onToggleExpand}
          />
          <AnimatePresence initial={false}>
            {isTableExpanded && (
              <motion.div
                key="table"
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.7, 0, 0.84, 0],
                }}
                style={{ overflow: 'hidden', transformOrigin: 'top' }}
              >
                {/* Make this into a pure function so that re-renders do not matter if data is same */}
                <DataTable
                  columns={columns}
                  data={tasks}
                  onDataChange={handleDataChange}
                  filterValue={filterValue}
                  onFilterChange={setFilterValue}
                  onRowMouseEnter={(id) => setHoveredRowId(id)}
                  onRowMouseLeave={() => setHoveredRowId(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Main>
    </div>
  );
};
