import React, { FormEvent, useState } from 'react';
import { WorkspaceItem } from '@/types/ApiResponse';
import { useGetWorkSpacesQuery } from '@/store/services/main';
import { WorkspaceCard } from './components/WorkspaceCard';
import { CreateWorkspaceForm } from './components/CreateWorkspaceForm';
import { BrandSection } from './components/BrandSection';
import { PlusIcon } from '@/assets/icons/Icons';
import { useStore } from '@store/zustand';
import { Button, ThemeToggle } from '@/components';

export const Home: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { currentTheme, setTheme } = useStore();
  const { data: workspaceList } = useGetWorkSpacesQuery();

  const [steps, setSteps] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [workspaceModal, setWorkspaceModal] = useState(false);

  const onToggleDarkMode = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setDarkMode(!darkMode);
  };

  const [workspace, setWorkspace] = useState<WorkspaceItem>({
    id: 0,
    image: '',
    name: '',
    description: '',
    members: [],
  });

  const [memberEmail, setMemberEmail] = useState('');

  const onHandleWorkspaceChange = (
    property: keyof WorkspaceItem,
    value: any
  ) => {
    setWorkspace((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWorkspaceModal(false);
    setSteps(1);
    setSubmitting(true);
    setWorkspace({
      id: 0,
      image: '',
      name: '',
      description: '',
      members: [],
    });
  };

  const onHandleCreateNew = () => {
    setWorkspaceModal(true);
  };

  const onHandleCloseModal = () => {
    setWorkspaceModal(false);
    setSteps(1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg-primary-light md:flex-row">
      <BrandSection />
      <div className="absolute right-4 top-4">
        <ThemeToggle toggleDarkMode={onToggleDarkMode} />
      </div>

      <div className="flex w-full flex-col p-8 md:w-2/3 md:p-12">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-8">
            <h2 className="mb-2 text-3xl text-text-primary font-bold">
              My Workspaces
            </h2>
            <p className="text-text-muted text-sm">
              Select a workspace to view and manage tasks
            </p>
          </div>

          <div className="mb-6 flex justify-end">
            <Button
              onClick={onHandleCreateNew}
              leftIcons={[
                {
                  icon: <PlusIcon />,
                  onClick: () => setWorkspaceModal(true),
                },
              ]}
              className="w-fit flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Create Workspace
            </Button>
          </div>

          <div className="space-y-4">
            {workspaceList?.map((workspace: WorkspaceItem) => (
              <WorkspaceCard key={workspace.id} workspace={workspace} />
            ))}
          </div>
        </div>
      </div>

      <CreateWorkspaceForm
        formSteps={steps}
        memberEmail={memberEmail}
        setMemberEmail={setMemberEmail}
        setFormSteps={setSteps}
        onSubmit={onHandleSubmit}
        isOpen={workspaceModal}
        onClose={onHandleCloseModal}
        state={workspace}
        setState={onHandleWorkspaceChange}
        isSubmitting={submitting}
      />
    </div>
  );
};

export default Home;
