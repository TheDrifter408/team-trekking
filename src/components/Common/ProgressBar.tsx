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
      <div className="flex items-center w-full">
        <div className="w-[150px] h-5 bg-gray-200 rounded-full relative overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full transition-all duration-300 ease-in-out rounded-full ${getProgressColor(progress)}`}
            style={{ width: `${progress}%` }}
          ></div>
          <div
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-semibold ${getTextColor(progress)}`}
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};
