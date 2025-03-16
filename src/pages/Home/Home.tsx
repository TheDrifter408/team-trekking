import React, { FormEvent, useEffect, useState } from 'react';
import { Button } from '@nabhan/view-module';
import { Workspace, Space } from '@/types/ApiResponse';
import { useCreateWorkSpaceMutation, useLazyGetWorkSpacesQuery } from '@/store/services/main';
import { WorkspaceCard } from './components/WorkspaceCard';
import { CreateWorkspaceForm } from './components/CreateWorkspaceForm';

export const Home: React.FC = () => {

  const [ submitting, setSubmitting ] = useState(false);

  const [ getWorkspaces, { data:workspaces, isLoading: isFetching}  ] = useLazyGetWorkSpacesQuery();

  const [createWorkspace ] = useCreateWorkSpaceMutation();

  const [steps, setSteps] = useState(1);

  const [workspaceModal, setWorkspaceModal] = useState(false);
  
  const [ workspace, setWorkspace ] = useState<Workspace>({
    id: '',
    image: '',
    name: '',
    description: '',
    members: [],
    spaces: [],
    taskTypes: []
  });

  const handleWorkspaceChange = (property: keyof Workspace, value: string | Workspace['members'] | Workspace['spaces'] ) => {
    setWorkspace((prev) => ({
      ...prev,
      [property]: value,
    }))
  }

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    setWorkspaceModal(false);
    setSteps(1);
    const result:Workspace = { 
      id: "",
      image: "",
      name: formdata.get('name') as string,
      description: "",
      members: [...workspace.members],
      spaces: [] as Space[],
      taskTypes: workspace.taskTypes,
    };
    try {
      setSubmitting(true);
      await createWorkspace(result);
      // reset on successful submission
      setWorkspace({
        id: '',
        image: '',
        name: '',
        description: '',
        members: [],
        spaces: [],
        taskTypes: []
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  }

  const handleCreateNew = () => {
    setWorkspaceModal(true);
  };

  const handleCloseModal = () => {
    setWorkspaceModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getWorkspaces();
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  },[submitting]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-bg-primary">
      {/* Left side - Brand/Instructions */}
      <div className="hidden md:flex md:w-1/3 bg-indigo-600 items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-white mb-6">TaskFlow</h1>
          <p className="text-lg text-indigo-100 mb-6">
            Welcome to your personal task management hub. Organize your work, collaborate with your team, and boost productivity.
          </p>

          <div className="space-y-6 mt-8">
            <div className="flex items-start">
              <div className="bg-indigo-500 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Create Workspaces</h3>
                <p className="text-indigo-100">Organize your projects into dedicated workspaces</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-indigo-500 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Invite Team Members</h3>
                <p className="text-indigo-100">Collaborate with your team in real-time</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-indigo-500 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Manage Tasks</h3>
                <p className="text-indigo-100">Track progress and never miss a deadline</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Workspace List */}
      <div className="flex flex-col w-full md:w-2/3 p-8 md:p-12">
        {/* Dark mode toggle */}
        <div className="absolute top-4 right-4">
          <button
            className="rounded-md bg-gray-50 p-2 text-gray-700"
            aria-label="Toggle theme"
          >
            {/* Moon Icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>

        <div className="max-w-3xl mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">My Workspaces</h2>
            <p className="text-gray-500">Select a workspace to view and manage tasks</p>
          </div>

          {/* Create workspace button */}
          <div className="flex justify-end mb-6">
            <Button 
              onClick={handleCreateNew}
              leftIcons={[ {
                icon: <><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg></>, onClick: () => {
                setWorkspaceModal(true);}
              }]}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              {/* Plus Icon */}
              
              Create Workspace
            </Button>

          </div>

          {/* Workspaces List */}
          <div className="space-y-4">
            {
              isFetching ? (
                <p>Loading...</p>
              ) : (
                workspaces?.map((workspace:Workspace) => (
                  <WorkspaceCard key={workspace.id} {...workspace} />
                ))
              )
            }
          </div>

          {/* Empty State (commented out but included for reference) */}
          {/*
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
            </svg>
            <h3 className="mt-2 text-lg font-medium">No workspaces yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first workspace.</p>
            <div className="mt-6">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
                Create Workspace
              </button>
            </div>
          </div>
          */}
        </div>
      </div>

      {/* Modal Structure (positioned but not shown)
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Create New Workspace</h3>
            <button className="text-gray-400 hover:text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Workspace Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="My Workspace"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows={3}
                  placeholder="Describe what this workspace is for..."
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
              Back
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Next
            </button>
          </div>
        </div>
      </div> */}
      {/* Create workspace modal */}
      <CreateWorkspaceForm 
        formSteps={steps}
        setFormSteps={setSteps}
        onSubmit={handleSubmit} 
        isOpen={workspaceModal} 
        onClose={handleCloseModal} 
        state={workspace} 
        setState={handleWorkspaceChange} 
        isSubmitting={submitting}  />
    </div>
  );
};

export default Home;
