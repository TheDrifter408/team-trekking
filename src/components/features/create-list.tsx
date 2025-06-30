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
import { Switch } from '@/components/shadcn-ui/switch';
import { LABEL } from '@/lib/constants';
import { useForm, Controller } from 'react-hook-form';
import { createListSchema } from '@/lib/validation/validationSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment } from 'react';
import { Folder } from '@/types/props/Layout';
import { Space } from '@/types/props/Common';

type FormValues = z.infer<typeof createListSchema>;

interface BaseProps {
  createListOpen: boolean;
  setCreateListOpen: (open: boolean) => void;
}

interface CreateListInFolder extends BaseProps {
  folder: Folder;
  space?: undefined;
}

interface CreateListInSpace extends BaseProps {
  space: Space;
  folder?: undefined;
}

type CreateListProps = CreateListInFolder | CreateListInSpace;

export const CreateList = ({
  createListOpen,
  setCreateListOpen,
  folder,
  space,
}: CreateListProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(createListSchema),
    defaultValues: {
      name: '',
      isPrivateMode: false,
    },
    mode: 'onChange',
  });

  const name = watch('name');

  const onSubmit = (data: FormValues) => {
    // TODO:
    // 1. integrate the create List API when it is avaible
    if (space) {
      return {
        parentId: space.id,
        ...data,
      };
    } else if (folder) {
      return {
        parentId: folder.id,
        ...data,
      };
    }
  };

  return (
    <Fragment>
      <Dialog
        open={createListOpen}
        onOpenChange={(open) => {
          if (!open) {
            reset();
          }
          setCreateListOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-md p-0 bg-muted gap-0">
          <DialogHeader className="p-4 bg-white">
            <DialogTitle>Create List</DialogTitle>
            <DialogDescription>
              All Lists are located within a Space. List Can house any type of
              Task.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-1 bg-white m-0"
          >
            <div className="space-y-4 p-4">
              <div className="relative">
                <Label
                  htmlFor="name"
                  className="text-muted-foreground text-right mb-1"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="e.g. Project, List of Names, Campaign"
                  autoFocus
                  className="pr-10"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
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
            </div>
            <DialogFooter className="border border-x-0 border-b-0 border-t-1 space-x-2 p-4 bg-muted">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateListOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={!isValid || !name.trim()}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
