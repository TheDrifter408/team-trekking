import type { Meta, StoryObj } from '@storybook/react';
import TagDropdownWithSelection from '@/components/common/tag-dropdown';
import { TagOption } from '@/types/interfaces/TagDropDown';

import '@/index.css';

const mockTags: TagOption[] = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'docs', label: 'Docs' },
  { id: 'complex', label: 'Complex' },
  { id: 'fail', label: 'Failing' },
  { id: 'infra', label: 'Infrastructure' },
];

const meta: Meta<typeof TagDropdownWithSelection> = {
  title: 'Components/TagDropdownWithSelection',
  component: TagDropdownWithSelection,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TagDropdownWithSelection>

// ✅ Use StoryFn with inferred props from your component
export const Primary: Story =  {
    args: {
        selectedTags: [],
        availableTags: mockTags,
        placeholder: 'Empty'
    }
};
