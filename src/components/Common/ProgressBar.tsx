import React from 'react';

type ProgressBarProps = {
  progress: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  // Determine color based on progress value
  const getProgressColor = (value: number) => {
    if (value >= 80) return 'bg-green-500'; // #52c41a equivalent
    if (value >= 40) return 'bg-indigo-500'; // #7b68ee equivalent
    return 'bg-yellow-500'; // #faad14 equivalent
  };

  // Determine text color based on progress value
  const getTextColor = (value: number) => {
    return value > 40 ? 'text-white' : 'text-gray-700'; // #5e6577 equivalent
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center">
        <div className="relative h-5 w-[150px] overflow-hidden rounded-full bg-gray-200">
          <div
            className={`absolute left-0 top-0 h-full rounded-full transition-all duration-300 ease-in-out ${getProgressColor(progress)}`}
            style={{ width: `${progress}%` }}
          ></div>
          <div
            className={`absolute left-0 top-0 flex h-full w-full items-center justify-center text-xs font-semibold ${getTextColor(progress)}`}
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};
