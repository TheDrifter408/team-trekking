import {
  useState,
  useRef,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { Check, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icon } from '@/assets/icon-path';
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
import { workspacePurposeOptions, manageOptions } from '@/mock';
import { LABEL } from '@/lib/constants';

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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ManagePurpose
            workspacePurposeOptions={workspacePurposeOptions}
            onSelectPurpose={onSelectPurpose}
            selectedPurpose={selectedPurpose}
          />
        );
      case 2:
        return (
          <ManaegFeatures
            manageOptions={manageOptions}
            selectedOption={selectedOption}
            onSelectOption={onSelectOption}
          />
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenDialog}>
      <DialogOverlay className="  bg-content-tertiary/10 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

      <DialogContent className="sm:max-w-lg md:max-w-2xl lg:max-w-3xl !max-w-[70%] h-[90vh] flex flex-col p-0">
        {/* Fixed Header */}
        <DialogHeader className="px-6 py-4">
          <DialogTitle className="text-xl w-full px-4 flex justify-between items-center">
            <span className={"font-bold text-3xl'"}>Team Trekking</span>
            <span className={'font-semibold text-2xl'}>
              Welcome, Jawahiir Nabhan!
            </span>
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col flex-1"
        >
          {/* Main content area with proper centering */}
          <div className="flex-1 flex  justify-center overflow-y-auto px-2">
            {renderStep()}
          </div>

          {/* Fixed Footer */}
          <div className="mt-auto px-6 pb-4">
            <ProgressBar step={step} totalSteps={totalSteps} />
            <DialogFooter>
              <Footer
                step={step}
                prevStep={prevStep}
                nextStep={nextStep}
                totalSteps={totalSteps}
                onSubmit={onSubmit}
              />
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ManagePurpose = ({
  workspacePurposeOptions,
  onSelectPurpose,
  selectedPurpose,
}) => {
  return (
    <div className="flex flex-col items-center pt-4">
      <h2 className="text-4xl text-content-default font-bold mb-4">
        {LABEL.WHAT_WILL_YOU_USE_THIS_WORKSPACE_FOR}
      </h2>
      <div className="min-h-48 justify-center items-center flex flex-wrap gap-2">
        {workspacePurposeOptions.map((option) => (
          <Button
            key={option}
            variant="outline"
            onClick={() => onSelectPurpose(option)}
            className={cn(
              'min-w-[180px] py-[12px] px-[20px] hover:bg-theme-main hover:text-primary-foreground h-12 text-xl font-medium text-content-onboarding-secondary ',
              selectedPurpose === option
                ? 'bg-theme-main-dark shadow-theme-main shadow-lg border-theme-main text-primary-foreground'
                : ''
            )}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

const ManaegFeatures = ({ onSelectOption, manageOptions, selectedOption }) => {
  return (
    <div className="flex flex-col items-center pt-4">
      <h2 className="text-4xl text-content-default font-bold mb-4">
        {LABEL.WHAT_WOULD_YOU_LIKE_TO_MANAGE}
      </h2>
      <div className="h-48 w-full max-w-2xl justify-center items-center flex flex-wrap gap-2">
        {manageOptions.map((option) => (
          <Button
            key={option}
            onClick={() => onSelectOption(option)}
            variant="outline"
            className={cn(
              'h-12 text-lg text-content-onboarding-secondary hover:bg-theme-main-dark hover:text-white hover:shadow-lg',
              selectedOption === option
                ? 'bg-theme-main-dark shadow-md shadow-theme-main text-white border-none'
                : ''
            )}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

const ProgressBar = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;
  return (
    <div className="w-full mt-8 mb-4">
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 via-violet-500 to-purple-600"
          style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
        />
      </div>
    </div>
  );
};

const Footer = ({ step, prevStep, nextStep, totalSteps, onSubmit }) => (
  <div className="flex justify-between w-full">
    {step > 1 && (
      <Button
        variant="outline"
        onClick={prevStep}
        className={cn(
          '!w-[113px] !h-[58px] text-xl flex items-center rounded-lg'
        )}
        type="button"
      >
        <Icon
          name={'dropdownarrow'}
          className={'rotate-90 size-4 text-content-default'}
        />
        Back
      </Button>
    )}
    {step < totalSteps ? (
      <Button
        onClick={nextStep}
        className={cn(
          'ml-auto !w-[113px] bg-theme-main-dark !h-[58px] text-xl flex items-center rounded-lg'
        )}
      >
        Next <Icon name={'dropdownarrow'} className={'-rotate-90 size-4'} />
      </Button>
    ) : (
      <Button
        onClick={onSubmit}
        type="button"
        className={cn('w-32 ml-auto h-10 text-lg')}
      >
        Finish
      </Button>
    )}
  </div>
);
