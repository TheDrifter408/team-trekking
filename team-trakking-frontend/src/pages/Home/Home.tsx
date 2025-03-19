import React, { FormEvent, useState } from 'react';
import { Workspace, WorkspaceItem } from '@/types/ApiResponse';
import {
  useCreateWorkSpaceMutation,
  useGetWorkSpacesQuery,
} from '@/store/services/main';
import { WorkspaceCard } from './components/WorkspaceCard';
import { CreateWorkspaceForm } from './components/CreateWorkspaceForm';
import {
  CheckIcon,
  ClipboardIcon,
  MoonIcon,
  PeopleIcon,
  PlusIcon,
  SunIcon,
} from '@/assets/icons/Icons';
import { useThemeStore } from '@store/zustand';
import { Button } from '@/components';

export const Home: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { currentTheme, setTheme } = useThemeStore();
  const { data: workspaceList } = useGetWorkSpacesQuery();
  const [createWorkspace] = useCreateWorkSpaceMutation();

  const [steps, setSteps] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [workspaceModal, setWorkspaceModal] = useState(false);

  const toggleDarkMode = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setDarkMode(!darkMode);
  };

  // Changed from Workspace to WorkspaceItem to include members array
  const [workspace, setWorkspace] = useState<WorkspaceItem>({
    id: 0,
    image: '',
    name: '',
    description: '',
    members: [], // Initialize with empty members array
  });

  // state to temporarily store the email of the member being added
  const [memberEmail, setMemberEmail] = useState('');

  // Updated to handle both Workspace and WorkspaceItem properties
  const handleWorkspaceChange = (property: keyof WorkspaceItem, value: any) => {
    setWorkspace((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    setWorkspaceModal(false);
    setSteps(1);

    // Create the workspace object from the form data
    const workspaceToCreate: Workspace = {
      id: 1,
      image: '',
      name:
        (formdata.get('name') as string) || workspace.name || 'Workspace Name',
      description: workspace.description || '',
    };

    try {
      setSubmitting(true);
      await createWorkspace(workspaceToCreate);

      // Reset on successful submission - using WorkspaceItem type with empty arrays
      setWorkspace({
        id: 0,
        image: '',
        name: '',
        description: '',
        members: [],
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateNew = () => {
    setWorkspaceModal(true);
  };

  const handleCloseModal = () => {
    setWorkspaceModal(false);
    // Reset form state when closing modal
    setSteps(1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg-primary md:flex-row">
      {/* Left side - Brand/Instructions */}
      <div className="hidden items-center justify-center bg-indigo-600 p-12 md:flex md:w-1/3">
        <div className="max-w-md">
          <h2 className="mb-6 text-3xl font-bold text-white">Team Trakking</h2>
          <p className="mb-6 text-lg text-indigo-100">
            Welcome to your personal task management hub. Organize your work,
            collaborate with your team, and boost productivity.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-start">
              <div className="mr-4 rounded-full bg-indigo-500 p-2">
                <CheckIcon />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Create Workspaces
                </h3>
                <p className="text-indigo-100">
                  Organize your projects into dedicated workspaces
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 rounded-full bg-indigo-500 p-2">
                <PeopleIcon />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Invite Team Members
                </h3>
                <p className="text-indigo-100">
                  Collaborate with your team in real-time
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 rounded-full bg-indigo-500 p-2">
                <ClipboardIcon />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Manage Tasks
                </h3>
                <p className="text-indigo-100">
                  Track progress and never miss a deadline
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-4 top-4">
        <Button
          variant={'ghost'}
          size={'sm'}
          onClick={toggleDarkMode}
          className={`rounded-5 hover:scale-105  ${darkMode ? 'bg-gray-700  text-yellow-300' : 'bg-gray-100 text-text-inverted'}`}
        >
          <div>{darkMode ? <SunIcon /> : <MoonIcon />} </div>
        </Button>
      </div>

      {/* Right side - Workspace List */}
      <div className="flex w-full flex-col p-8 md:w-2/3 md:p-12">
        <div className="mx-auto w-full max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold">My Workspaces</h2>
            <p className="text-gray-500">
              Select a workspace to view and manage tasks
            </p>
          </div>

          {/* Create workspace button */}
          <div className="mb-6 flex justify-end">
            <Button
              onClick={handleCreateNew}
              leftIcons={[
                {
                  icon: <PlusIcon />,
                  onClick: () => {
                    setWorkspaceModal(true);
                  },
                },
              ]}
              className="w-fit flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Create Workspace
            </Button>
          </div>

          {/*Workspaces List */}
          <div className="space-y-4">
            {workspaceList?.map((workspace: WorkspaceItem) => (
              <WorkspaceCard key={workspace.id} workspace={workspace} />
            ))}
          </div>
        </div>
      </div>

      {/* Create workspace modal */}
      <CreateWorkspaceForm
        formSteps={steps}
        memberEmail={memberEmail}
        setMemberEmail={setMemberEmail}
        setFormSteps={setSteps}
        onSubmit={handleSubmit}
        isOpen={workspaceModal}
        onClose={handleCloseModal}
        state={workspace}
        setState={handleWorkspaceChange}
        isSubmitting={submitting}
      />
    </div>
  );
};

export default Home;
