import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { cn } from '@/lib/utils/utils';
import { Priority } from '@/types/request-response/workspace/ApiResponse';
import { IconFlagFilled } from '@tabler/icons-react';
import { FC } from 'react';

interface PrioritySelectProps {
  onSelectChange: (id: string) => void;
  selectedValue: Priority | null;
  priorities?: Priority[];
}

export const TaskPrioritySelect: FC<PrioritySelectProps> = ({
  onSelectChange,
  selectedValue,
  priorities,
}) => {
  return (
    <Select value={selectedValue?.id.toString()} onValueChange={onSelectChange}>
      <SelectTrigger
        className={cn(
          'w-full border-0 ring-0 p-0 focus:outline-none focus:ring-0 focus-within:ring-0 focus-within:outline-none',
          '[&>svg]:hidden'
        )}
      >
        <SelectValue
          className="focus:ring-0 focus-within:ring-0 focus-within:outline-none"
          placeholder={
            <div>
              <IconFlagFilled size={19} />
              <span className="text-base font-medium antialiased">
                Priority
              </span>
            </div>
          }
        >
          <div className="flex items-center gap-2">
            <IconFlagFilled size={19} color={selectedValue?.color} />
            {selectedValue ? (
              <span>{selectedValue.title.toUpperCase()}</span>
            ) : (
              <span className="text-gray-500 text-base">Priority</span>
            )}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="focus:outline-none focus:ring-0 focus-within:ring-0 focus-within:outline-none">
        <SelectGroup>
          {priorities?.map((p: Priority) => (
            <SelectItem
              value={p.id.toString()}
              className="focus:ring-0 focus-within:ring-0 focus-within:outline-none"
            >
              <div className="flex items-center gap-2">
                <IconFlagFilled size={19} color={p.color} />
                <span>{p.title.toUpperCase()}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
