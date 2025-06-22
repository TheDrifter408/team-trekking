import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PriorityButton, PriorityPopover } from '@/components/common/priority-popover';
import { Button } from '@/components/shadcn-ui/button';
import { LABEL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Icon } from '@/assets/icon-path';
import { TaskPriority } from '@/types/props/Common';
import '@/index.css';
const meta: Meta<typeof PriorityPopover> = {
    title: 'Components/PriorityPopover',
    component: PriorityPopover,
    tags: ['autodocs'],
    subcomponents: { PriorityButton }
};

export default meta;
type Story = StoryObj<typeof PriorityPopover>;

export const Default: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        const [priority, setPriority] = useState<TaskPriority>(LABEL.CLEAR);
        return (
            <div className="p-10">
                <PriorityPopover isOpen={isOpen} setIsOpen={setIsOpen}>
                    <Button
                        variant="ghost"
                        size="auto"
                        className={cn('text-content-tertiary hover:text-content-tertiary')}
                    >
                        <Icon name='priority02' />{' '}
                        <span className={'text-content-default font-normal'}>
                            {priority ?? ''}
                        </span>
                    </Button>
                </PriorityPopover>
            </div>
        );
    },
};
