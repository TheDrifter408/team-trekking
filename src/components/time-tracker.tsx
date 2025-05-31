'use client';

import type React from 'react';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Square } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TimeTrackerProps {
  initialTime: string;
  onTimeUpdate?: (newTime: string) => void;
  taskId?: string;
}

export function TimeTracker({
  initialTime,
  onTimeUpdate,
  taskId,
}: TimeTrackerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [displayTime, setDisplayTime] = useState('0s');

  // Use refs to store values that shouldn't trigger re-renders
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const initialTimeRef = useRef(initialTime);
  const lastUpdateTimeRef = useRef<string | null>(null);

  // Format seconds to "Xh Ym Zs" format
  const formatTime = useCallback((totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let result = '';
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0) result += `${minutes}m `;
    result += `${seconds}s`;

    return result.trim();
  }, []);

  // Update display time when elapsed time changes
  useEffect(() => {
    if (isRunning || elapsedTime > 0) {
      const formattedTime = formatTime(elapsedTime);

      // Only update if the formatted time has changed
      if (formattedTime !== displayTime) {
        setDisplayTime(formattedTime);
      }

      // Only call onTimeUpdate when timer is stopped and time has changed
      if (
        !isRunning &&
        onTimeUpdate &&
        elapsedTime > 0 &&
        formattedTime !== lastUpdateTimeRef.current
      ) {
        lastUpdateTimeRef.current = formattedTime;
        onTimeUpdate(formattedTime);
      }
    }
  }, [elapsedTime, formatTime, isRunning, onTimeUpdate, displayTime]);

  // Timer logic - count up from 0
  useEffect(() => {
    // Clear any existing timer first
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (isRunning) {
      // Set start time reference if it's not set
      if (startTimeRef.current === 0) {
        startTimeRef.current = Date.now() - elapsedTime * 1000;
      }

      // Start a new timer
      timerRef.current = setInterval(() => {
        const newElapsedSeconds = Math.floor(
          (Date.now() - startTimeRef.current) / 1000
        );
        setElapsedTime(newElapsedSeconds);
      }, 1000);
    } else {
      // When stopping, update the time one last time
      if (elapsedTime > 0 && onTimeUpdate) {
        const formattedTime = formatTime(elapsedTime);
        if (formattedTime !== lastUpdateTimeRef.current) {
          lastUpdateTimeRef.current = formattedTime;
          onTimeUpdate(formattedTime);
        }
      }

      // Reset start time reference when stopped
      startTimeRef.current = 0;
    }

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, formatTime, onTimeUpdate, elapsedTime]);

  // Handle play/stop button click
  const handleTimerToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isRunning) {
      // Reset elapsed time to 0 when starting
      setElapsedTime(0);
      startTimeRef.current = 0;
      lastUpdateTimeRef.current = null;
    }

    setIsRunning(!isRunning);
  };

  // Reset function
  const handleReset = () => {
    setElapsedTime(0);
    setDisplayTime('0s');
    lastUpdateTimeRef.current = null;
    if (onTimeUpdate) {
      onTimeUpdate('0s');
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-start items-center gap-2 cursor-pointer">
          {/* Play/Stop button - prevent dropdown from opening */}
          <button
            onClick={handleTimerToggle}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            className="text-primary hover:text-primary/80 transition-colors"
            type="button"
          >
            {isRunning ? (
              <Square size={16} className="text-red-500" />
            ) : (
              <Play size={16} />
            )}
          </button>

          {/* Time display - clicking this will open the dropdown */}
          <span
            className={` text-primary text-base ${isRunning || elapsedTime > 0 ? 'font-mono ' : ''}`}
          >
            {isRunning || elapsedTime > 0 ? displayTime : initialTime}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="p-3 min-w-[200px] ">
        <div className="space-y-3">
          <h3 className="font-medium">Time Tracking</h3>

          <div className="text-center  text-primary text-2xl font-mono">
            {isRunning || elapsedTime > 0 ? displayTime : '0s'}
          </div>

          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                if (!isRunning) {
                  setElapsedTime(0);
                  startTimeRef.current = 0;
                  lastUpdateTimeRef.current = null;
                }
                setIsRunning(!isRunning);
              }}
              className={`px-3 py-1 rounded-md ${
                isRunning
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              } 
                transition-colors`}
              type="button"
            >
              {isRunning ? 'Stop' : 'Start'}
            </button>

            {!isRunning && elapsedTime > 0 && (
              <button
                onClick={handleReset}
                className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                type="button"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
