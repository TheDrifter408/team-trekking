import type { Meta, StoryObj } from '@storybook/react';
import { TimeEstimateDropdown } from '@/components/common/estimate-time-dropdown';
import { Button } from '@/components/shadcn-ui/button';
import humanizeDuration from 'humanize-duration';
import { Icon } from '@/assets/icon-path';
const meta: Meta<typeof TimeEstimateDropdown> = {
    title: 'Components/TimeEstimateDropdown',
    component: TimeEstimateDropdown,
    tags: ['autodocs'],
    subcomponents: { Button, Icon },
};

export default meta;
type Story = StoryObj<typeof TimeEstimateDropdown>;

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

// Mocked Task object
const mockTask = {
    estimatedTime: (2 * 60 + 45) * 60 * 1000, // 2h 45m in ms
};


export const Default: Story = {
    render: () => {
        const formattedTime = formatter(Number(mockTask.estimatedTime));
        return (
            <TimeEstimateDropdown time={formattedTime}>
                <Button className="w-full h-full text-start justify-start text-content-default font-normal text-base"
                    variant="ghost"
                >
                    <Icon name="timeestimation" className="text-content-tertiary size-5" />
                    {formattedTime}
                </Button>
            </TimeEstimateDropdown>
        )
    }
};

