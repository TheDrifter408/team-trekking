import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/shadcn-ui/dialog.tsx';
import { Checkbox } from '@/components/shadcn-ui/checkbox';
import { Input } from '@/components/shadcn-ui/input.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { Icon } from '@/assets/icon-path.tsx';
import { LABEL } from '@/lib/constants';

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}
export const DeleteWorkspaceDialog = ({ isOpen, onOpenChange }: Props) => {
  const workspaceName = "Jawahiir Nabhan's Workspace";
  const [name, setName] = useState('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const canDeleteWorkspace = workspaceName === name;
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        hideCloseButton
        className={
          'min-h-screen !max-w-full justify-center items-center rounded-none bg-gray-50  !min-w-screen'
        }
      >
        <div className="flex flex-col items-center justify-center px-[192px]">
          <Icon name={'deletebg'} />
          <span className={'text-3xl text-theme-main pt-4'}>
            {LABEL.DELETE}:
          </span>
          <span className="text-content-tertiary text-3xl">
            {workspaceName}
          </span>
          <p className="text-content-default text-base font-bold pt-3">
            {LABEL.WARNING}:
          </p>
          <p className="text-content-default text-base mt-6">
            {LABEL.DELETING_THIS_WORKSPACE_WILL_DELETE_ALL_FILES}
          </p>
          <Input
            className="h-[54px] mt-3 placeholder:text-xl !text-xl text-center placeholder:text-center"
            placeholder={'Type Workspace name to delete'}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className="flex w-full mt-[30px] justify-center gap-x-3">
            <Button
              className={
                'px w-[150px] h-[64px] border-[2px] border-theme-main-light'
              }
              variant={'outline'}
              onClick={onOpenChange}
            >
              <span className="text-lg text-theme-main">{LABEL.CANCEL}</span>
            </Button>
            <Button
              disabled={!canDeleteWorkspace}
              className={'w-[150px] h-[64px] bg-theme-main'}
              onClick={onOpenChange}
            >
              <span className="text-lg">{LABEL.DELETE}</span>
            </Button>
          </div>
          <div className="mt-4 flex gap-x-2 items-stretch">
            <div className="w-[20px] flex items-center justify-center p-2">
              <Checkbox
                className={'border border-muted-foreground'}
                checked={isChecked}
                onCheckedChange={() => setIsChecked(!isChecked)}
              />
            </div>
            <div className="flex items-center w-full">
              <span className="text-base text-content-tertiary">
                {LABEL.ALSO_PERMANENTLY_DELETE_ALL_THIRD_PARTY_DATA}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
