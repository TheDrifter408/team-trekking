import React, {
  useState,
  useRef,
  useMemo,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils/utils.ts';
import { Icon } from '@/assets/icon-path.tsx';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { LABEL } from '@/lib/constants';
import { emailInputSchema } from '@/lib/validation/validationSchema';
import { useIsMobile } from '@/lib/hooks/use-mobile';
import {
  useCreateWorkSpaceMutation,
  useWorkspaceGlobalQuery,
} from '@/service/rtkQueries/workspaceQuery.ts';
import { useAuthStore } from '@/stores/zustand/auth-store.ts';
import {
  ConnectedTool,
  InterestedFeature,
  ManageType,
  WorkType,
} from '@/types/request-response/workspace/ApiResponse.ts';
import { useWorkspaceStore } from '@/stores/zustand/workspace-store.ts';

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
  const { isFirstTimeLogin, setIsFirstTimeLogin } = useAuthStore();
  const { setCurrentWorkspace } = useWorkspaceStore();
  const [step, setStep] = useState<number>(1);
  // State for form data with proper types
  const [selectedWorkSpaceType, setSelectedWorkSpaceType] = useState<
    WorkType | undefined
  >(undefined);
  const [selectedManage, setSelectedManage] = useState<ManageType | undefined>(
    undefined
  );
  const [selectedDiscovery, setSelectedDiscovery] = useState<
    ManageType | undefined
  >(undefined);
  const [email, setEmail] = useState<string>('');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<ConnectedTool[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<InterestedFeature[]>(
    []
  );
  const [workspaceName, setWorkspaceName] = useState<string>(
    LABEL.JAWAHIIRS_WORKSPACE
  );

  const isMobile = useIsMobile();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: workSpaceGlobal } = useWorkspaceGlobalQuery();
  const [createWorkSpaceApi, { data, isLoading }] =
    useCreateWorkSpaceMutation();

  // Calculate total steps based on first-time login status
  const totalSteps = isFirstTimeLogin ? 7 : 6;

  const focusInput = (): void => {
    inputRef.current?.focus();
  };

  // Validation function to check if current step can proceed
  const canProceedToNextStep = (): boolean => {
    // Allow all steps to proceed, except the final step
    if ((!isFirstTimeLogin && step === 6) || (isFirstTimeLogin && step === 7)) {
      return workspaceName.trim() !== '';
    }
    // All other steps are optional
    return true;
  };

  // Form navigation
  const prevStep = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (step > 1) setStep(step - 1);
  };

  const stepCalculation = () => {
    if (step < totalSteps && canProceedToNextStep()) {
      setStep(step + 1);
    }
  };

  const nextStep = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    stepCalculation();
  };

  const onSubmit = async (): void => {
    if (isFirstTimeLogin) {
      return;
    }
    const requestParams = {
      name: workspaceName,

      ...(selectedTools.length > 0 && {
        connectedToolIds: selectedTools.map((data) => data.id),
      }),

      ...(selectedFeatures.length > 0 && {
        interestedFeatureIds: selectedFeatures.map((data) => data.id),
      }),

      ...(selectedEmails.length > 0 && {
        members: selectedEmails.map((email) => ({ email })),
      }),

      ...(selectedWorkSpaceType?.id !== undefined && {
        workTypeId: Number(selectedWorkSpaceType.id),
      }),

      ...(selectedManage?.id !== undefined && {
        manageTypeId: Number(selectedManage.id),
      }),

      ...(selectedManage?.name && {
        customManageType: selectedManage.name,
      }),

      ...(selectedDiscovery?.id !== undefined && {
        discoverySourceId: Number(selectedDiscovery.id),
      }),

      ...(selectedDiscovery?.name && {
        customDiscoverySource: selectedDiscovery.name,
      }),
    };
    const { data } = await createWorkSpaceApi(requestParams);
    if (data) {
      setCurrentWorkspace({
        name: data.name,
        id: data.id,
      });
      setIsOpen(false);
      resetForm();
      setIsFirstTimeLogin(false);
    }
  };

  const resetForm = (): void => {
    setStep(1);
    setSelectedWorkSpaceType(undefined);
    setSelectedManage(undefined);
    setSelectedDiscovery(undefined);
    setEmail('');
    setSelectedEmails([]);
    setSelectedTools([]);
    setSelectedFeatures([]);
    setWorkspaceName(LABEL.JAWAHIIRS_WORKSPACE);
  };

  // Form input handlers with proper types
  const onSelectPurpose = (option: WorkType): void => {
    setSelectedWorkSpaceType(option);
    stepCalculation();
  };

  const onSelectManage = (option: ManageType): void => {
    setSelectedManage(option);
    stepCalculation();
  };
  const onSelectDiscovery = (option: ManageType): void => {
    setSelectedDiscovery(option);
    stepCalculation();
  };

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

  const onToggleTool = (tool: ConnectedTool): void => {
    setSelectedTools((prev) => {
      return prev.includes(tool)
        ? prev.filter((item) => item !== tool)
        : [...prev, tool];
    });
  };

  const onToggleFeature = (option: InterestedFeature): void => {
    setSelectedFeatures((prev) => {
      return prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option];
    });
  };

  const renderStep = () => {
    if (isFirstTimeLogin) {
      // First-time login flow: Purpose -> Manage -> Discovery -> Invite -> Tools -> Features -> Name
      switch (step) {
        case 1:
          return (
            <ManagePurpose
              title={LABEL.WHAT_WILL_YOU_USE_THIS_WORKSPACE_FOR}
              workspacePurposeOptions={workSpaceGlobal?.WorkType ?? []}
              onSelectPurpose={onSelectPurpose}
              selectedPurpose={selectedWorkSpaceType}
            />
          );
        case 2:
          return (
            <ManageFeatures
              title={LABEL.WHAT_WOULD_YOU_LIKE_TO_MANAGE}
              manageOptions={workSpaceGlobal?.manageType ?? []}
              selectedOption={selectedManage}
              onSelectOption={onSelectManage}
            />
          );
        case 3:
          return (
            <ManageFeatures
              title={LABEL.HOW_DID_YOU_HEAR_ABOUT_THIS}
              manageOptions={workSpaceGlobal?.discoverySource ?? []}
              selectedOption={selectedDiscovery}
              onSelectOption={onSelectDiscovery}
            />
          );
        case 4:
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
        case 5:
          return (
            <ManageTools
              connectedTools={workSpaceGlobal?.connectedTools ?? []}
              selectedTools={selectedTools}
              onToggleTool={onToggleTool}
            />
          );
        case 6:
          return (
            <SelectFeatures
              interestedFeature={workSpaceGlobal?.interestedFeature ?? []}
              selectedFeatures={selectedFeatures}
              onToggleFeature={onToggleFeature}
            />
          );
        case 7:
          return (
            <NameWorkspace
              workspaceName={workspaceName}
              setWorkspaceName={setWorkspaceName}
            />
          );
        default:
          return null;
      }
    } else {
      // Returning user flow: Purpose -> Manage -> Invite -> Tools -> Features -> Name
      switch (step) {
        case 1:
          return (
            <ManagePurpose
              title={LABEL.WHAT_WILL_YOU_USE_THIS_WORKSPACE_FOR}
              workspacePurposeOptions={workSpaceGlobal?.WorkType ?? []}
              onSelectPurpose={onSelectPurpose}
              selectedPurpose={selectedWorkSpaceType}
            />
          );
        case 2:
          return (
            <ManageFeatures
              title={LABEL.WHAT_WOULD_YOU_LIKE_TO_MANAGE}
              manageOptions={workSpaceGlobal?.manageType ?? []}
              selectedOption={selectedManage}
              onSelectOption={onSelectManage}
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
              connectedTools={workSpaceGlobal?.connectedTools ?? []}
              selectedTools={selectedTools}
              onToggleTool={onToggleTool}
            />
          );
        case 5:
          return (
            <SelectFeatures
              interestedFeature={workSpaceGlobal?.interestedFeature ?? []}
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
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenDialog}>
      <DialogContent
        blur={true}
        className="!max-w-[95vw] sm:!max-w-[55vw] h-[95vh] sm:h-[90vh] flex flex-col p-0"
      >
        {/* Fixed Header */}
        <DialogHeader className="px-6 sm:px-6 pt-2 flex items-center w-full">
          <DialogTitle className="text-xl w-full px-2 sm:px-4 flex justify-between items-center">
            {!isMobile && (
              <>
                <span className={'font-bold text-3xl'}>
                  {LABEL.TEAM_TREKKING}
                </span>
                <span className={'font-semibold text-2xl'}>
                  Welcome, Jawahiir Nabhan!
                </span>
              </>
            )}
            {isMobile && (
              <div className="w-full text-center">
                <div className="text-lg font-bold">{LABEL.TEAM_TREKKING}</div>
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
                canProceed={canProceedToNextStep()}
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
  title,
  workspacePurposeOptions,
  onSelectPurpose,
  selectedPurpose,
}) => {
  return (
    <div className="flex flex-col items-center pt-4 w-full max-w-4xl">
      <h2 className="text-2xl sm:text-4xl font-bold text-content-default text-center mb-6 sm:mb-8 px-4">
        {title}
      </h2>
      <div className="h-full w-full justify-center items-center flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-2">
        {workspacePurposeOptions?.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            onClick={() => onSelectPurpose(option)}
            className={cn(
              'w-full sm:w-auto sm:min-w-[180px] py-3 sm:py-[12px] px-4 sm:px-[20px] hover:bg-theme-main hover:text-primary-foreground h-12 text-lg sm:text-xl font-medium text-content-onboarding-secondary ',
              selectedPurpose?.name === option?.name
                ? 'bg-theme-main-dark shadow-theme-main shadow-lg border-theme-main text-primary-foreground'
                : ''
            )}
          >
            {option?.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

const ManageFeatures: React.FC<ManageFeaturesProps> = ({
  title,
  onSelectOption,
  manageOptions,
  selectedOption,
}) => {
  return (
    <div className="flex flex-col items-center pt-4 w-full max-w-4xl">
      <h2 className="text-2xl sm:text-4xl text-content-default font-bold mb-6 sm:mb-4 text-center px-4">
        {title}
      </h2>
      <div className="h-full w-full flex items-center">
        <div className="w-full flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:items-center sm:gap-2">
          {manageOptions.map((option) => (
            <Button
              key={option.id}
              onClick={() => onSelectOption(option)}
              variant="outline"
              className={cn(
                'w-full sm:w-auto h-12 text-base sm:text-lg text-content-onboarding-secondary hover:bg-theme-main-dark hover:text-white hover:shadow-lg',
                selectedOption?.name === option.name
                  ? 'bg-theme-main-dark shadow-md shadow-theme-main text-white border-none'
                  : ''
              )}
            >
              {option.name}
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
  const isValidEmail = (email: string) =>
    emailInputSchema.safeParse({ email }).success;

  const showAddPopup = useMemo(
    () => isValidEmail(email) && !selectedEmails.includes(email),
    [email, selectedEmails]
  );

  const onAddEmail = () => {
    const event = {
      key: 'Enter',
      preventDefault: () => {},
    } as React.KeyboardEvent<HTMLInputElement>;

    onKeyDown(event);
  };

  return (
    <div className="items-center flex flex-col w-full max-w-2xl">
      <h2 className="text-2xl sm:text-4xl font-bold text-content-default mb-8 sm:mb-12 text-center px-4">
        {LABEL.INVITE_PEOPLE_TO_YOUR_WORKSPACE}
      </h2>

      <div className="min-h-12 rounded-lg gradient-border mb-8 w-full max-w-md mx-4 sm:mx-0 relative">
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
              autoComplete="off"
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

        {showAddPopup && (
          <div
            className="absolute top-full left-0 mt-2 w-full h-12 text-content-tertiary border rounded-md shadow z-10 flex items-center justify-between px-4 text-base sm:text-lg cursor-pointer hover:bg-gray-100"
            onClick={onAddEmail}
          >
            + {LABEL.ADD} {email}
          </div>
        )}
      </div>
    </div>
  );
};

const ManageTools: React.FC<ManageToolsProps> = ({
  connectedTools,
  selectedTools,
  onToggleTool,
}) => {
  return (
    <div className="items-center flex flex-col w-full max-w-5xl">
      <h2 className="text-2xl sm:text-4xl font-bold text-content-default mb-8 sm:mb-12 text-center px-4">
        {LABEL.WHICH_TOOLS_WOULD_YOU_LIKE_TO_INTEGRATE}
      </h2>
      <div className="h-full w-full flex items-center">
        <div className="w-full  justify-center items-center flex flex-col sm:flex-row sm:flex-wrap gap-3">
          {connectedTools.map((tool) => {
            const isSelected = selectedTools.includes(tool);
            return (
              <Button
                key={tool.id}
                variant="outline"
                onClick={() => onToggleTool(tool)}
                className={cn(
                  'w-full sm:w-auto h-12 rounded-xl text-content-onboarding-secondary text-sm sm:text-base font-medium hover:shadow-lg transition-all duration-200',
                  isSelected && ' border-theme-main shadow-theme-main shadow-sm'
                )}
              >
                <span className="flex-1 text-center">{tool.name}</span>
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
  interestedFeature,
  selectedFeatures,
  onToggleFeature,
}) => {
  return (
    <div className="items-center flex flex-col w-full max-w-5xl">
      <h2 className="text-2xl sm:text-4xl font-bold text-content-default mb-8 sm:mb-12 text-center px-4">
        {LABEL.WHICH_FEATURES_ARE_YOU_INTERESTED_IN}
      </h2>
      <div className="flex h-full w-full items-center">
        <div className="w-full  justify-center items-center flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-2">
          {interestedFeature.map((option) => {
            const isSelected = selectedFeatures.includes(option);
            return (
              <Button
                key={option.id}
                variant="outline"
                onClick={() => onToggleFeature(option)}
                className={cn(
                  'w-full sm:w-auto h-12 rounded-xl text-content-onboarding-secondary text-sm sm:text-base font-medium',
                  isSelected &&
                    'border-[1px] border-theme-main shadow-theme-main shadow-sm'
                )}
              >
                <span className="flex-1 text-left">{option.name}</span>
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
        {LABEL.DONT_WORRY_YOU_WILL_HAVE_ACCESS}
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
          className="!h-[62px] !w-[350px] !text-xl sm:!text-xl text-center mx-4"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />
        <span className="text-xs sm:text-sm text-content-tertiary mt-2 text-center">
          {LABEL.TRY_THE_NAME_OF_YOUR_ORGANIZATION}
        </span>
      </div>
    </div>
  );
};

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
  const progress = ((step - 1) / totalSteps) * 100;
  return (
    <div className="w-full mt-6 sm:mt-8 mb-4">
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-600"
          style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
        />
      </div>
    </div>
  );
};

interface FooterPropsExtended extends FooterProps {
  canProceed: boolean;
}

const Footer: React.FC<FooterPropsExtended> = ({
  step,
  prevStep,
  nextStep,
  totalSteps,
  onSubmit,
  canProceed,
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
        <span className="hidden sm:inline">{LABEL.BACK}</span>
        <span className="sm:hidden">{LABEL.BACK}</span>
      </Button>
    )}
    {step < totalSteps ? (
      <Button
        onClick={nextStep}
        disabled={!canProceed}
        className={cn(
          'ml-auto w-24 sm:!w-[113px] !h-12 sm:!h-[58px] text-base sm:text-xl flex items-center rounded-lg',
          canProceed
            ? 'bg-theme-main-dark hover:bg-theme-main-dark/90'
            : 'bg-gray-300 cursor-not-allowed hover:bg-gray-300'
        )}
      >
        <span className="hidden sm:inline">{LABEL.NEXT}</span>
        <span className="sm:hidden">{LABEL.NEXT}</span>
        <Icon
          name={'dropdownarrow'}
          className={'-rotate-90 size-3 sm:size-4'}
        />
      </Button>
    ) : (
      <Button
        onClick={onSubmit}
        type="button"
        disabled={!canProceed}
        className={cn(
          'ml-auto w-24 sm:!w-[113px] !h-12 sm:!h-[58px] text-base sm:text-xl flex items-center rounded-lg',
          canProceed
            ? 'bg-theme-main-dark hover:bg-theme-main-dark/90'
            : 'bg-gray-300 cursor-not-allowed hover:bg-gray-300'
        )}
      >
        {LABEL.FINISH}
      </Button>
    )}
  </div>
);
