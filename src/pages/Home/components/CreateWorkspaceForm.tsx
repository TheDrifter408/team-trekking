import {  ChangeEvent, FC, useState } from "react";
import { Button, Modal } from "@nabhan/view-module";
import { CreateWorkspaceFormProps } from "@/types/Props";

export const CreateWorkspaceForm:FC<CreateWorkspaceFormProps> = ({ 
    isOpen, 
    onClose, 
    state, 
    setState, 
    onSubmit,
    formSteps,
    setFormSteps,
    isSubmitting,
    memberEmail,
    setMemberEmail }) => {
    

    const [selectedButton, setSelectedButton] = useState<string>('');
    
    const handleButtonClick = (title: string) => {
        setSelectedButton(title); // Set the selected button
    };

    const handleAddEmail = () => {

        if (memberEmail.length > 0 && !state.members.find((item) => item.email === memberEmail)) {
            const newId = String(state.members.length + 1);
            setState("members", [...state.members, { id: newId, email: memberEmail, name:"", avatar:"" } ]);
            setMemberEmail(''); // Clear the input field
        }
    };

    const handleWorkspaceNameChange = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length > 0) {
            setState("name", e.currentTarget.value);
        }
    }

    const handleRemoveEmail = (emailToRemove: string) => {
        setState("members", state.members.filter((member) => member.email !== emailToRemove));
    };

    const handleNext = () => {
        if (formSteps === 4) {
            return; // Do nothing
        }
        setFormSteps((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (formSteps === 1) {
            return;
        }
        setFormSteps((prev) => prev - 1);
    };

    const renderModalTitle = () => {
        switch (formSteps) {
            case 1:
                return 'What will you use this workspace for?';
            case 2:
                return 'What would you like to manage?';
            case 3:
                return 'Invite others to your workspace';
            case 4:
                return 'Almost there. What would you like to name your workspace?';
            default:
                return 'What will you use this workspace?';
        }
    };
    
    const renderStepContent = () => {
        switch (formSteps) {
            case 1:
            return (
                <>
                <div className="gap-lg-3 flex flex-wrap justify-center gap-2">
                    {['Work', 'Personal', 'School'].map((title) => (
                    <Button type="button"
                        key={title}
                        className={`cursor-pointer text-black shadow-md transition-all duration-300 ease-in-out hover:scale-105 
                        ${selectedButton === title ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-black shadow-md'}`}
                        onClick={() => handleButtonClick(title)}
                    >
                        {title}
                    </Button>
                    ))}
                </div>
                </>
            );
            case 2:
            return (
                <>
                <div className="gap-lg-3 flex w-full flex-wrap justify-center gap-2">
                    {[
                    'Software Development',
                    'Marketing',
                    'Finance',
                    'Personal Use',
                    'It',
                    'HR & Recruiting',
                    'PMO',
                    ].map((title) => (
                    <Button type="button"
                        key={title}
                        className={`cursor-pointer text-black shadow-md transition-all duration-300 ease-in-out hover:scale-105 
                        ${selectedButton === title ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-black shadow-md'}`}
                        onClick={() => handleButtonClick(title)}
                    >
                        {title}
                    </Button>
                    ))}
                </div>
                </>
            );
            case 3:
            return (
                <>
                <div className="mx-auto w-full max-w-md">
                    {/* Email input and add button */}
                    <div className="mb-4 flex items-center gap-2">
                    <input
                        type="email"
                        value={memberEmail}
                        onChange={(e) => setMemberEmail(e.target.value)}
                        onKeyDown={(e) => (e.key === 'Enter' ? handleAddEmail() : '')}
                        placeholder="Enter email(s)"
                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button type="button"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={handleAddEmail}
                    >
                        Add
                    </Button>
                    </div>
    
                    {/* Displaying emails as badges */}
                    <div className="flex flex-wrap gap-2">
                    {state.members.map((member, index) => (
                        <div
                        key={index}
                        className="flex items-center rounded-full bg-blue-100 px-4 py-1 text-blue-800"
                        >
                        <span>{member.email}</span>
                        <Button type="button"
                            onClick={() => handleRemoveEmail(member.email)}
                            className="ml-2 text-red-500 hover:text-red-700"
                        >
                            &times;
                        </Button>
                        </div>
                    ))}
                    </div>
                </div>
                </>
            );
            case 4:
            return (
                <div className={'pb-5 pt-3'}>
                <input
                    type="text"
                    value={state.name}
                    name="name"
                    id="name"
                    onChange={handleWorkspaceNameChange}
                    placeholder="Workspace Name"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 "
                />
                </div>
            );
            default:
            return <p>{formSteps}</p>;
        }
    };
    return (
        <Modal 
            title={renderModalTitle()} 
            isOpen={isOpen} onClose={onClose} 
            rightButtonText={formSteps === 4 ? 'Create' : 'Next'} 
            rightButtonOnClick={ formSteps < 4 ? handleNext : () => {}}
            showRightButton={ formSteps < 4 ? true : false}
            showLeftButton={true}
            leftButtonText="Back"
            leftButtonOnClick={handlePrev}
            leftButtonDisabled={formSteps === 1}
            >
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">Create a new workspace</h3>
                {/* The onKeyDown prevents premature form submission */}
                <form onSubmit={onSubmit} onKeyDown={(e) => e.key === 'Enter' ? e.preventDefault() : ''}>
                    { renderStepContent() }
                    {
                        formSteps === 4 ? (
                            <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                {
                                    isSubmitting ? 'Creating...' : 'Create'
                                }
                            </Button>
                        ) : <></>
                    }
                </form>
            </div>
        </Modal>
    )
}