import { CreateTask } from '@/components/Forms/CreateTask';
import { useGetWorkSpaceQuery } from '@/store/services/main';
import { Task } from '@/types/ApiResponse';
import { Button, Modal } from '@library/components';
import { FormEvent, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import TaskList from './components/TaskList';
import UpcomingDeadline from './components/UpcomingDeadline';
import PriorityTasks from './components/PriorityTask';
import { Plus } from 'lucide-react';

export const WorkspacePage = () => {
  const params = useParams();

  const { workspaceId } = params;

  if (!workspaceId) {
    return <Navigate to="/workspaces" />;
  }
  const { data: workspace } = useGetWorkSpaceQuery(String(workspaceId));

  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const [createTaskModal, setCreateTaskModal] = useState(false);

  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const newTask: Task = {
      id: Date.now().toString(),
      name: formdata.get('name') as string,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: formdata.get('description') as string,
      startDate: new Date(formdata.get('startDate') as string),
      endDate: new Date(formdata.get('endDate') as string),
      assignees: (formdata.getAll('assignees') as string[]).map(
        (assignee, idx) => ({
          id: idx.toString(),
          name: assignee,
          avatar: '',
          email: '',
        })
      ),
      progress: 0,
      priority: 'Low',
      tags: (formdata.get('tags') as string)
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ''),
      checklist: [],
      status: {
        id: '1',
        name: 'Backlog',
        statusColor: 'bg-gray-400',
      },
    };
    setAllTasks([...allTasks, newTask]);
    setCreateTaskModal(false);
  };

  useEffect(() => {
    if (workspace) {
      const tasks = workspace.spaces.flatMap((space) =>
        space.folders.flatMap((folder) =>
          folder.lists.flatMap((list) => list.tasks)
        )
      );
      setAllTasks(tasks);
    }
  }, [workspace]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Workspace {workspaceId}</h2>
        <p className="text-gray-600">
          Welcome to your workspace! This is where all your important work
          happens.
        </p>
      </div>

      {/* Sample content to demonstrate scrolling */}
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-3">Section {index + 1}</h3>
          <p className="text-gray-600">
            This is a sample section to demonstrate scrolling behavior. The
            header and sidebar will remain fixed while you scroll through this
            content.
          </p>
        </div>
      ))}
    </div>
  );
};
