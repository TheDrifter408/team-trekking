import { Task } from '@/types/props/Common';
import { SingleDatePicker } from '@/components/common/single-date-picker.tsx';

export const DateColumn = ({
  task,
  dateType,
  onDateChange,
}: {
  task: Task;
  dateType: 'start' | 'end';
  onDateChange?: (date: Date | undefined) => void;
}) => {
  const dateValue = dateType === 'start' ? task.startDate : task.dueDate;
  const date = dateValue ? new Date(dateValue) : undefined;

  const handleDateChange = (newDate: Date | undefined) => {
    if (onDateChange) {
      onDateChange(newDate);
    }
    // You might also want to update the task directly here
    // depending on your state management approach
  };

  return (
    <div className="w-full">
      <SingleDatePicker
        date={date}
        onDateChange={handleDateChange}
        className="w-full"
      />
    </div>
  );
};
