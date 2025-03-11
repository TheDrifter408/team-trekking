import React, { useState } from 'react';
import { Card, Button, Modal } from '@nabhan/view-module';
import { useNavigate } from 'react-router-dom';
import { Workspace } from '@/types/workspace';

const workspaces: Workspace[] = [
  {
    id: '1',
    name: 'Design Team',
    description: 'Creative design and branding workspace',
    image: '',
    members: [
      { id: '1', name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: '2', name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { id: '3', name: 'Mike Johnson' }, // No avatar
      { id: '4', name: 'Perry', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: '4', name: 'Perry', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: '4', name: 'Perry', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    ],
  },
  {
    id: '2',
    name: 'Marketing',
    description: 'Marketing and communication strategies',
    image: '',
    members: [
      { id: '4', name: 'Sarah Lee', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
      { id: '5', name: 'Alex Chen' }, // No avatar
    ],
  },
  {
    id: '3',
    name: 'Development',
    description: 'Software engineering and web development',
    image: '',
    members: [
      { id: '6', name: 'Emily Carter', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
      { id: '7', name: 'Liam Scott' }, // No avatar
      { id: '8', name: 'Noah Wilson', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
    ],
  },
  {
    id: '4',
    name: 'HR & Recruitment',
    description: 'Managing employee relations and hiring',
    image: '', // No workspace image
    members: [
      { id: '9', name: 'Sophia Adams' }, // No avatar
      { id: '10', name: 'Ethan Green', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
    ],
  },
];

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
      .map(word => word[0].toUpperCase())
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
    setEmailList(emailList.filter(item => item !== emailToRemove));
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
              {['Work', 'Personal', 'School'].map(title => (
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
              ].map(title => (
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
                  onChange={e => setEmail(e.target.value)}
                  onKeyUp={e => (e.key === 'Enter' ? handleAddEmail() : '')}
                  placeholder="Enter email(s)"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button style={{ height: 40, width: 80 }} title={'Add'} onClick={handleAddEmail}>
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
              onChange={e => setWorkspaceName(e.target.value)}
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
    <div className="min-h-screen bg-bg-secondary flex items-center justify-center min-w-full">
      <div className={''}>
        {/* Button aligned to the top right */}
        <div className="d-flex justify-content-end ">
          <Button
            title={'Create workspace'}
            className="px-4 mr-4 my-2  bg-primary"
            onClick={handleCreateNew}
            leftIcons={addWorkspaceIcon}
          />
        </div>

        {/* Workspaces List */}
        <div className="mx-3">
          {workspaces.map(workspace => (
            <Card
              variant="elevated"
              className="w-100 mb-3 max-w-screen-lg cursor-pointer border py-3 shadow-sm "
              key={workspace.id}
              onClick={() => onClickWorkspace(workspace)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  {workspace.image ? (
                    <img
                      src={workspace.image}
                      alt={workspace.name}
                      className="rounded-circle me-2 border"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      className="rounded-circle d-flex align-items-center bg-tertiary justify-content-center me-2 font-bold text-white"
                      style={{ width: '65px', height: '65px' }}
                    >
                      {getInitials(workspace.name)}
                    </div>
                  )}
                  <div>
                    <h5 className="textf mb-1 hover:underline">{workspace.name}</h5>
                    <p className="font-light text-secondary">{workspace.description}</p>
                  </div>
                </div>

                {/* Right Section - Members' Avatars or Initials */}
                <div className="d-flex">
                  {workspace.members.slice(0, 3).map((member, index) =>
                    member.avatar ? (
                      <img
                        key={member.id}
                        src={member.avatar}
                        alt={member.name}
                        className="rounded-circle border"
                        style={{
                          width: '25px',
                          height: '25px',
                          objectFit: 'cover',
                          marginLeft: index === 0 ? '0' : '-10px',
                          border: '2px solid white',
                        }}
                      />
                    ) : (
                      <div
                        key={member.id}
                        className="rounded-circle d-flex align-items-center justify-content-center border bg-secondary text-white"
                        style={{
                          width: '25px',
                          height: '25px',
                          fontWeight: 'bold',
                          marginLeft: index === 0 ? '0' : '-10px',
                          border: '2px solid white',
                        }}
                      >
                        {getInitials(member.name)}
                      </div>
                    )
                  )}
                </div>
              </div>
            </Card>
          ))}
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
    </div>
  );
};

export default Home;
