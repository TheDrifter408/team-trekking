import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Task } from '../../types/Task';
import { Assignee } from '../../types/Assignee';
import { defaultStatuses } from '@utils/data.ts';
import { Checklist } from '../../types/Checklist';
import { Input } from '@library/components';

interface CreateTaskProps {
  // Add props as needed
  onTaskAdd: (e: FormEvent<HTMLFormElement>) => void;
}

export const CreateTask: FC<CreateTaskProps> = ({ onTaskAdd }) => {
  const [task, setTask] = useState<Task>({
    id: '0',
    name: '',
    description: '',
    tags: [],
    checklist: [] as Checklist[],
    status: {
      id: '1',
      name: 'Backlog',
      statusColor: 'bg-gray-400',
    },
    progress: 0,
    priority: '',
    assignees: [] as Assignee[],
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleStatusChange = () => {
    // Implement the logic to change the status
    const currentIndex = defaultStatuses.findIndex(
      (status) => status.id === task.status.id
    );
    const nextIndex = (currentIndex + 1) % defaultStatuses.length;
    setTask({ ...task, status: defaultStatuses[nextIndex] });
  };

  const handleCheckListChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newChecklist = [...task.checklist];
    newChecklist.push({
      id: (task.checklist.length + 1).toString(),
      description: e.target.value,
      isChecked: false,
    });
    setTask({ ...task, checklist: newChecklist });
  };

  return (
    <form onSubmit={onTaskAdd} className="w-[100%] space-y-4 border-none">
      {/* First Column contains the Start and End dates, statuses and Tags*/}
      <div className="flex justify-between">
        <div className="items-left flex flex-col gap-2">
          <div className="flex justify-between gap-1">
            <label htmlFor="status" className="mb-2 mt-2 font-semibold">
              Status:
            </label>
            <div className={`flex items-center gap-0`}>
              <Input
                type="text"
                id="status"
                name="status"
                value={task.status.name}
                onChange={(e) =>
                  setTask({
                    ...task,
                    status: { ...task.status, name: e.target.value },
                  })
                }
                className={`rounded-l-md border-0 p-2 font-bold uppercase ${task.status.statusColor}`}
              />
              <button
                type="button"
                onClick={handleStatusChange}
                role="button"
                className={`rounded-r-md border-l-2 border-white p-2 uppercase ${task.status.statusColor}`}
              >
                {'>'}
              </button>
            </div>
          </div>
          <div className="flex justify-between gap-1">
            <label htmlFor="startDate" className="mb-2 mt-2 font-semibold">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={task.startDate.toISOString().split('T')[0]}
              onChange={(e) =>
                setTask({ ...task, startDate: new Date(e.target.value) })
              }
              className="rounded-md border p-2"
            />
          </div>
          <div className="flex justify-between gap-1">
            <label htmlFor="endDate" className="mb-2 mt-2 font-semibold">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={task.endDate.toISOString().split('T')[0]}
              onChange={(e) =>
                setTask({ ...task, endDate: new Date(e.target.value) })
              }
              className="rounded-md border p-2"
            />
          </div>
          <div className="flex justify-between gap-1">
            <label htmlFor="tags" className="mb-2 mt-2 font-semibold">
              Tags:
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="eg: important, urgent"
              value={task.tags.join(',')}
              onChange={(e) =>
                setTask({ ...task, tags: e.target.value.split(',') })
              }
              className="rounded-md border p-2"
            />
          </div>
        </div>
        {/* Contains the Assignees, Priority */}
        <div className="flex flex-col items-stretch gap-2">
          <div className="flex justify-between gap-1">
            <label htmlFor="assignees" className="mb-2 mt-2 font-semibold">
              Assignees:
            </label>
            <select
              id="assignees"
              name="assignees"
              className="rounded-md border p-2"
            >
              <option value="Assignee 1">Assignee 1</option>
              <option value="Assignee 2">Assignee 2</option>
              <option value="Assignee 3">Assignee 3</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="flex justify-between gap-1">
            <label htmlFor="priority" className="mb-2 mt-2 font-semibold">
              Priority:
            </label>
            <select
              id="priority"
              name="priority"
              className="rounded-md border p-2"
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
              <option value="high" className="capitalize">
                High
              </option>
              <option value="normal" className="capitalize">
                Normal
              </option>
              <option value="instant" className="capitalize">
                Instant
              </option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-2 font-semibold">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          className="rounded-md border p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="mb-2 font-semibold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="rounded-md border p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="checklist" className="mb-2 font-semibold">
          Checklist
        </label>
        <input
          type="text"
          id="checklist"
          name="checklist"
          value={task.checklist
            .map((checklist) => checklist.description)
            .join(' ')}
          onChange={(e) => handleCheckListChange(e)}
          className="rounded-md border p-2"
        />
      </div>
      <div>
        <button type="submit" className="rounded-md bg-blue-500 p-2 text-white">
          {' '}
          Submit{' '}
        </button>
      </div>
    </form>
  );
};
