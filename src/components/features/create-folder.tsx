import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog.tsx';
import { Label } from '@/components/shadcn-ui/label.tsx';
import { Input } from '@/components/shadcn-ui/input.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu.tsx';
import { Droplet, Ban, Circle } from 'lucide-react';
import { Separator } from '@/components/shadcn-ui/separator.tsx';
import { StatusView } from '@/components/features/status-view.tsx';
import { taskNotificationUsers, taskStatuses } from '@/mock';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { createFolderSchema } from '@/lib/validation/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectUsers } from '../common/select-users';
import { LABEL } from '@/lib/constants';
import { Switch } from '../shadcn-ui/switch';

type FormValues = z.infer<typeof createFolderSchema>;

interface Props {
  createFolderOpen?: boolean;
  setCreateFolderOpen: (open: boolean) => void;
}

export const CreateFolder = ({
  createFolderOpen,
  setCreateFolderOpen,
}: Props) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      name: '',
      color: '',
      isPrivateMode: false,
      invitees: [],
    },
  });

  const selectedColor = watch('color');
  const isPrivateMode = watch('isPrivateMode');

  const onSubmit = (data: z.infer<typeof createFolderSchema>) => {
    reset();
    setCreateFolderOpen(false);
    return data;
  };

  return (
    <Dialog open={createFolderOpen} onOpenChange={setCreateFolderOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            Enter a name for your new folder.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className=" items-center gap-4 space-y-4">
            <div className="">
              <Label htmlFor="name" className="text-right mb-2">
                Name
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="My New Folder"
                  autoFocus
                  className="pr-10"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                    >
                      {selectedColor && selectedColor.length > 0 ? (
                        <Circle
                          className={`h-4 w-4 text-${selectedColor}-500`}
                        />
                      ) : (
                        <Droplet className={`h-4 w-4 `} />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Color Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {['blue', 'green', 'red', 'purple'].map((value) => (
                      <DropdownMenuItem
                        key={value}
                        onClick={() => setValue('color', value)}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full border-2 border-${value}-500 mr-2`}
                          ></div>
                          {value.charAt(0).toUpperCase() + value.slice(1)}
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <Separator />
                    <DropdownMenuItem onClick={() => setValue('color', '')}>
                      <div className="flex items-center">
                        <Ban className={'h-4 w-4 mr-2'} />
                        Clear
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="">
              <StatusView
                open={open}
                setOpen={setOpen}
                statuses={taskStatuses}
              />
            </div>
            <Separator />
            <div className="relative">
              <Label
                htmlFor="isPrivateMode"
                className="text-muted-foreground text-right mb-1"
              >
                Make Private
              </Label>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-base font-normal">
                  {LABEL.ONLY_YOU_AND_INVITED_HAVE_ACCESS}
                </span>
                <Controller
                  control={control}
                  name="isPrivateMode"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className={field.value ? '!bg-theme-main' : ''}
                      id=""
                    />
                  )}
                />
              </div>
            </div>
            {isPrivateMode && (
              <Controller
                control={control}
                name="invitees"
                render={({ field }) => (
                  <SelectUsers
                    multipleSelect={true}
                    displayName={false}
                    onRemove={() => {}}
                    displayOnly={true}
                    isSelected={true}
                    value={field.value ?? []}
                    users={taskNotificationUsers}
                    onChange={field.onChange}
                    placeholder={LABEL.NO_INVITED_USERS}
                    userListTitle={LABEL.SELECT_USERS}
                  />
                )}
              />
            )}
          </div>
          <DialogFooter className="space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCreateFolderOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={!isValid}
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
