import { Task } from '@/types/props/Common.ts';

interface Props {
  task: Task;
}

export const ProgressColumn = ({ task }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-[100px] h-[10px] border-[1px] border-content-success rounded-full relative overflow-hidden">
        <div
          className="h-full bg-content-success  rounded-full transition-all"
          style={{ width: `${task.progress}%` }}
        />
      </div>
      <span className="text-sm text-content-success text-right">
        {task.progress}%
      </span>
    </div>
  );
};
