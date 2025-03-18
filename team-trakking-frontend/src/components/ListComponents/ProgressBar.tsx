import { FC } from 'react';

export const ProgressBar: FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="h-2 w-full rounded-md bg-gray-200">
        <div
          className="h-full rounded-md bg-green-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="ml-2 mt-2">{progress}%</p>
    </div>
  );
};
