import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Dispatch, KeyboardEvent, SetStateAction, useState } from 'react';
import { addTaskSchema } from '../schema/addTaskSchema';
import { faker } from '@faker-js/faker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Assignee, PriorityType } from '@/mock';
import { LABEL } from '@/lib/constants/strings';

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
  setAddingTask: Dispatch<SetStateAction<boolean>>;
};

export const AddTaskForm = ({ onSubmit, setAddingTask }: AddTaskFormProps) => {
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

  return (
    <Form {...form}>
      <form
        onKeyDown={handleKeyDown}
        className={'space-y-2 bg-white p-2 rounded-xl'}
      >
        <div className="flex justify-end items-center mb-2 px-1">
          <span className="text-xs text-muted-foreground p-2 rounded bg-orange-300">
            ⏎ Enter to add
          </span>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Task Name" {...field} />
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
                  <Button variant="outline">
                    <CalendarIcon />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, 'dd/MM/yy')} -{' '}
                          {format(date.to, 'dd/MM/yy')}
                        </>
                      ) : (
                        format(date.from, 'dd/MM/yy')
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
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
              <FormLabel>Assignees</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    {field.value?.length && field.value.length > 0
                      ? `${field.value.length} assignee${field.value.length > 1 ? 's' : ''}`
                      : LABEL.NO_ASSIGNEES_SELECTED}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search Assignees..." />
                    <CommandList>
                      <CommandEmpty>No Results Found.</CommandEmpty>
                      {assignees.map((assignee) => {
                        const selected = field.value?.some(
                          (a) => a.id === assignee.id
                        );
                        return (
                          <CommandItem
                            key={assignee.id}
                            onSelect={() => {
                              if (selected) {
                                field.onChange(
                                  field.value?.filter(
                                    (a) => a.id !== assignee.id
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
              <div className="flex flex-wrap gap-1 mt-2">
                {field.value?.map((assignee) => {
                  const name = assignees.find(
                    (a) => a.id === assignee.id
                  )?.name;
                  return (
                    <Badge key={assignee.id} variant="secondary">
                      {name}
                    </Badge>
                  );
                })}
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue="">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
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
