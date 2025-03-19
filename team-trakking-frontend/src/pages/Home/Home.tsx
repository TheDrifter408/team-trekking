import React, { FormEvent, useEffect, useState } from 'react';
import { Workspace, Space } from '@/types/ApiResponse';
import {
  useCreateWorkSpaceMutation,
  useLazyGetWorkSpacesQuery,
} from '@/store/services/main';
import { WorkspaceCard } from './components/WorkspaceCard';
import { CreateWorkspaceForm } from './components/CreateWorkspaceForm';
import { CheckIcon, ClipboardIcon, MoonIcon, PeopleIcon, PlusIcon } from '@/assets/icons/Icons';
import { ButtonComponent } from '@/components/Common/Button';

export const Home: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);

  const [getWorkspaces, { data: workspaces, isLoading: isFetching }] =
    useLazyGetWorkSpacesQuery();

  const [createWorkspace] = useCreateWorkSpaceMutation();

  const [steps, setSteps] = useState(1);

  const [workspaceModal, setWorkspaceModal] = useState(false);

  const [workspace, setWorkspace] = useState<Workspace>({
    id: '',
    image: '',
    name: '',
    description: '',
    members: [],
    spaces: [],
    taskTypes: [],
  });

  // state to temporarily store the email of the member being added
  const [memberEmail, setMemberEmail] = useState('');

  const handleWorkspaceChange = (
    property: keyof Workspace,
    value: string | Workspace['members'] | Workspace['spaces']
  ) => {
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
    const result: Workspace = {
      id: '',
      image: '',
      name: (formdata.get('name') as string) || 'Workspace Name',
      description: '',
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
        taskTypes: [],
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
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getWorkspaces();
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [submitting]);

  return (
    <div className="flex min-h-screen flex-col bg-bg-primary md:flex-row">
      {/* Left side - Brand/Instructions */}
      <div className="hidden items-center justify-center bg-indigo-600 p-12 md:flex md:w-1/3">
        <div className="max-w-md">
          <h1 className="mb-6 text-4xl font-bold text-white">TaskFlow</h1>
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

      {/* Right side - Workspace List */}
      <div className="flex w-full flex-col p-8 md:w-2/3 md:p-12">
        {/* Dark mode toggle */}
        <div className="absolute right-4 top-4">
          <button
            className="rounded-md bg-gray-50 p-2 text-gray-700"
            aria-label="Toggle theme"
          >
            {/* Moon Icon */}
            <MoonIcon />
          </button>
        </div>

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
            <ButtonComponent
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
              {/* Plus Icon */}
              Create Workspace
            </ButtonComponent>
          </div>

          {/* Workspaces List */}
          <div className="space-y-4">
            {isFetching ? (
              <p>Loading...</p>
            ) : (
              workspaces?.map((workspace: Workspace) => (
                <WorkspaceCard key={workspace.id} {...workspace} />
              ))
            )}
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
