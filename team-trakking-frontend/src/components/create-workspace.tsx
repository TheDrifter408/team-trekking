import {
  useState,
  useRef,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { Check, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onOpenDialog: () => void;
}

// Step rendering

export const CreateWorkspace = ({ isOpen, onOpenDialog, setIsOpen }: Props) => {
  const [step, setStep] = useState(1);

  // State for form data
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [email, setEmail] = useState('');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [workspaceName, setWorkspaceName] = useState(`Jawahiir's Workspace`);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSteps = 5;
  const workspaceUseOptions = ['Work', 'Personal', 'School'];
  const manageOptions = [
    'HR & Recruiting',
    'Operations',
    'Software Development',
    'IT',
    'Sales & CRM',
    'Marketing',
    'Creative & Design',
    'Support',
    'Finance & Accounting',
    'Professional Services',
    'PMO',
    'Startup',
    'Personal Use',
    'Other',
  ];
  const featureOptions = [
    'Scheduling',
    'Docs & Wikis',
    'Ask AI',
    'CRM',
    'Gantt Charts',
    'Goals & OKRs',
    'Calendar',
    'Clips',
    'Boards & Kanban',
    'Tasks & Projects',
    'Time Tracking',
    'Forms',
    'Sprints',
    'Chat',
    'Dashboard',
    'Whiteboard',
    'Workload',
    'Automations',
  ];

  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Form navigation
  const prevStep = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (step > 1) setStep(step - 1);
  };

  const nextStep = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const onSubmit = () => {
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setSelectedPurpose('');
    setSelectedOption('');
    setEmail('');
    setSelectedEmails([]);
    setSelectedFeatures([]);
    setWorkspaceName(`Jawahiir's Workspace`);
  };

  // Form input handlers
  const onSelectPurpose = (option: string) => setSelectedPurpose(option);
  const onSelectOption = (option: string) => setSelectedOption(option);

  const onAddEmail = (emailInput: string) => {
    const trimmedEmail = emailInput.trim();
    if (!trimmedEmail) return;
    const newEmailList: string[] = selectedEmails;
    newEmailList.push(trimmedEmail);
    setSelectedEmails(newEmailList);
    setEmail('');
  };

  const onRemoveEmail = (index: number) => {
    setSelectedEmails((prev) => prev.filter((_, i) => i !== index));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onAddEmail(email);
    } else if (
      e.key === 'Backspace' &&
      email === '' &&
      selectedEmails.length > 0
    ) {
      onRemoveEmail(selectedEmails.length - 1);
    }
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const lastChar = value.slice(-1);
    if (lastChar === ',') {
      onAddEmail(value.slice(0, -1));
    } else {
      setEmail(value);
    }
  };

  const onToggleFeature = (option: string) => {
    setSelectedFeatures((prev) => {
      return prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option];
    });
  };

  // Progress bar component
  const ProgressBar = () => {
    const progress = (step / totalSteps) * 100;

    return (
      <div className="w-full mt-8 mb-4">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 via-violet-500 to-purple-600"
            style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
          />
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-3xl font-bold mb-2">
              What will you use this workspace for?
            </h2>
            <div className="h-48 justify-center items-center flex space-x-2">
              {workspaceUseOptions.map((option) => (
                <Button
                  key={option}
                  onClick={() => onSelectPurpose(option)}
                  className={cn(
                    'w-40 h-12 text-lg hover:bg-primary/80',
                    selectedPurpose === option
                      ? 'hover:bg-purple-800/80 bg-purple-700/90 shadow-lg'
                      : ''
                  )}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="items-center flex flex-col">
            <h2 className="text-3xl font-bold mb-2">
              What would you like to manage?
            </h2>
            <div className="h-48 w-full max-w-2xl justify-center items-center flex flex-wrap gap-2">
              {manageOptions.map((option) => (
                <Button
                  key={option}
                  onClick={() => onSelectOption(option)}
                  variant="outline"
                  className={cn(
                    'h-12 text-lg hover:bg-purple-700 hover:text-white hover:shadow-lg',
                    selectedOption === option
                      ? 'bg-purple-700/90 shadow-lg text-white border-none'
                      : ''
                  )}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="items-center flex flex-col">
            <h2 className="text-3xl font-bold mb-12">
              Invite people to your Workspace:
            </h2>
            <div className="min-h-12 rounded-lg py-2 mb-8 items-center border flex w-full max-w-md">
              <div
                className="flex flex-wrap gap-2 border-input px-5 w-full"
                ref={containerRef}
                onClick={focusInput}
              >
                {selectedEmails.map((email, index) => (
                  <div
                    key={index}
                    className="rounded-sm text-sm border px-2 py-1"
                  >
                    {email}
                  </div>
                ))}
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 text-sm outline-none border-none bg-transparent"
                  value={email}
                  onChange={onEmailChange}
                  onKeyDown={onKeyDown}
                  placeholder={
                    selectedEmails.length === 0 ? 'Enter email addresses' : ''
                  }
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="items-center flex flex-col">
            <h2 className="text-3xl font-bold mb-8">
              Which features are you interested in trying?
            </h2>
            <div className="w-full justify-center items-center flex flex-wrap gap-2">
              {featureOptions.map((option) => {
                const isSelected = selectedFeatures.includes(option);
                return (
                  <Button
                    key={option}
                    variant="outline"
                    onClick={() => onToggleFeature(option)}
                    className="h-10"
                  >
                    <span className="flex-1 text-left">{option}</span>
                    <div
                      className={cn(
                        'h-4 w-4 rounded border flex items-center justify-center transition-colors',
                        isSelected
                          ? 'bg-purple-700 border-purple-700'
                          : 'border-primary'
                      )}
                    >
                      {isSelected && (
                        <Check className="text-white" strokeWidth={2} />
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>
            <span className="text-sm mt-2">
              Don't worry, you will have access to all of these in your
              Workspace.
            </span>
          </div>
        );
      case 5:
        return (
          <div className="items-center flex flex-col">
            <h2 className="text-3xl font-bold mb-12">
              Lastly, what would you like to name your Workspace?
            </h2>
            <div className="flex">
              <Input
                className="h-12 min-w-64 text-base font-medium text-center"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
            </div>
            <span className="text-sm mt-2">
              Try the name of your organization.
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  const renderFooter = () => (
    <div className="flex justify-between w-full">
      {step > 1 && (
        <Button
          variant="outline"
          onClick={prevStep}
          className="w-32 h-10 text-lg"
          type="button"
        >
          <ChevronsLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      )}
      {step < totalSteps ? (
        <Button
          onClick={nextStep}
          className={cn(
            'w-32 ml-auto h-10 text-lg bg-purple-700/90 shadow-lg hover:bg-purple-700/80'
          )}
        >
          Next <ChevronsRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button
          onClick={onSubmit}
          type="button"
          className={cn(
            'w-32 ml-auto h-10 text-lg bg-purple-700/90 shadow-lg hover:bg-purple-700/80'
          )}
        >
          Finish
        </Button>
      )}
    </div>
  );
  return (
    <Dialog open={isOpen} onOpenChange={onOpenDialog}>
      <DialogOverlay className="bg-black/30 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

      <DialogContent className="sm:max-w-lg md:max-w-2xl lg:max-w-3xl h-[90vh] flex flex-col p-0">
        {/* Fixed Header */}
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl">Team Trekking</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col flex-1"
        >
          {/* Main content area with proper centering */}
          <div className="flex-1 flex items-center justify-center overflow-y-auto p-2">
            {renderStep()}
          </div>

          {/* Fixed Footer */}
          <div className="mt-auto border px-6 pb-4">
            <ProgressBar />
            <DialogFooter>{renderFooter()}</DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
