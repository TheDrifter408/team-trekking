import { ChangeEvent, FC, useState } from 'react';
import { Button, Modal } from '@library/components';
import { CreateWorkspaceFormProps } from '@/types/Props';
import { Member } from '@/types/ApiResponse';

export const CreateWorkspaceForm: FC<CreateWorkspaceFormProps> = ({
  isOpen,
  onClose,
  state,
  setState,
  onSubmit,
  formSteps,
  setFormSteps,
  isSubmitting,
  memberEmail,
  setMemberEmail,
}) => {
  const [selectedButton, setSelectedButton] = useState<string>('');
  const totalSteps = 5;

  const onHandleButtonClick = (title: string) => {
    setSelectedButton(title);
  };

  const onPressAddEmail = () => {
    if (
      !memberEmail ||
      state.members.some((member) => member.email === memberEmail)
    ) {
      return;
    }

    const newMember: Member = {
      id: Date.now(),
      email: memberEmail,
      name: '',
      workspaceId: 0,
    };

    setState('members', [...state.members, newMember]);
    setMemberEmail('');
  };

  const onChangeWorkspaceName = (e: ChangeEvent<HTMLInputElement>) => {
    setState('name', e.currentTarget.value);
  };

  const onRemoveEmail = (emailToRemove: string) => {
    const updatedMembers = state.members.filter(
      (member) => member.email !== emailToRemove
    );
    setState('members', updatedMembers);
  };

  const onClickNext = () => {
    if (formSteps < 4) {
      setFormSteps((prev) => prev + 1);
    } else {
      onClose();
      setFormSteps(1);
    }
  };

  const onClickPrev = () => {
    if (formSteps > 1) {
      setFormSteps((prev) => prev - 1);
    }
  };

  const onRenderModalTitle = () => {
    const titles = [
      'What will you use this workspace for?',
      'What would you like to manage?',
      'Invite others to your workspace',
      'Almost there. What would you like to name your workspace?',
    ];
    return titles[formSteps - 1] || titles[0];
  };

  const onGetRightButtonTitle = () => {
    if (formSteps === 3) return 'Done';
    else if (formSteps === 4) return 'Confirm';
    else return 'Next';
  };

  const onRenderStepContent = () => {
    switch (formSteps) {
      case 1:
      case 2: {
        const options =
          formSteps === 1
            ? ['Work', 'Personal', 'School']
            : [
                'Software Development',
                'Marketing',
                'Finance',
                'Personal Use',
                'IT',
                'HR & Recruiting',
                'PMO',
              ];
        return (
          <div className="flex flex-wrap justify-center gap-2">
            {options.map((title) => (
              <Button
                key={title}
                type="button"
                className={`cursor-pointer text-black shadow-md transition-all duration-300 ease-in-out hover:scale-105 
                      ${selectedButton === title ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-black shadow-md'}`}
                onClick={() => onHandleButtonClick(title)}
              >
                {title}
              </Button>
            ))}
          </div>
        );
      }
      case 3:
        return (
          <div className="mx-auto w-full max-w-md">
            <div className="mb-4 flex items-center gap-2">
              <input
                type="email"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onPressAddEmail()}
                placeholder="Enter email(s)"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                type="button"
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={onPressAddEmail}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {state.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center rounded-full bg-blue-100 px-4 py-1 text-blue-800"
                >
                  <span>{member.name || member.email}</span>
                  <Button
                    type="button"
                    onClick={() => onRemoveEmail(member.email)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="pb-5 pt-3">
            <input
              type="text"
              value={state.name}
              onChange={onChangeWorkspaceName}
              placeholder="Workspace Name"
              className="w-full rounded-md border border-gray-300 px-4 py-2"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      title={onRenderModalTitle()}
      isOpen={isOpen}
      onClose={onClose}
      rightButtonText={onGetRightButtonTitle()}
      rightButtonOnClick={formSteps < totalSteps ? onClickNext : () => onSubmit}
      showRightButton={formSteps < totalSteps}
      showLeftButton={true}
      leftButtonText="Back"
      leftButtonOnClick={onClickPrev}
      leftButtonDisabled={formSteps === 1}
    >
      <div className="p-4">
        <h3 className="mb-4 text-lg font-semibold">Create a new workspace</h3>
        <form
          onSubmit={onSubmit}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        >
          {onRenderStepContent()}
        </form>
      </div>
    </Modal>
  );
};
