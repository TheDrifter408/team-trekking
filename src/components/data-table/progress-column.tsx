import { Task } from '@/types/props/Common.ts';

interface Props {
  task: Task;
}

export const ProgressColumn = ({ task }: Props) => {
  let progress = 0;
  if (task.progress) progress = task.progress;
  return (
    <div className="flex items-center gap-2">
      <div className="w-[105px] h-[10px] border-[1px] border-content-progress rounded-full relative overflow-hidden">
        <div
          className="h-full bg-content-progress transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs font-medium text-content-progress text-right">
        {progress}%
      </span>
    </div>
  );
};
