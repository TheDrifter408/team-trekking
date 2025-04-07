import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { WorkspaceItem } from '@/types/ApiResponse';
import { useGetWorkSpacesQuery } from '@/store/services/main';
import { WorkspaceCard } from './components/WorkspaceCard';
import { CreateWorkspaceForm } from './components/CreateWorkspaceForm';
import { BrandSection } from './components/BrandSection';
import { AppIcons, PlusIcon } from '@/assets/icons/Icons';
import { useStore } from '@store/zustand';
import { Button, ThemeToggle } from '@/components';
import { Header } from '@components/Layout/HomeHeader.tsx';
import { Main } from '@components/Layout/Main.tsx';
import { Text } from '@library/components';
import { ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '@hooks/useAuth.tsx';

export const Home: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { currentTheme, setTheme } = useStore();
  const { data: workspaceList } = useGetWorkSpacesQuery();

  const [steps, setSteps] = useState(1);
  const [workspaceModal, setWorkspaceModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { handleLogout } = useAuth();

  const profileMenuRef = useRef<HTMLDivElement>(null);

  const onHandleThemeToggle = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
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
    // Reset on successful submission - using WorkspaceItem type with empty arrays
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
    // Reset form state when closing modal
    setSteps(1);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-bg-primary-light min-h-screen">
      {/* ======= HEADER ======= */}
      <Header className={'bg-header-primary sticky top-0 flex justify-between'}>
        <div className={'flex items-center gap-2 '}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
            <AppIcons />
          </div>
          <Text className="text-text-primary hidden font-semibold md:flex">
            Team Trakking
          </Text>
        </div>
        <div className="relative" ref={profileMenuRef}>
          <Button
            size={'sm'}
            variant={'outline'}
            rightIcons={[
              {
                icon: (
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                ),
              },
            ]}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex w-auto items-center rounded-lg bg-bg-inverted hover:bg-button-hover border-0"
          >
            <img
              src="https://ui-avatars.com/api/?name=jawahiir+nabhan&background=random"
              alt="Avatar"
              className="h-5 w-5 rounded-full"
            />
          </Button>

          {showProfileMenu && (
            <div className="absolute z-40 right-0 mt-2 w-48 rounded-lg border border-gray-300 bg-bg-inverted shadow-lg dark:border-gray-700">
              <div className="py-2">
                <div
                  onClick={onHandleThemeToggle}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm text-text-inverted hover:bg-button-hover hover:text-text-primary"
                >
                  <span className={'text-text-default'}>Toggle Theme</span>
                  <ThemeToggle toggleDarkMode={onHandleThemeToggle} />
                </div>

                <div
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm text-text-inverted hover:bg-button-hover hover:text-text-primary"
                >
                  <span className={'text-red-600'}>Logout</span>
                  <Button
                    size={'sm'}
                    variant={'outline'}
                    className={'rounded-5 bg-bg-secondary  border-0'}
                  >
                    <LogOut className={'h-4 w-4'} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Header>
      {/* ========= BODY / MAIN SECTION ======== */}
      <Main>
        <BrandSection />

        {/* Right side - Workspace List */}
        <div className="flex w-full flex-col p-8 md:w-2/3 md:p-12">
          <div className="mx-auto w-full max-w-3xl">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-text-primary mb-2 text-3xl font-bold">
                My Workspaces
              </h2>
              <p className="text-text-muted text-sm">
                Select a workspace to view and manage tasks
              </p>
            </div>

            {/* Create workspace button */}
            <div className="mb-6 flex justify-end">
              <Button
                onClick={onHandleCreateNew}
                leftIcons={[
                  {
                    icon: <PlusIcon />,
                    onClick: () => {
                      setWorkspaceModal(true);
                    },
                  },
                ]}
                className="flex w-fit items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
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
      </Main>

      {/* Create workspace modal */}
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
