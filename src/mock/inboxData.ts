import { Messages } from '@/types/props/Common.ts';

export const mockImportant: Messages = {
  today: [
    {
      id: 'x-1',
      color: '#686af2',
      code: 'In Progress',
      name: 'Create a checklist for updated apis',
      type: 'Date',
      message: 'This is task is overdue.',
      post_message: 'Due date was 2 days ago.',
      post_type: 'Failed',
      date: 'Apr 23',
    },
    {
      id: 'x-2',
      color: '#e84c3d',
      code: 'Urgent',
      name: 'Review security vulnerabilities',
      type: 'Status',
      message: 'Critical security update required.',
      post_message: 'Action needed immediately.',
      post_type: 'Attention',
      date: 'Apr 24',
    },
    {
      id: 'x-3',
      color: '#2ecc71',
      code: 'Completed',
      name: 'Update documentation for v2.3',
      type: 'Date',
      message: 'Documentation has been reviewed.',
      post_message: 'Completed ahead of schedule.',
      post_type: 'Success',
      date: 'Apr 24',
    },
  ],
  yesterday: [
    {
      id: 'y-1',
      color: '#686af2',
      code: 'In Progress',
      name: 'Test integration with payment gateway',
      type: 'Assign',
      message: 'Sarah has been assigned to this task.',
      post_message: 'Requires QA review after completion.',
      post_type: 'Attention',
      date: 'Apr 22',
    },
    {
      id: 'y-2',
      color: '#f39c12',
      code: 'Pending',
      name: 'Create mockups for mobile app',
      type: 'Comment',
      message: 'New comment from design team.',
      post_message: 'Please check feedback.',
      post_type: 'Attention',
      date: 'Apr 22',
    },
  ],
  week: [
    {
      id: 'w-1',
      color: '#3498db',
      code: 'Review',
      name: 'Code review for authentication module',
      type: 'Date',
      message: 'Review scheduled for Friday.',
      post_message: 'All team members must attend.',
      post_type: 'Attention',
      date: 'Apr 26',
    },
    {
      id: 'w-2',
      color: '#686af2',
      code: 'In Progress',
      name: 'Implement user feedback system',
      type: 'Status',
      message: 'Development in progress.',
      post_message: '60% completed.',
      post_type: 'Success',
      date: 'Apr 25',
    },
    {
      id: 'w-3',
      color: '#f39c12',
      code: 'Pending',
      name: 'Quarterly budget review',
      type: 'Date',
      message: 'Meeting scheduled with finance team.',
      post_message: 'Prepare reports beforehand.',
      post_type: 'Attention',
      date: 'Apr 27',
    },
  ],
  month: [
    {
      id: 'm-1',
      color: '#9b59b6',
      code: 'Planning',
      name: 'Q3 roadmap planning',
      type: 'Date',
      message: 'Strategy meeting with stakeholders.',
      post_message: 'Presentation materials due May 5.',
      post_type: 'Attention',
      date: 'May 10',
    },
    {
      id: 'm-2',
      color: '#2ecc71',
      code: 'Completed',
      name: 'Migrate database to new server',
      type: 'Status',
      message: 'Migration successful.',
      post_message: 'All tests passed.',
      post_type: 'Success',
      date: 'May 2',
    },
    {
      id: 'm-3',
      color: '#e84c3d',
      code: 'Urgent',
      name: 'Renew SSL certificates',
      type: 'Date',
      message: 'Certificates expire soon.',
      post_message: 'Must be completed by May 15.',
      post_type: 'Attention',
      date: 'May 15',
    },
    {
      id: 'm-4',
      color: '#686af2',
      code: 'In Progress',
      name: 'Implement new analytics dashboard',
      type: 'Assign',
      message: 'Development team working on this.',
      post_message: 'ETA is May 20.',
      post_type: 'Attention',
      date: 'May 20',
    },
  ],
};

// Restructured mockOthers to follow Messages interface
export const mockOthers: Messages = {
  today: [],
  yesterday: [],
  week: [
    {
      id: 'o-1',
      color: '#34495e',
      code: 'Low Priority',
      name: 'Update team contact information',
      type: 'Date',
      message: 'HR requested updated contact info.',
      post_message: 'Not urgent but should be done.',
      post_type: 'Attention',
      date: 'May 30',
    },
    {
      id: 'o-2',
      color: '#3498db',
      code: 'Review',
      name: 'Review intern applications',
      type: 'Assign',
      message: 'Please review and provide feedback.',
      post_message: 'Initial screening completed.',
      post_type: 'Success',
      date: 'Jun 5',
    },
  ],
  month: [
    {
      id: 'o-3',
      color: '#f39c12',
      code: 'Pending',
      name: 'Schedule team building event',
      type: 'Comment',
      message: 'New venue options available.',
      post_message: 'Vote for preferred location.',
      post_type: 'Attention',
      date: 'Jun 15',
    },
    {
      id: 'o-4',
      color: '#9b59b6',
      code: 'Planning',
      name: 'Plan annual developer conference',
      type: 'Status',
      message: 'Initial planning phase.',
      post_message: 'Need input on speakers.',
      post_type: 'Attention',
      date: 'Jul 10',
    },
  ],
};

// Restructured mockCleared to follow Messages interface
export const mockCleared: Messages = {
  today: [
    {
      id: 'c-1',
      color: '#2ecc71',
      code: 'Completed',
      name: 'Fix login page bugs',
      type: 'Status',
      message: 'All bugs resolved and tested.',
      post_message: 'Cleared on April 20.',
      post_type: 'Success',
      date: 'Apr 20',
    },
  ],
  yesterday: [
    {
      id: 'c-2',
      color: '#2ecc71',
      code: 'Completed',
      name: 'Update privacy policy',
      type: 'Date',
      message: 'Legal team approved changes.',
      post_message: 'Published to website.',
      post_type: 'Success',
      date: 'Apr 18',
    },
  ],
  week: [
    {
      id: 'c-3',
      color: '#e84c3d',
      code: 'Urgent',
      name: 'Fix server outage',
      type: 'Status',
      message: 'Emergency issue resolved.',
      post_message: 'Root cause identified.',
      post_type: 'Success',
      date: 'Apr 15',
    },
    {
      id: 'c-4',
      color: '#686af2',
      code: 'In Progress',
      name: 'Onboard new team members',
      type: 'Greet',
      message: 'Welcome process completed.',
      post_message: 'All access granted.',
      post_type: 'Success',
      date: 'Apr 10',
    },
  ],
  month: [
    {
      id: 'c-5',
      color: '#2ecc71',
      code: 'Completed',
      name: 'Quarterly performance review',
      type: 'Date',
      message: 'All reviews submitted.',
      post_message: 'Feedback shared with team.',
      post_type: 'Success',
      date: 'Apr 5',
    },
  ],
};
