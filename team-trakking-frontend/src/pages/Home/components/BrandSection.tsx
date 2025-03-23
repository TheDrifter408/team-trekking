import { CheckIcon, ClipboardIcon, PeopleIcon } from '@/assets/icons/Icons.tsx';

export const BrandSection = () => {
  return (
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
              <h3 className="text-xl font-semibold text-white">Manage Tasks</h3>
              <p className="text-indigo-100">
                Track progress and never miss a deadline
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
