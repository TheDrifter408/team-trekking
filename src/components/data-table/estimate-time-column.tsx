import { Button } from '@/components/shadcn-ui/button.tsx';
import { Icon } from '@/assets/icon-path';
import { Task } from '@/types/props/Common.ts';
import { TimeEstimateDropdown } from '@/components/common/estimate-time-dropdown';
import humanizeDuration from 'humanize-duration';

interface Props {
  task: Task;
}

const formatter = humanizeDuration.humanizer({
  language: 'shortEn',
  units: ['h', 'm'],
  round: true,
  spacer: '',
  delimiter: ' ',
  languages: {
    shortEn: {
      h: () => 'h',
      m: () => 'm',
    },
  },
});

export const EstimateTimeColumn = ({ task }: Props) => {
  const ms = Number(task.estimatedTime);
  const formattedTime = formatter(ms);

  return (
    <TimeEstimateDropdown time={formattedTime}>
      <Button
        className={
          'w-full h-full text-start justify-start text-content-default font-normal text-base'
        }
        variant={'ghost'}
      >
        <Icon
          name={'timeestimation'}
          className={'text-content-tertiary size-5'}
        />
        {formattedTime}
      </Button>
    </TimeEstimateDropdown>
  );
};
