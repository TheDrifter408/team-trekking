import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Button, Modal, Input } from '../lib/main';
import CardComponentTesting from './tests/cards.tsx';
import BadgeComponentTest from './tests/badges.tsx';

const ComponentShowcase: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    setDarkMode(isDarkMode);
  }, []);

  // Toggle loading state for demo
  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  // Icons for demonstration
  const SearchIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

  const Github = () => (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const [open, setIsOpen] = useState(false);

  return (
    <Container className="py-3">
      <div className="">
        <Input></Input>
      </div>
      <div className="absolute top-4 right-4">
        <Button
          onClick={() => setIsOpen(true)}
          className={`py-2 mx-1 rounded-md flex  items-center gap-2 justify-between  ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
        >
          <div className={'flex-grow text-center'}>
            {darkMode ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                ></path>
              </svg>
            )}
          </div>
        </Button>
        <Modal isOpen={open} onClose={() => setIsOpen(false)} title={'Test'}>
          HELLo{' '}
        </Modal>
      </div>
      <div className="space-y-4">
        <Button
          className={`py-2 mx-1 rounded-md flex  items-center gap-2 justify-between 
        ${
          darkMode
            ? 'bg-gray-800 hover:bg-gray-700 text-blue-700'
            : 'bg-amber-500 hover:border hover:border-1 hover:border-green-700 '
        }`}
          leftIcons={[
            { icon: <SearchIcon />, onClick: toggleDarkMode },
            { icon: <Github />, onClick: toggleDarkMode },
          ]}
          rightIcons={[{ icon: <SearchIcon />, onClick: toggleDarkMode }]}
          style={{ width: '250px' }}
        >
          <div className="flex-grow text-right">Github</div>
        </Button>

        <Button
          onClick={() => {}}
          style={{ width: '250px' }}
          leftIcons={[{ icon: <Github />, onClick: () => {} }]}
          rightIcons={[{ icon: <Github />, onClick: () => {} }]}
          className="p-2 mx-1 rounded-md flex  items-center gap-2 justify-between  bg-bg-inverted border border-border-primary text-text-default gap-2"
        >
          <div className={'flex-grow text-center'}>Google</div>
        </Button>

        {/*<Button loading={loading} className={'bg-indigo-700 hover:bg-indigo-900 hover:text-gray-100 rounded-3'} size="lg"*/}
        {/*        leftIcon={<SearchIcon/>}*/}
        {/*        rightIcon={<UserIcon/>}*/}
        {/*        onLeftIconClick={() => alert("Left icon clicked")}*/}
        {/*        onRightIconClick={() => alert("Right icon clicked")}*/}
        {/*        onClick={handleLoadingClick}*/}
        {/*>*/}
        {/*    {!loading ? "Search" : "Loading"}*/}
        {/*</Button>*/}

        <Button className={'border-1 w-[400px] border-blue-500'}>
          Outline Button
        </Button>

        <Button className="relative inline-block hover:text-blue-700 underline-offset-5 transition ease-in-out duration-300 group">
          Link Button
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 ease-in-out group-hover:w-full inline-block"></span>
        </Button>

        <Button className="relative inline-block  group text-blue-700 hover:text-blue-700 transition ease-in-out duration-300">
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          Link Button
        </Button>

        <Button
          loading={loading}
          className={
            'text-red-500 rounded-4 px-1  hover:bg-gray-300 hover:text-green-700'
          }
          onClick={handleLoadingClick}
        >
          {loading ? 'Processing...' : 'Click Me'}
        </Button>
      </div>
      <div>
        <CardComponentTesting />
      </div>
      <div className="">
        <BadgeComponentTest />
      </div>
    </Container>
  );
};

function App() {
  return <ComponentShowcase />;
}

export default App;
