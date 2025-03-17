// TaskList.tsx
import { DatePicker } from '@/components/ListComponents/DatePicker';
import { ProgressBar } from '@/components/ListComponents/ProgressBar';
import { Task, User } from '@/types/ApiResponse';
import { Column } from '@/types/Column';
import { TaskListProps } from '@/types/Props';
import { Table } from '@nabhan/view-module';
import { ChangeEvent, FC } from 'react';

const TaskList:FC<TaskListProps> = ({ tasks, setTasks }) => {
    
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
        const newTasks = [...tasks];
        newTasks[idx].name = e.currentTarget.value;
        setTasks(newTasks);
    };
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
        const newTasks = [...tasks];
        newTasks[idx].startDate = new Date(e.target.value);
        setTasks(newTasks);
    };
    // Define the number of columns needed for the table component
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
                task.priority === 'High'
                    ? 'bg-red-100 text-red-800'
                    : task.priority === 'Medium'
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
                {task.assignees.map((assignee: User) => assignee.name).join(', ')}
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
    return (
        <div className="flex flex-col gap-1">
            <Table columns={columns} data={tasks} />
        </div>
    );
};

export default TaskList;
