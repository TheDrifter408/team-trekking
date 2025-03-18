import { useGetWorkSpaceQuery } from "@/store/services/main";
import UpcomingDeadline from "./components/UpcomingDeadline";
import PriorityTasks from "./components/PriorityTask";
import { redirect, useParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import { Task } from "@/types/ApiResponse";
import TaskList from "./components/TaskList";
import { Button, Modal } from "@nabhan/view-module";
import { CreateTask } from "@/components/Forms/CreateTask";

export const WorkspacePage = () => {
  const params = useParams();
  const { workspaceId } = params;
  if (!workspaceId) {
    redirect("/workspaces");
  }
  const { data:workspace, isLoading } = useGetWorkSpaceQuery(String(workspaceId));

  if (isLoading) {
    return <div className="flex flex-col gap-3 ml-5">Loading...</div>;
  }

  if (!workspace) {
    return <div className="flex flex-col gap-3 ml-5">Workspace not found</div>;
  }
  
  // destructure workspace 
  const { id, name, description, spaces } = workspace;

  // Set the tasks to state as soon as data fetches
  const [ allTasks, setAllTasks ] = useState(() => {
    if (workspace) {
      const tasks = spaces.flatMap(
        (space) => 
          space.folders.flatMap(
            (folder) => folder.lists.flatMap(
              (list) => list.tasks)
        )
      );
      return tasks;
    }
    return [] as Task[];
  })

  const [createTaskModal, setCreateTaskModal] = useState(false);

  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const newTask: Task = {
      id: '0',
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
          email:'',
        })
      ),
      progress: 0,
      priority: "Low",
      tags: (formdata.get('tags') as string).split(','),
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

  return (
    <div className="flex flex-col gap-3 ml-5">
      <div>
        <div className="shadow-lg bg-slate-700 p-3 rounded-xl flex flex-col gap-1">
          <h3 className="text-xl font-bold">
            {name}
          </h3>
          <h4>
            {description}
          </h4>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">Tasks:</h3>
          <Button className="bg-blue-600" onClick={() => setCreateTaskModal(true)}>
            Create Task
          </Button>
        </div>
        <TaskList tasks={allTasks} setTasks={setAllTasks} />
      </div>
      <UpcomingDeadline tasks={allTasks} />
      <PriorityTasks tasks={allTasks} />
      <div>
        <Modal 
          maxWidth={600} 
          title="Create Task" 
          isOpen={createTaskModal} 
          onClose={() => setCreateTaskModal(!createTaskModal)}
          showRightButton={false}>
          <CreateTask onTaskAdd={handleAddTask} />
        </Modal>
      </div>
    </div>
  );
};
