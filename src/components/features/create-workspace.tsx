import React, {
  useState,
  useRef,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import { Icon } from '@/assets/icon-path.tsx';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from '@/components/shadcn-ui/dialog.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { Input } from '@/components/shadcn-ui/input.tsx';
import {
  ManagePurposeProps,
  ManageFeaturesProps,
  InvitePeopleProps,
  SelectFeaturesProps,
  NameWorkspaceProps,
  FooterProps,
  ProgressBarProps,
  ManageToolsProps,
} from '@/types/props/Layout.ts';
import {
  workspacePurposeOptions,
  manageOptions,
  featureOptions,
  toolOptions,
} from '@/mock';
import { LABEL } from '@/lib/constants';
import { useIsMobile } from '@/lib/hooks/use-mobile';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onOpenDialog: () => void;
}

export const CreateWorkspace: React.FC<Props> = ({
  isOpen,
  onOpenDialog,
  setIsOpen,
}) => {
  const [step, setStep] = useState<number>(1);

  // State for form data with proper types
  const [selectedPurpose, setSelectedPurpose] = useState<string | ''>('');
  const [selectedOption, setSelectedOption] = useState<string | ''>('');
  const [email, setEmail] = useState<string>('');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [workspaceName, setWorkspaceName] = useState<string>(
    LABEL.JAWAHIIRS_WORKSPACE
  );

  const isMobile = useIsMobile();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSteps = 6;

  const focusInput = (): void => {
    inputRef.current?.focus();
  };

  // Form navigation
  const prevStep = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (step > 1) setStep(step - 1);
  };

  const nextStep = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const onSubmit = (): void => {
    setIsOpen(false);
    resetForm();
  };

  const resetForm = (): void => {
    setStep(1);
    setSelectedPurpose('');
    setSelectedOption('');
    setEmail('');
    setSelectedEmails([]);
    setSelectedTools([]);
    setSelectedFeatures([]);
    setWorkspaceName(LABEL.JAWAHIIRS_WORKSPACE);
  };

  // Form input handlers with proper types
  const onSelectPurpose = (option: string): void => {
    setSelectedPurpose(option);
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const onSelectOption = (option: string): void => setSelectedOption(option);

  const onAddEmail = (emailInput: string): void => {
    const trimmedEmail = emailInput.trim();
    if (!trimmedEmail) return;

    // Fix: Create new array instead of mutating existing one
    setSelectedEmails((prev) => [...prev, trimmedEmail]);
    setEmail('');
  };

  const onRemoveEmail = (index: number): void => {
    setSelectedEmails((prev) => prev.filter((_, i) => i !== index));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
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

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const lastChar = value.slice(-1);
    if (lastChar === ',') {
      onAddEmail(value.slice(0, -1));
    } else {
      setEmail(value);
    }
  };

  const onToggleTool = (tool: string): void => {
    setSelectedTools((prev) => {
      return prev.includes(tool)
        ? prev.filter((item) => item !== tool)
        : [...prev, tool];
    });
  };

  const onToggleFeature = (option: string): void => {
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
          <ManageFeatures
            manageOptions={manageOptions}
            selectedOption={selectedOption}
            onSelectOption={onSelectOption}
          />
        );
      case 3:
        return (
          <InvitePeople
            email={email}
            selectedEmails={selectedEmails}
            onEmailChange={onEmailChange}
            onKeyDown={onKeyDown}
            onRemoveEmail={onRemoveEmail}
            inputRef={inputRef}
            containerRef={containerRef}
            focusInput={focusInput}
          />
        );
      case 4:
        return (
          <ManageTools
            selectedTools={selectedTools}
            onToggleTool={onToggleTool}
          />
        );
      case 5:
        return (
          <SelectFeatures
            selectedFeatures={selectedFeatures}
            onToggleFeature={onToggleFeature}
          />
        );
      case 6:
        return (
          <NameWorkspace
            workspaceName={workspaceName}
            setWorkspaceName={setWorkspaceName}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenDialog}>
      <DialogOverlay className="bg-content-tertiary/10 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

      <DialogContent className="!max-w-[95vw] sm:!max-w-[70vw] h-[95vh] sm:h-[90vh] flex flex-col p-0">
        {/* Fixed Header */}
        <DialogHeader className="px-4 sm:px-6 py-4">
          <DialogTitle className="text-xl w-full px-2 sm:px-4 flex justify-between items-center">
            {!isMobile && (
              <>
                <span className={'font-bold text-3xl'}>Team Trekking</span>
                <span className={'font-semibold text-2xl'}>
                  Welcome, Jawahiir Nabhan!
                </span>
              </>
            )}
            {isMobile && (
              <div className="w-full text-center">
                <div className="text-lg font-bold">Team Trekking</div>
                <div className="text-sm font-medium text-content-onboarding-secondary">
                  Welcome, Jawahiir Nabhan!
                </div>
              </div>
            )}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col flex-1"
        >
          {/* Main content area with proper centering */}
          <div className="flex-1 flex justify-center overflow-y-auto px-2 sm:px-4 ">
            {renderStep()}
          </div>

          {/* Fixed Footer */}
          <div className="mt-auto px-4 sm:px-6 pb-4">
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

// Step Components
const ManagePurpose: React.FC<ManagePurposeProps> = ({
  workspacePurposeOptions,
  onSelectPurpose,
  selectedPurpose,
}) => {
  return (
    <div className="flex flex-col items-center pt-4 w-full max-w-4xl">
      <h2 className="text-2xl sm:text-4xl font-bold text-content-default text-center mb-6 sm:mb-8 px-4">
        {LABEL.WHAT_WILL_YOU_USE_THIS_WORKSPACE_FOR}
      </h2>
      <div className="h-full w-full justify-center items-center flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-2">
        {workspacePurposeOptions.map((option) => (
          <Button
            key={option}
            variant="outline"
            onClick={() => onSelectPurpose(option)}
            className={cn(
              'w-full sm:w-auto sm:min-w-[180px] py-3 sm:py-[12px] px-4 sm:px-[20px] hover:bg-theme-main hover:text-primary-foreground h-12 text-lg sm:text-xl font-medium text-content-onboarding-secondary ',
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

const ManageFeatures: React.FC<ManageFeaturesProps> = ({
  onSelectOption,
  manageOptions,
  selectedOption,
}) => {
  return (
    <div className="flex flex-col items-center pt-4 w-full max-w-4xl">
      <h2 className="text-2xl sm:text-4xl text-content-default font-bold mb-6 sm:mb-4 text-center px-4">
        {LABEL.WHAT_WOULD_YOU_LIKE_TO_MANAGE}
      </h2>
      <div className="h-full w-full flex items-center ">
        <div className="h-48 w-full justify-center items-center flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-2">
          {manageOptions.map((option) => (
            <Button
              key={option}
              onClick={() => onSelectOption(option)}
              variant="outline"
              className={cn(
                'w-full sm:w-auto h-12 text-base sm:text-lg text-content-onboarding-secondary hover:bg-theme-main-dark hover:text-white hover:shadow-lg',
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
    </div>
  );
};

const InvitePeople: React.FC<InvitePeopleProps> = ({
  email,
  selectedEmails,
  onEmailChange,
  onKeyDown,
  inputRef,
  containerRef,
  focusInput,
}) => {
  return (
    <div className="items-center flex flex-col w-full max-w-2xl">
      <h2 className="text-2xl sm:text-4xl font-bold text-content-default mb-8 sm:mb-12 text-center px-4">
        {LABEL.INVITE_PEOPLE_TO_YOUR_WORKSPACE}
      </h2>
      {/* Gradient border wrapper */}
      <div className="min-h-12 rounded-lg gradient-border mb-8 w-full max-w-md mx-4 sm:mx-0">
        <div className="min-h-12 rounded-lg py-2 items-center bg-white flex w-full">
          <div
            className="flex flex-wrap gap-2 px-3 sm:px-5 w-full"
            ref={containerRef}
            onClick={focusInput}
          >
            {selectedEmails.map((email, index) => (
              <div
                key={index}
                className="rounded-sm font-medium text-content-onboarding-secondary text-sm border px-2 py-1"
              >
                {email}
              </div>
            ))}
            <Input
              ref={inputRef}
              type="text"
              className="flex-1 !text-base sm:!text-lg border-none outline-none !ring-0 focus-visible-none bg-transparent placeholder:text-base sm:placeholder:text-lg placeholder:text-content-onboarding-secondary"
              value={email}
              onChange={onEmailChange}
              onKeyDown={onKeyDown}
              placeholder={
                selectedEmails.length === 0
                  ? LABEL.ENTER_EMAIL_ADDRESSES_ONBOARDING
                  : ''
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ManageTools: React.FC<ManageToolsProps> = ({
  selectedTools,
  onToggleTool,
}) => {
  return (
    <div className="items-center flex flex-col w-full max-w-5xl">
      <h2 className="text-2xl sm:text-4xl font-bold text-content-default mb-8 sm:mb-12 text-center px-4">
        Which tools would you like to integrate?
      </h2>
      <div className="h-full w-full flex items-center">
        <div className="w-full  justify-center items-center flex flex-col sm:flex-row sm:flex-wrap gap-3">
          {toolOptions.map((tool) => {
            const isSelected = selectedTools.includes(tool);
            return (
              <Button
                key={tool}
                variant="outline"
                onClick={() => onToggleTool(tool)}
                className={cn(
                  'w-full sm:w-auto h-12 sm:min-w-[160px] rounded-xl text-content-onboarding-secondary text-sm sm:text-base font-medium hover:shadow-lg transition-all duration-200',
                  isSelected && ' border-theme-main shadow-theme-main shadow-sm'
                )}
              >
                <span className="flex-1 text-center">{tool}</span>
                <div
                  className={cn(
                    'h-4 w-4 ml-2 rounded border flex items-center justify-center transition-colors',
                    isSelected ? '' : 'border-primary'
                  )}
                >
                  {isSelected && (
                    <Check
                      className="bg-theme-main-dark text-white"
                      strokeWidth={2}
                      size={12}
                    />
                  )}
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SelectFeatures: React.FC<SelectFeaturesProps> = ({
  selectedFeatures,
  onToggleFeature,
}) => {
  return (
    <div className="items-center flex flex-col w-full max-w-5xl">
      <h2 className="text-2xl sm:text-4xl font-bold text-content-default mb-8 sm:mb-12 text-center px-4">
        {LABEL.WHICH_FEATURES_ARE_YOU_INTERESTED_IN}
      </h2>
      <div className="flex h-full w-full items-center">
        <div className="w-full justify-center items-center flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-2">
          {featureOptions.map((option) => {
            const isSelected = selectedFeatures.includes(option);
            return (
              <Button
                key={option}
                variant="outline"
                onClick={() => onToggleFeature(option)}
                className={cn(
                  'w-full sm:w-auto h-12 rounded-xl text-content-onboarding-secondary text-sm sm:text-base font-medium',
                  isSelected &&
                    'border-[1px] border-theme-main shadow-theme-main shadow-sm'
                )}
              >
                <span className="flex-1 text-left">{option}</span>
                <div
                  className={cn(
                    'h-4 w-4 rounded border flex items-center justify-center transition-colors',
                    isSelected ? 'bg-theme-main-dark' : 'border-primary'
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
      </div>
      <span className="text-xs sm:text-sm mt-2 text-center px-4">
        Don't worry, you will have access to all of these in your Workspace.
      </span>
    </div>
  );
};

const NameWorkspace: React.FC<NameWorkspaceProps> = ({
  workspaceName,
  setWorkspaceName,
}) => {
  return (
    <div className="items-center flex flex-col w-full max-w-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-content-default text-center mb-8 px-4">
        {LABEL.LASTLY_WHAT_WOULD_YOU_LIKE_TO_NAME_YOUR_WORKSPACE}
      </h2>
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Input
          className="h-12 w-full max-w-[270px] !text-lg sm:!text-xl text-center mx-4"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />
        <span className="text-xs sm:text-sm text-content-tertiary mt-2 text-center">
          Try the name of your organization.
        </span>
      </div>
    </div>
  );
};

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;
  return (
    <div className="w-full mt-6 sm:mt-8 mb-4">
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-400 via-violet-500 to-purple-600"
          style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
        />
      </div>
    </div>
  );
};

const Footer: React.FC<FooterProps> = ({
  step,
  prevStep,
  nextStep,
  totalSteps,
  onSubmit,
}) => (
  <div className="flex justify-between w-full gap-2 sm:gap-0">
    {step > 1 && (
      <Button
        variant="outline"
        onClick={prevStep}
        className={cn(
          'w-24 sm:!w-[113px] !h-12 sm:!h-[58px] text-base sm:text-xl flex items-center rounded-lg'
        )}
        type="button"
      >
        <Icon
          name={'dropdownarrow'}
          className={'rotate-90 size-3 sm:size-4 text-content-default'}
        />
        <span className="hidden sm:inline">Back</span>
        <span className="sm:hidden">Back</span>
      </Button>
    )}
    {step < totalSteps ? (
      <Button
        onClick={nextStep}
        className={cn(
          'ml-auto w-24 sm:!w-[113px] bg-theme-main-dark !h-12 sm:!h-[58px] text-base sm:text-xl flex items-center rounded-lg'
        )}
      >
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden">Next</span>
        <Icon
          name={'dropdownarrow'}
          className={'-rotate-90 size-3 sm:size-4'}
        />
      </Button>
    ) : (
      <Button
        onClick={onSubmit}
        type="button"
        className={cn(
          'ml-auto w-24 sm:!w-[113px] bg-theme-main-dark !h-12 sm:!h-[58px] text-base sm:text-xl flex items-center rounded-lg'
        )}
      >
        Finish
      </Button>
    )}
  </div>
);
