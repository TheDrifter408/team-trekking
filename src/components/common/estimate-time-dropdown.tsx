import React, { ReactNode, useState } from 'react';
import { X, HelpCircle } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import { Input } from '@/components/shadcn-ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { LABEL } from '@/lib/constants';

interface TimeEstimateComponentProps {
  children: ReactNode;
}

const TimeEstimateDropdown: React.FC<TimeEstimateComponentProps> = ({
  children,
}) => {
  const [timeEstimate, setTimeEstimate] = useState<string>('2h');
  const [totalTime] = useState<string>('4h 20m');

  const onHandleTimeEstimateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTimeEstimate(event.target.value);
  };

  const onHandleClearTimeEstimate = (): void => {
    setTimeEstimate('');
  };

  return (
    <div className="w-full max-w-md mx-auto py-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

        <DropdownMenuContent className="w-80 p-0" align="start">
          <Card className="bg-white shadow-none border-0 rounded-2xl">
            <CardContent className="px-3 py-2">
              {/* Time Estimate Section */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-medium text-[14px] leading-none">
                    {LABEL.TIME_ESTIMATE}
                  </span>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    value={timeEstimate}
                    onChange={onHandleTimeEstimateChange}
                    placeholder="e.g., 2h, 30m, 1h 30m"
                    className="w-28 h-8 text-sm border-gray-200 rounded-sm"
                  />

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-6 h-6 p-0 text-gray-400 hover:text-gray-600"
                    onClick={onHandleClearTimeEstimate}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 mb-4" />

              {/* Total with Subtasks Section */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-[8px] font-medium uppercase tracking-wide mb-0.5">
                    {LABEL.TOTAL_WITH_SUBTASKS}
                  </p>
                  <p className="text-gray-900 text-base font-semibold leading-none">
                    {totalTime}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs leading-tight">
                    {LABEL.CHANGES_ARE_AUTOMATICALLY_SAVED}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TimeEstimateDropdown;
