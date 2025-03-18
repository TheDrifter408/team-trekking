import {
  useLocation,
  NavLink,
  redirect,
  useParams,
  Link,
} from 'react-router-dom';
import { Workspace } from '@/types/Workspace.ts';
import { Button, Modal, Table } from '@library/components';
import { Column } from '@/types/Column.ts';
import { Assignee } from '@/types/Assignee.ts';
import { Task } from '@/types/Task.ts';
import { ChangeEvent, useState, useMemo, useEffect } from 'react';
import { ProgressBar } from '@components/Common/ProgressBar.tsx';
import { FormEvent } from 'react';
import { DatePicker } from '@components/ListComponents/DatePicker.tsx';
import { Text, Input, Card } from '@library/components';
import { Search } from 'lucide-react';
import { CreateTask } from '@components/Forms/CreateTask.tsx';
import { Space } from '@/types/Space.ts';
import { data } from '@utils/data.ts';

export const WorkspacePage2 = () => {
  // Get the state of the workspace
  let { state } = useLocation();
  const params = useParams();
  // Return an Error Page if the state is null
  if (state === null) {
    const workspaceIndex = data.findIndex(
      (workspace) => workspace.id === params.workspaceId
    );
    if (workspaceIndex === -1) {
      redirect('/home');
    }
    state = data[workspaceIndex] as Workspace;
  }
  // Destructure the workspace state
  const { name, description, members, spaces } = state as Workspace;

  if (!name || !description || !members) {
    redirect('/home');
  }

  const ExtractTasks = (space: Space) => {
    let allTasks: Task[] = [];
    space.folders.forEach((folder) => {
      folder.lists.forEach((list) => {
        allTasks = allTasks.concat(list.tasks);
      });
    });
    return allTasks;
  };

  useEffect(() => {
    const allTasks = spaces.map(ExtractTasks).flat();
    setTasks(allTasks);
  }, [state]);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Calculate stats based on tasks
  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.progress === 100).length;
    const upcomingDeadlines = tasks.filter((task) => {
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
        task.assignees.forEach((assignee) => {
          acc[assignee.name] = (acc[assignee.name] || 0) + 1;
        });
        return acc;
      },
      {} as Record<string, number>
    );

    const checklistCompletion = tasks.reduce(
      (acc, task) => {
        const totalItems = task.checklist.length;
        const checkedItems = task.checklist.filter(
          (item) => item.isChecked
        ).length;
        return {
          total: acc.total + totalItems,
          completed: acc.completed + checkedItems,
        };
      },
      { total: 0, completed: 0 }
    );

    const completionRate =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

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
      (task) =>
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
        <input
          className=""
          value={task.name}
          onChange={(e) => handleNameChange(e, Number(task.id))}
        />
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
          className={`rounded px-2 py-1 text-sm ${
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
          className={`text-nowrap rounded px-2 py-1 text-xs ${
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
        <span>
          {task.assignees.map((assignee: Assignee) => assignee.name).join(', ')}
        </span>
      ),
    },
    {
      key: '6',
      header: 'Due Date',
      render: (task: Task) => (
        <DatePicker
          date={task.endDate}
          onDateChange={(e) => handleDateChange(e, Number(task.id))}
        />
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
      assignees: (formdata.getAll('assignees') as string[]).map(
        (assignee, idx) => ({
          id: idx.toString(),
          name: assignee,
          avatar: '',
        })
      ),
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
    <div className="container mx-auto max-w-full space-y-6 px-4">
      {/* Navigation and breadcrumbs */}
      <div className="flex items-center justify-between">
        <div>
          <NavLink to={'/home'} className="cursor-pointer">
            <Text
              variant="label"
              weight="bold"
              className="mb-3 inline-block cursor-pointer text-primary hover:underline"
            >
              Dashboard
              <span className="text-tertiary">
                {' / '}
                {state?.name ?? '( Workspace not found )'}
              </span>
            </Text>
          </NavLink>
        </div>
        <div className="flex items-center space-x-2">
          {members.length > 0 && (
            <div className="flex -space-x-2">
              {members.slice(0, 3).map((member) => (
                <img
                  key={member.id}
                  alt={member.name}
                  src={member.avatar}
                  className="h-8 w-8 rounded-full border-2 border-white"
                  title={member.name}
                />
              ))}
              {members.length > 3 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-medium">
                  +{members.length - 3}
                </div>
              )}
            </div>
          )}
          <button className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white">
            Add Member
          </button>
        </div>
      </div>

      {/* Project description */}
      {description && (
        <div className="rounded-lg bg-gray-50 p-4">
          <Text variant="body">{description}</Text>
        </div>
      )}

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 shadow-sm">
          <div className="flex flex-col">
            <Text variant="label" className="text-gray-500">
              Total Tasks
            </Text>
            <Text variant="h3" weight="bold">
              {stats.totalTasks}
            </Text>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-600"
                style={{ width: `${stats.completionRate}%` }}
              ></div>
            </div>
            <Text variant="caption" className="mt-1">
              {stats.completedTasks} completed (
              {stats.completionRate.toFixed(0)}%)
            </Text>
          </div>
        </Card>

        <Card className="p-4 shadow-sm">
          <div className="flex flex-col">
            <Text variant="label" className="text-gray-500">
              Upcoming Deadlines
            </Text>
            <Text variant="h3" weight="bold">
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
            <div className="mt-2 flex items-center space-x-2">
              <div
                className="h-4 rounded bg-red-500"
                style={{
                  width: `${((stats.priorityDistribution.high || 0) / stats.totalTasks) * 100}%`,
                }}
              ></div>
              <div
                className="h-4 rounded bg-yellow-500"
                style={{
                  width: `${((stats.priorityDistribution.medium || 0) / stats.totalTasks) * 100}%`,
                }}
              ></div>
              <div
                className="h-4 rounded bg-green-500"
                style={{
                  width: `${((stats.priorityDistribution.low || 0) / stats.totalTasks) * 100}%`,
                }}
              ></div>
            </div>
            <div className="mt-1 flex justify-between text-xs">
              <span className="text-red-600">
                High: {stats.priorityDistribution.high || 0}
              </span>
              <span className="text-yellow-600">
                Medium: {stats.priorityDistribution.medium || 0}
              </span>
              <span className="text-green-600">
                Low: {stats.priorityDistribution.low || 0}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-sm">
          <div className="flex flex-col">
            <Text variant="label" className="text-gray-500">
              Checklist Progress
            </Text>
            <Text variant="h3" weight="bold">
              {stats.checklistCompletion.total > 0
                ? Math.round(
                    (stats.checklistCompletion.completed /
                      stats.checklistCompletion.total) *
                      100
                  )
                : 0}
              %
            </Text>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-green-500"
                style={{
                  width:
                    stats.checklistCompletion.total > 0
                      ? `${(stats.checklistCompletion.completed / stats.checklistCompletion.total) * 100}%`
                      : '0%',
                }}
              ></div>
            </div>
            <Text variant="caption" className="mt-1">
              {stats.checklistCompletion.completed} of{' '}
              {stats.checklistCompletion.total} items completed
            </Text>
          </div>
        </Card>
      </div>
      {/* Status Distribution */}
      <Card className="p-4 shadow-sm">
        <Text variant="body" weight="bold" className="mb-3 text-gray-700">
          Task Status
        </Text>
        <div className="mb-4 flex flex-col items-center justify-between md:flex-row">
          <div className="mb-2 flex flex-wrap gap-2 md:mb-0">
            {Object.entries(stats.statusDistribution).map(([status, count]) => (
              <div key={status} className="flex items-center space-x-2">
                <div
                  className={`h-3 w-3 rounded-full ${
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              variant="primary"
              inputSize="medium"
              leftIcon={<Search className="h-5 w-5 text-gray-400" />}
              fullWidth
            />
          </div>
        </div>

        <div className="flex h-2 w-full overflow-hidden rounded-full">
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
        <div className="mb-4 flex items-center justify-between">
          <Text variant="body" weight="bold">
            Tasks
          </Text>
          <Button title="Add task" onClick={() => setIsModalOpen(true)} />
        </div>
        <div className="w-full overflow-x-auto">
          <Table columns={columns} data={filteredTasks} />
        </div>
      </Card>

      {/* Activity Feed */}
      <Card className="p-4 shadow-sm">
        <Text variant="body" weight="bold" className="mb-4">
          Recent Activity
        </Text>
        <div className="mt-4 space-y-4">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
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
  );
};

export default WorkspacePage2;
