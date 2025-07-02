import { Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createListSchema } from '@/lib/validation/validationSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateListMutation } from '@/service/rtkQueries/listQuery';
import { Folder, Space } from '@/types/request-response/workspace/ApiResponse';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import { Label } from '@/components/shadcn-ui/label';
import { Input } from '@/components/shadcn-ui/input';
import { Switch } from '@/components/shadcn-ui/switch';
import { Button } from '@/components/shadcn-ui/button';
import { toast } from 'sonner';
import { LABEL } from '@/lib/constants';

interface BaseProps {
  createListOpen: boolean;
  setCreateListOpen: (open: boolean) => void;
  onCreatedList: () => void;
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

type FormValues = z.infer<typeof createListSchema>;

export const CreateList = ({
  createListOpen,
  setCreateListOpen,
  onCreatedList,
  folder,
  space,
}: CreateListProps) => {
  const [createList] = useCreateListMutation();
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
      iconUrl: 'https://example.com/icon.png',
      avatarKey: 'avatar123',
      color: '#FF5733',
      priorityId: 1,
      folderId: 0,
      spaceId: 0,
      visibility: 'public',
      isInheritStatus: true,
      taskType: 1,
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
    },
    mode: 'onChange',
  });

  const name = watch('name');

  const onSubmit = async (data: FormValues) => {
    const listFormValues = folder
      ? { ...data, folderId: folder.id }
      : space
        ? { ...data, spaceId: space.id }
        : (() => {
            throw new Error('Either folder or space must be defined');
          })();
    try {
      await createList(listFormValues).unwrap();
      onCreatedList();
      toast.success(`Successfully created ${listFormValues.name}`);
      setCreateListOpen(false);
    } catch (error: unknown) {
      toast.error(`Could not create List, ${error.message}`);
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
                  htmlFor="visibilty"
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
                    name="visibility"
                    render={({ field }) => (
                      <Switch
                        checked={field.value === 'private'}
                        onCheckedChange={(checked) => {
                          field.onChange(checked ? 'private' : 'public');
                        }}
                        className={
                          field.value === 'private' ? '!bg-theme-main' : ''
                        }
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
