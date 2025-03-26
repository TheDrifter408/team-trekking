import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs, Button } from '@/components';
import TaskTable from '@/pages/List/components/TaskTable';
import { tasks } from '@/data/mockData';
import { Plus, PlusIcon } from 'lucide-react';
import { Modal } from '@library/components';
export const List = () => {
  const params = useParams();
  // TODO:
  // 1. Change to an RTKQuery later on
  
  const [allTasks, setAllTasks] = useState<any[]>([]);  
  const [showModal, setShowModal] = useState(false);
  
  const [createTask, setCreateTask] = useState({
    name:"",
    dueDate: "",
    startDate: "",
    estimatedTime:"",
    priorityType:"",
    tags: [''],
  });


  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowModal(false);
    const formdata = new FormData(event.currentTarget);
    // extract the form values
    const name = formdata.get("name") as string;
    const startDate = formdata.get('startDate') as string;
    
  }
  
  const handleAddTask = () => {
    setShowModal(true);
  }

  // Simuating API call for now and setting state
  useEffect(() => {
    // Get the tasks from the currently viewed List 
    const filteredTasks = tasks.filter((task) => task.listId === Number(params.listId));
    setAllTasks(filteredTasks);
  },[params])

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
      {/* Task Table Container */}
      <div className="p-4 rounded-lg">
        <div className="flex justify-end items-center my-2">
            <Button variant='primary' size='md' leftIcons={[
                {
                    icon: <PlusIcon />
                }
            ]} className='w-auto' onClick={handleAddTask}>
                Add Task
            </Button>
        </div>
        <TaskTable tasks={allTasks} />
      </div>
      {/* Modal Container */}
      <Modal title="Create Task" isOpen={showModal} showRightButton={false} onClose={() => setShowModal(false)} maxWidth={800}>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="font-medium text-gray-700 mb-1">Name:</label>
                    <input
                        name="name" 
                        id="name" 
                        type="text" 
                        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="startDate" className="font-medium text-gray-700 mb-1">Start Date:</label>
                    <input 
                        name="startDate" 
                        type="date" 
                        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="dueDate" className="font-medium text-gray-700 mb-1">Due Date:</label>
                    <input 
                        name="dueDate" 
                        type="date" 
                        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="priorityType" className="font-medium text-gray-700 mb-1">Priority Type:</label>
                    <select 
                        name="priorityType" 
                        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option>Select Priority Type</option>
                        <option value="high">High</option>
                        <option value="low">Low</option>
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
