import React, { useState } from 'react';
import { Card, Button, Modal } from '@nabhan/view-module';
import { useNavigate } from 'react-router-dom';
import { Workspace } from '@/types/Workspace.ts';
import { data } from '@utils/data2.ts';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedButton, setSelectedButton] = useState<string>('');
  const [email, setEmail] = useState('');
  const [workspaceName, setWorkspaceName] = useState('My Workspace Name');
  const [emailList, setEmailList] = useState<string[]>([]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('')
      .slice(0, 2);
  };

  const onClickWorkspace = (workspace: Workspace) => {
    navigate(`/workspace/${workspace.id}`, { state: workspace });
  };

  const handleAddEmail = () => {
    if (email && !emailList.includes(email)) {
      setEmailList([...emailList, email]);
      setEmail(''); // Clear the input field
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmailList(emailList.filter((item) => item !== emailToRemove));
  };

  const handleCreateNew = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setStep(1);
    setShowModal(false);
    setSelectedButton('');
  };

  const handleNext = () => {
    if (step === 3) {
      setStep(1);
      setEmailList([]);
      setSelectedButton('');
      setEmail('');
      handleClose();
      return;
    }
    setStep(step + 1);
  };

  const handleButtonClick = (title: string) => {
    setSelectedButton(title); // Set the selected button
  };

  const renderModalTitle = () => {
    switch (step) {
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
    switch (step) {
      case 1:
        return (
          <>
            <div className="gap-lg-3 flex w-full flex-wrap justify-center gap-2">
              {['Work', 'Personal', 'School'].map((title) => (
                <Button
                  key={title}
                  title={title}
                  className={`cursor-pointer text-black shadow-md transition-all duration-300 ease-in-out hover:scale-105 
                  ${selectedButton === title ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-black shadow-md'}`}
                  onClick={() => handleButtonClick(title)}
                />
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
                <Button
                  key={title}
                  title={title}
                  className={`cursor-pointer text-black shadow-md transition-all duration-300 ease-in-out hover:scale-105 
                  ${selectedButton === title ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-black shadow-md'}`}
                  onClick={() => handleButtonClick(title)}
                />
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={(e) => (e.key === 'Enter' ? handleAddEmail() : '')}
                  placeholder="Enter email(s)"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  style={{ height: 40, width: 80 }}
                  title={'Add'}
                  onClick={handleAddEmail}
                >
                  Add
                </Button>
              </div>

              {/* Displaying emails as badges */}
              <div className="flex flex-wrap gap-2">
                {emailList.map((email, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-full bg-blue-100 px-4 py-1 text-blue-800"
                  >
                    <span>{email}</span>
                    <button
                      onClick={() => handleRemoveEmail(email)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      &times;
                    </button>
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
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 "
            />
          </div>
        );
      default:
        return <p> {step}</p>;
    }
  };

  const addWorkspaceIcon = [
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 28 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4V20M4 12H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      onClick: () => handleCreateNew(),
    },
  ];


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
            <button
              onClick={handleCreateNew}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              {/* Plus Icon */}
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Create Workspace
            </button>
          </div>

          {/* Workspaces List */}
          <div className="space-y-4">
            {/* Workspace Card 1 */}
            <div className="w-full cursor-pointer border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
              <div className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  {/* Workspace Icon/Initials */}
                  <div className="rounded-full flex items-center justify-center mr-4 bg-indigo-600 text-white font-bold"
                       style={{ width: '50px', height: '50px' }}>
                    MT
                  </div>
                  <div>
                    <h5 className="font-medium mb-1 hover:underline">Marketing Team</h5>
                    <p className="text-sm text-gray-500">Project planning and task management for marketing campaigns</p>
                  </div>
                </div>

                {/* Members Avatars */}
                <div className="flex">
                  <div className="rounded-full flex items-center justify-center bg-gray-400 text-white"
                       style={{ width: '25px', height: '25px', fontSize: '10px' }}>
                    JD
                  </div>
                  <div className="rounded-full flex items-center justify-center bg-gray-400 text-white"
                       style={{ width: '25px', height: '25px', fontSize: '10px', marginLeft: '-10px' }}>
                    JS
                  </div>
                  <div className="rounded-full flex items-center justify-center bg-gray-400 text-white"
                       style={{ width: '25px', height: '25px', fontSize: '10px', marginLeft: '-10px' }}>
                    AJ
                  </div>
                </div>
              </div>
            </div>

            {/* Workspace Card 2 */}
            <div className="w-full cursor-pointer border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
              <div className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  {/* Workspace Icon/Initials */}
                  <div className="rounded-full flex items-center justify-center mr-4 bg-indigo-600 text-white font-bold"
                       style={{ width: '50px', height: '50px' }}>
                    PD
                  </div>
                  <div>
                    <h5 className="font-medium mb-1 hover:underline">Product Development</h5>
                    <p className="text-sm text-gray-500">Feature planning and issue tracking for our main product</p>
                  </div>
                </div>

                {/* Members Avatars */}
                <div className="flex">
                  <div className="rounded-full flex items-center justify-center bg-gray-400 text-white"
                       style={{ width: '25px', height: '25px', fontSize: '10px' }}>
                    MB
                  </div>
                  <div className="rounded-full flex items-center justify-center bg-gray-400 text-white"
                       style={{ width: '25px', height: '25px', fontSize: '10px', marginLeft: '-10px' }}>
                    SW
                  </div>
                </div>
              </div>
            </div>
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

      {/* Modal Structure (positioned but not shown) */}
      <div className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                  rows="3"
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
      </div>
      {/* Create workspace modal */}
      <Modal
        maxWidth={600}
        isOpen={showModal}
        onClose={handleClose}
        title={renderModalTitle()}
        rightButtonText={step < 3 ? 'Next' : 'Done'}
        rightButtonOnClick={handleNext}
        leftButtonText={'Back'}
        showLeftButton={step > 1}
        leftButtonOnClick={() => setStep(step - 1)}
      >
        {renderStepContent()}
      </Modal>
    </div>
  );
};

export default Home;
