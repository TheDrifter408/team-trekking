import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs, Button } from '@/components';
import TaskTable from '@/pages/List/components/TaskTable';
import { tasks } from '@/data/mockData';
import { PlusIcon } from 'lucide-react';
import { Modal } from '@library/components';
import { WorkspaceHeader } from '@pages/Workspace/components/WorkspaceHeader.tsx';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  name: string;
  dueDate: string;
  startDate: string;
  estimatedTime: string;
  priorityType: 'high' | 'low' | '';
  tags: string[];
  listId: number;
}

export const List = () => {
  const params = useParams();

  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [taskForm, setTaskForm] = useState({
    name: '',
    dueDate: '',
    startDate: '',
    estimatedTime: '',
    priorityType: '',
    statusType: '',
    tags: [],
  });

  const onHandleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onHandleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !taskForm.name ||
      !taskForm.startDate ||
      !taskForm.dueDate ||
      !taskForm.priorityType
    ) {
      alert('Please fill in all required fields');
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      ...taskForm,
      listId: Number(params.listId),
    };

    setAllTasks((prevTasks) => [...prevTasks, newTask]);

    setTaskForm({
      name: '',
      dueDate: '',
      startDate: '',
      estimatedTime: '',
      priorityType: '',
      statusType: '',
      tags: [],
    });
    setShowModal(false);
  };

  const onHandleAddTaskClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const onFetchListTasks = () => {
      const filteredTasks = tasks.filter(
        (task) => task.listId === Number(params.listId)
      );
      setAllTasks(filteredTasks);
    };
    onFetchListTasks();
  }, [params]);

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary-light">
      <Breadcrumbs
        workspaceId={'1'}
        workspaceName={'Apptitive'}
        spaceId={1}
        spaceName={'Cappybara App'}
        folderId={1}
        folderName={'Going Moon'}
      />
      <WorkspaceHeader />
      <div className="px-4 rounded-lg">
        <div className="flex justify-end items-center my-2">
          <Button
            variant="primary"
            size="sm"
            leftIcons={[{ icon: <PlusIcon /> }]}
            className="w-auto"
            onClick={onHandleAddTaskClick}
          >
            Add Task
          </Button>
        </div>
        <TaskTable tasks={allTasks} />
      </div>

      <Modal
        title="Create Task"
        isOpen={showModal}
        showRightButton={false}
        onClose={() => setShowModal(false)}
        maxWidth={800}
      >
        <form
          onSubmit={onHandleSubmitForm}
          className="bg-white p-6 rounded-lg w-full space-y-4"
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium text-gray-700 mb-1">
              Name:
            </label>
            <input
              name="name"
              id="name"
              type="text"
              value={taskForm.name}
              onChange={onHandleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="startDate"
              className="font-medium text-gray-700 mb-1"
            >
              Start Date:
            </label>
            <input
              name="startDate"
              type="date"
              value={taskForm.startDate}
              onChange={onHandleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="dueDate" className="font-medium text-gray-700 mb-1">
              Due Date:
            </label>
            <input
              name="dueDate"
              type="date"
              value={taskForm.dueDate}
              onChange={onHandleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="estimatedTime"
              className="font-medium text-gray-700 mb-1"
            >
              Estimated Time (hours):
            </label>
            <input
              name="estimatedTime"
              type="number"
              value={taskForm.estimatedTime}
              onChange={onHandleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter estimated time"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="priorityType"
              className="font-medium text-gray-700 mb-1"
            >
              Priority Type:
            </label>
            <select
              name="priorityType"
              value={taskForm.priorityType}
              onChange={onHandleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Priority Type</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="statusType"
              className="font-medium text-gray-700 mb-1"
            >
              Status type
            </label>
            <select
              name="statusType"
              value={taskForm.statusType}
              onChange={onHandleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Status Type</option>
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};
