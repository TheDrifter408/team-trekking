import { CreateTask } from "@/components/Forms/CreateTask";
import { useGetWorkSpaceQuery } from "@/store/services/main";
import { Task } from "@/types/ApiResponse";
import { Button, Modal } from "@library/components";
import { FormEvent, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import TaskList from "./components/TaskList";
import UpcomingDeadline from "./components/UpcomingDeadline";
import PriorityTasks from "./components/PriorityTask";
import { Plus } from "lucide-react";

export const WorkspacePage = () => {
  const params = useParams();

  const { workspaceId } = params;
  
  if (!workspaceId) {
    return <Navigate to="/workspaces" />;
  }
  const { data:workspace } = useGetWorkSpaceQuery(String(workspaceId));

  const [ allTasks, setAllTasks ] = useState<Task[]>([]);

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
          email:'',
        })
      ),
      progress: 0,
      priority: "Low",
      tags: (formdata.get('tags') as string).split(',').map((tag) => tag.trim()).filter((tag) => tag !== ""),
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
      const tasks = workspace.spaces.flatMap(
        (space) => 
          space.folders.flatMap(
            (folder) => folder.lists.flatMap(
              (list) => list.tasks)
        )
      );
      setAllTasks(tasks);
    } 
  },[workspace])

  if (!workspace) {
    return <div className="flex flex-col gap-3 ml-5">Workspace not found</div>;
  }
  
  return (
    <div className="flex flex-col gap-3 ml-5">
      {/* Workspace name and description */}
      <div className="shadow-lg bg-slate-700 p-3 rounded-xl flex flex-col gap-1">
        <h3 className="text-xl font-bold">
          {workspace.name}
        </h3>
        <h4>
          {workspace.description}
        </h4>
      </div>
      {/* No of Spaces */}
      <div className="">
        <h3 className="text-lg font-extrabold mb-3">Spaces: </h3>
        <div className="flex gap-1">
            {
              workspace.spaces.map((space) => (
                <div className="shadow-lg bg-slate-500 p-3 rounded-xl flex flex-col gap-1">
                  <h4 className="text-lg font-bold">{space.name}</h4>
                  <h4 className="font-light">{space.description}</h4>
                </div>
              ))
            }
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">Tasks:</h3>
          <Button className="bg-blue-600 w-fit" leftIcons={[
             {
               icon: <Plus />
             }
            ]} onClick={() => setCreateTaskModal(true)}>
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
          onClose={() => setCreateTaskModal((prev) => !prev)}
          showRightButton={false}>
          <CreateTask onTaskAdd={handleAddTask} />
        </Modal>
      </div>
    </div>
  );
}
