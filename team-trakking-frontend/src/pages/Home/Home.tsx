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
    members: [],
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

  const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWorkspaceModal(false);
    setSteps(1);
    setSubmitting(true);
    // Reset on successful submission - using WorkspaceItem type with empty arrays
    setWorkspace({
      id: 0,
      image: '',
      name: '',
      description: '',
      members: [],
    });
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
      <BrandSection />
      <div className="absolute right-4 top-4">
        <ThemeToggle toggleDarkMode={toggleDarkMode} />
      </div>

      {/* Right side - Workspace List */}
      <div className="flex w-full flex-col p-8 md:w-2/3 md:p-12">
        <div className="mx-auto w-full max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold">My Workspaces</h2>
            <p className="text-text-light text-sm">
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
        onSubmit={onHandleSubmit}
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
