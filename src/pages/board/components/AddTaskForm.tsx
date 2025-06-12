import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/shadcn-ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/shadcn-ui/input';
import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import { addTaskSchema } from '@/lib/validation/validationSchema';
import { faker } from '@faker-js/faker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn-ui/popover';
import { Button } from '@/components/shadcn-ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn-ui/command';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { CalendarIcon, CircleUser } from 'lucide-react';
import { Calendar } from '@/components/shadcn-ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { Assignee, PriorityType } from '@/mock';
import { LABEL } from '@/lib/constants/appStrings.ts';
import { useClickOutside } from '@/lib/hooks/use-click-outside';

const assignees: Assignee[] = [];
const priorities: PriorityType[] = ['HIGH', 'LOW', 'MIDDLE', 'NONE'];
for (let i = 0; i < 5; i++) {
  const assignee: Assignee = {
    id: faker.number.int(),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
  };
  assignees.push(assignee);
}

type AddTaskFormProps = {
  onSubmit: SubmitHandler<z.infer<typeof addTaskSchema>>;
  addingTask: boolean;
  setAddingTask: Dispatch<SetStateAction<boolean>>;
};

export const AddTaskForm = ({
  onSubmit,
  addingTask,
  setAddingTask,
}: AddTaskFormProps) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  const form = useForm<z.infer<typeof addTaskSchema>>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      name: '',
      date: {
        from: new Date(),
        to: new Date(),
      },
      assignees: [],
      priority: '',
    },
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
      setAddingTask(false);
    }
  };

  const formRef = useRef<HTMLFormElement>(null);
  const datePopoverRef = useRef<HTMLDivElement>(null);
  const assigneePopoverRef = useRef<HTMLDivElement>(null);
  const priorityRef = useRef<HTMLDivElement>(null);

  const refs = [formRef, datePopoverRef, assigneePopoverRef, priorityRef];
  const handleClickOutside = useCallback(() => {
    if (addingTask) {
      setAddingTask(false);
    }
  }, [addingTask, setAddingTask]);

  useClickOutside(refs, handleClickOutside);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onKeyDown={handleKeyDown}
        className={'bg-white p-2 rounded-xl'}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="my-0">
              <FormControl>
                <div className="flex gap-2 items-center justify-between">
                  <Input
                    placeholder="Task Name"
                    {...field}
                    className="border-none"
                  />
                  <div className="flex justify-end items-center mb-2 px-1">
                    <span className="text-xs text-nowrap font-semibold text-muted-foreground p-1 rounded bg-slate-100">
                      Save ⏎
                    </span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start border-none"
                  >
                    <CalendarIcon />
                    {field.value.from && field.value.to ? (
                      <>
                        {field.value.from
                          ? format(field.value.from, 'dd/MM/yy')
                          : '-'}
                        -{' '}
                        {field.value.to
                          ? format(field.value.to, 'dd/MM/yy')
                          : '-'}
                      </>
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  ref={datePopoverRef}
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={(range) => {
                      setDate(range);
                      field.onChange(range);
                    }}
                    numberOfMonths={1}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assignees"
          render={({ field }) => (
            <FormItem>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-1 border-none"
                  >
                    {field.value?.length && field.value.length > 0 ? (
                      field.value.map((assignee: Assignee) => (
                        <span className="rounded-full text-sm py-1 px-2 bg-slate-300">
                          {assignee.name.charAt(0).toUpperCase()}
                        </span>
                      ))
                    ) : (
                      <>
                        <CircleUser />
                        <span>{LABEL.NO_ASSIGNEES_SELECTED}</span>
                      </>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent ref={assigneePopoverRef} className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search Assignees..." />
                    <CommandList>
                      <CommandEmpty>No Results Found.</CommandEmpty>
                      {assignees.map((assignee) => {
                        const selected = field.value?.some(
                          (a: Assignee) => a.id === assignee.id
                        );
                        return (
                          <CommandItem
                            key={assignee.id}
                            onSelect={() => {
                              if (selected) {
                                field.onChange(
                                  field.value?.filter(
                                    (a: Assignee) => a.id !== assignee.id
                                  )
                                );
                              } else {
                                field.onChange([
                                  ...(field.value || []),
                                  assignee,
                                ]);
                              }
                            }}
                          >
                            <div className="flex items-center">
                              <span className="mr-2">
                                {selected ? '✓' : ''}
                              </span>
                              {assignee.name}
                            </div>
                          </CommandItem>
                        );
                      })}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue="">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent ref={priorityRef}>
                  {priorities.map((priority, id) => (
                    <SelectItem key={id} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
