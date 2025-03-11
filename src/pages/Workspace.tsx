import { useLocation, NavLink, redirect } from 'react-router-dom';
import { Workspace } from '@/types/workspace.ts';
import { Button, Modal, Table } from '@nabhan/view-module';
import { Column } from '@/types/Column.ts';
import { Assignee } from '@/types/Assignee.ts';
import { Task } from '@/types/Task.ts';
import { ChangeEvent, useState, useMemo } from 'react';
import { ProgressBar } from '@/components/Common/ProgressBar';
import { FormEvent } from 'react';
import { DatePicker } from '@components/ListComponents/DatePicker';
import { Text, Input, Card } from '@nabhan/view-module';
import { Search } from 'lucide-react';
import { CreateTask } from '@/components/forms/CreateTask';
import {Layout} from '@components/Common/Layout.tsx'
const dummyTasks: Task[] = [...new Array(10)].map((_, idx) => {
  const task: Task = {
    id: idx.toString(),
    name: `Task ${idx + 1}`,
    description: `Task description ${idx + 1}`,
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 14))),
    assignees: [
      {
        id: `${idx + 1}`,
        name: 'John',
        imageUrl: '',
      },
    ],
    progress: Math.floor(Math.random() * 100),
    priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
    tags: ['important', 'backlog'],
    checklist: [
      {
        id: `${idx + 1}`,
        description: `Description ${idx + 1}`,
        isChecked: Math.random() > 0.5,
      },
      {
        id: `${idx + 10 + 1}`,
        description: `Another item ${idx + 1}`,
        isChecked: Math.random() > 0.5,
      },
    ],
    status: {
      id: `Status ${idx + 1}`,
      name: ['Backlog', 'In Progress', 'Review', 'Done'][Math.floor(Math.random() * 4)],
      statusColor: ['blue', 'yellow', 'purple', 'green'][Math.floor(Math.random() * 4)],
    },
  };
  return task;
});

const WorkspacePage = () => {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { state } = useLocation();
  console.log(state)
  if (state === null) {
    return (
      <div>
        <h1>Workspace not found</h1>
      </div>
    );
  }

  const { name, description, members } = state as Workspace;

  if (!name || !description || !members) {
    redirect('/dashboard');
  }



  // Calculate stats based on tasks
  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.progress === 100).length;
    const upcomingDeadlines = tasks.filter(task => {
      const today = new Date();
      const deadlineDate = new Date(task.endDate);
      const diffTime = deadlineDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays > 0 && task.progress < 100;
    }).length;

    const statusDistribution = tasks.reduce(
      (acc, task) => {
        acc[task.status.name] = (acc[task.status.name] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const priorityDistribution = tasks.reduce(
      (acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const assigneeWorkload = tasks.reduce(
      (acc, task) => {
        task.assignees.forEach(assignee => {
          acc[assignee.name] = (acc[assignee.name] || 0) + 1;
        });
        return acc;
      },
      {} as Record<string, number>
    );

    const checklistCompletion = tasks.reduce(
      (acc, task) => {
        const totalItems = task.checklist.length;
        const checkedItems = task.checklist.filter(item => item.isChecked).length;
        return {
          total: acc.total + totalItems,
          completed: acc.completed + checkedItems,
        };
      },
      { total: 0, completed: 0 }
    );

    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return {
      totalTasks,
      completedTasks,
      upcomingDeadlines,
      statusDistribution,
      priorityDistribution,
      assigneeWorkload,
      checklistCompletion,
      completionRate,
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (!searchTerm) return tasks;
    return tasks.filter(
      task =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.status.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.priority.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);



  const handleNameChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const newTasks = [...tasks];
    newTasks[idx].name = e.target.value;
    setTasks(newTasks);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const newTasks = [...tasks];
    newTasks[idx].startDate = new Date(e.target.value);
    setTasks(newTasks);
  };

  // Reduced the number of columns to avoid excessive width
  const columns: Column[] = [
    {
      key: '0',
      header: 'Name',
      sticky: true,
      render: (task: Task) => (
        <input value={task.name} onChange={e => handleNameChange(e, Number(task.id))} />
      ),
    },
    {
      key: '1',
      header: 'Progress',
      render: (task: Task) => <ProgressBar progress={task.progress} />,
    },
    {
      key: '2',
      header: 'Priority',
      render: (task: Task) => (
        <span
          className={`px-2 py-1 rounded text-sm ${
            task.priority === 'high'
              ? 'bg-red-100 text-red-800'
              : task.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
          }`}
        >
          {task.priority}
        </span>
      ),
    },
    {
      key: '3',
      header: 'Status',
      render: (task: Task) => (
        <span
          className={`px-2 py-1 rounded text-sm ${
            task.status.name === 'Backlog'
              ? 'bg-gray-100 text-gray-800'
              : task.status.name === 'In Progress'
                ? 'bg-blue-100 text-blue-800'
                : task.status.name === 'Review'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-green-100 text-green-800'
          }`}
        >
          {task.status.name}
        </span>
      ),
    },
    {
      key: '4',
      header: 'Assignee',
      render: (task: Task) => (
        <span>{task.assignees.map((assignee: Assignee) => assignee.name).join(', ')}</span>
      ),
    },
    {
      key: '6',
      header: 'Due Date',
      render: (task: Task) => (
        <DatePicker date={task.endDate} onDateChange={e => handleDateChange(e, Number(task.id))} />
      ),
    },
  ];

  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      name: formdata.get('name') as string,
      description: formdata.get('description') as string,
      startDate: new Date(formdata.get('startDate') as string),

      endDate: new Date(formdata.get('endDate') as string),
      assignees: (formdata.getAll('assignees') as string[]).map((assignee, idx) => ({
        id: idx.toString(),
        name: assignee,
        imageUrl: '',
      })),
      progress: 0,
      priority: formdata.get('priority') as string,
      tags: (formdata.get('tags') as string).split(','),
      checklist: [],
      status: {
        id: '1',
        name: 'Backlog',
        statusColor: 'bg-gray-400',
      },
    };
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  return (
    // Added max-width to the main container to prevent overflow
    <Layout>
      <div className="container mx-auto px-4 space-y-6 max-w-full">
        {/* Navigation and breadcrumbs */}
        <div className="flex items-center justify-between">
          <div>
            <NavLink to={'/home'} className="cursor-pointer">
              <Text
                variant="label"
                weight="bold"
                className="mb-3 cursor-pointer text-primary hover:underline inline-block"
              >
                Dashboard

                <span className="text-tertiary">{' / '}{state?.name ?? '( Workspace not found )'}</span>
              </Text>
            </NavLink>
          </div>
          <div className="flex items-center space-x-2">
            {members.length > 0 && (
              <div className="flex -space-x-2">
                {members.slice(0, 3).map(member => (
                  <img
                    key={member.id}
                    alt={member.name}
                    src={member.avatar}
                    className="rounded-full w-8 h-8 border-2 border-white"
                    title={member.name}
                  />
                ))}
                {members.length > 3 && (
                  <div
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium border-2 border-white">
                    +{members.length - 3}
                  </div>
                )}
              </div>
            )}
            <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
              Add Member
            </button>
          </div>
        </div>

        {/* Project description */}
        {description && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <Text variant="body">{description}</Text>
          </div>
        )}

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 shadow-sm">
            <div className="flex flex-col">
              <Text variant="label" className="text-gray-500">
                Total Tasks
              </Text>
              <Text variant="heading3" weight="bold">
                {stats.totalTasks}
              </Text>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${stats.completionRate}%` }}
                ></div>
              </div>
              <Text variant="caption" className="mt-1">
                {stats.completedTasks} completed ({stats.completionRate.toFixed(0)}%)
              </Text>
            </div>
          </Card>

          <Card className="p-4 shadow-sm">
            <div className="flex flex-col">
              <Text variant="label" className="text-gray-500">
                Upcoming Deadlines
              </Text>
              <Text variant="heading3" weight="bold">
                {stats.upcomingDeadlines}
              </Text>
              <Text variant="caption" className="mt-1 text-yellow-600">
                {stats.upcomingDeadlines > 0
                  ? `${stats.upcomingDeadlines} tasks due in the next 7 days`
                  : 'No upcoming deadlines'}
              </Text>
            </div>
          </Card>

          <Card className="p-4 shadow-sm">
            <div className="flex flex-col">
              <Text variant="label" className="text-gray-500">
                Priority Distribution
              </Text>
              <div className="flex items-center space-x-2 mt-2">
                <div
                  className="h-4 bg-red-500 rounded"
                  style={{
                    width: `${((stats.priorityDistribution.high || 0) / stats.totalTasks) * 100}%`,
                  }}
                ></div>
                <div
                  className="h-4 bg-yellow-500 rounded"
                  style={{
                    width: `${((stats.priorityDistribution.medium || 0) / stats.totalTasks) * 100}%`,
                  }}
                ></div>
                <div
                  className="h-4 bg-green-500 rounded"
                  style={{
                    width: `${((stats.priorityDistribution.low || 0) / stats.totalTasks) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs">
                <span className="text-red-600">High: {stats.priorityDistribution.high || 0}</span>
                <span className="text-yellow-600">
                Medium: {stats.priorityDistribution.medium || 0}
              </span>
                <span className="text-green-600">Low: {stats.priorityDistribution.low || 0}</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 shadow-sm">
            <div className="flex flex-col">
              <Text variant="label" className="text-gray-500">
                Checklist Progress
              </Text>
              <Text variant="heading3" weight="bold">
                {stats.checklistCompletion.total > 0
                  ? Math.round(
                    (stats.checklistCompletion.completed / stats.checklistCompletion.total) * 100
                  )
                  : 0}
                %
              </Text>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width:
                      stats.checklistCompletion.total > 0
                        ? `${(stats.checklistCompletion.completed / stats.checklistCompletion.total) * 100}%`
                        : '0%',
                  }}
                ></div>
              </div>
              <Text variant="caption" className="mt-1">
                {stats.checklistCompletion.completed} of {stats.checklistCompletion.total} items
                completed
              </Text>
            </div>
          </Card>
        </div>

        {/* Status Distribution */}
        <Card className="p-4 shadow-sm">
          <Text variant="body" weight="bold" className="text-gray-700 mb-3">
            Task Status
          </Text>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex flex-wrap gap-2 mb-2 md:mb-0">
              {Object.entries(stats.statusDistribution).map(([status, count]) => (
                <div key={status} className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      status === 'Backlog'
                        ? 'bg-gray-500'
                        : status === 'In Progress'
                          ? 'bg-blue-500'
                          : status === 'Review'
                            ? 'bg-purple-500'
                            : 'bg-green-500'
                    }`}
                  ></div>
                  <span className="text-sm">
                  {status}: {count}
                </span>
                </div>
              ))}
            </div>

            <div>
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                variant="primary"
                inputSize="medium"
                leftIcon={<Search className="h-5 w-5 text-gray-400" />}
                fullWidth
              />
            </div>
          </div>

          <div className="h-2 w-full flex rounded-full overflow-hidden">
            {Object.entries(stats.statusDistribution).map(([status, count]) => (
              <div
                key={status}
                className={`${
                  status === 'Backlog'
                    ? 'bg-gray-500'
                    : status === 'In Progress'
                      ? 'bg-blue-500'
                      : status === 'Review'
                        ? 'bg-purple-500'
                        : 'bg-green-500'
                }`}
                style={{ width: `${(count / stats.totalTasks) * 100}%` }}
              ></div>
            ))}
          </div>
        </Card>

        {/* Task Table - Removed duplicate progress columns and added proper overflow handling */}
        <Card className="p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <Text variant="body" weight="bold">
              Tasks
            </Text>
            <Button title="Add task" onClick={() => setIsModalOpen(true)} />
          </div>
          <div className="overflow-x-auto w-full">
            <Table columns={columns} data={filteredTasks} />
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="p-4 shadow-sm">
          <Text variant="body" weight="bold" className="mb-4">
            Recent Activity
          </Text>
          <div className="space-y-4 mt-4">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xs text-blue-700">JD</span>
                </div>
                <div>
                  <Text variant="caption" weight="semibold">
                    John Doe{' '}
                  </Text>
                  <Text variant="caption">
                    {
                      [
                        "Updated task status from 'In Progress' to 'Done'",
                        'Added new checklist item to Task 3',
                        "Changed priority from 'Medium' to 'High'",
                      ][idx]
                    }
                  </Text>
                  <Text variant="caption" className="text-gray-500">
                    {['2 hours ago', 'Yesterday, 3:45 PM', '2 days ago'][idx]}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Modal for adding tasks */}
        <Modal
          rightButtonText="Confirm"
          maxWidth={700}
          title="Create A Task"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <CreateTask onTaskAdd={handleAddTask} />
        </Modal>
      </div>
    </Layout>
  );
};

export default WorkspacePage;