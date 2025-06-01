import { LABEL } from '@/lib/constants';

export const Fallback = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Main loading container */}
      <div className="relative flex flex-col items-center space-y-8">
        {/* Spinning rings loader */}
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200 border-opacity-20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-purple-400 rounded-full animate-spin"></div>
          <div
            className="absolute top-2 left-2 w-16 h-16 border-4 border-transparent border-t-pink-400 rounded-full animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
          ></div>
          <div
            className="absolute top-4 left-4 w-12 h-12 border-4 border-transparent border-t-blue-400 rounded-full animate-spin"
            style={{ animationDuration: '0.6s' }}
          ></div>
        </div>

        {/* Animated dots */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>

        {/* Loading text with typewriter effect */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">
            {LABEL.LOADING}
          </h2>
          <p className="text-purple-200 text-sm font-medium tracking-wider">
            {LABEL.PREARING_TEAM_TREKKING_FOR_YOU}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75"></div>
        <div
          className="absolute top-3/4 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-75"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>
    </div>
  );
};
