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

  const handleButtonClick = (title: string) => {
    setSelectedButton(title);
  };

  const handleAddEmail = () => {
    // Don't add if email is empty or already exists
    if (
      !memberEmail ||
      state.members.some((member) => member.email === memberEmail)
    ) {
      return;
    }

    // Create a new member with a unique ID and the entered email
    const newMember: Member = {
      id: Date.now(), // Using timestamp as a simple unique ID
      email: memberEmail,
      name: '',
      workspaceId: 0,
    };

    // Update members array with the new member
    setState('members', [...state.members, newMember]);

    // Clear the input field
    setMemberEmail('');
  };

  const handleWorkspaceNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState('name', e.currentTarget.value);
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    // Filter out the member with the matching email
    const updatedMembers = state.members.filter(
      (member) => member.email !== emailToRemove
    );

    // Update the members array
    setState('members', updatedMembers);
  };

  const handleNext = () => {
    if (formSteps < 4) {
      setFormSteps((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (formSteps > 1) {
      setFormSteps((prev) => prev - 1);
    }
  };

  const renderModalTitle = () => {
    const titles = [
      'What will you use this workspace for?',
      'What would you like to manage?',
      'Invite others to your workspace',
      'Almost there. What would you like to name your workspace?',
    ];
    return titles[formSteps - 1] || titles[0];
  };

  const rightButtonTitle = () => {
    if (formSteps === 3) return 'Done';
    else if (formSteps === 4) return 'Confirm';
    else return 'Next';
  };

  const renderStepContent = () => {
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
                onClick={() => handleButtonClick(title)}
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
                onKeyDown={(e) => e.key === 'Enter' && handleAddEmail()}
                placeholder="Enter email(s)"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                type="button"
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={handleAddEmail}
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
                    onClick={() => handleRemoveEmail(member.email)}
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
              onChange={handleWorkspaceNameChange}
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
      title={renderModalTitle()}
      isOpen={isOpen}
      onClose={onClose}
      rightButtonText={rightButtonTitle()}
      rightButtonOnClick={formSteps < 4 ? handleNext : () => onSubmit}
      showRightButton={formSteps < 5}
      showLeftButton={true}
      leftButtonText="Back"
      leftButtonOnClick={handlePrev}
      leftButtonDisabled={formSteps === 1}
    >
      <div className="p-4">
        <h3 className="mb-4 text-lg font-semibold">Create a new workspace</h3>
        <form
          onSubmit={onSubmit}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        >
          {renderStepContent()}
          {formSteps === 4 && (
            <Button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white"
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          )}
        </form>
      </div>
    </Modal>
  );
};
