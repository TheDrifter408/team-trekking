import { useState } from 'react';
import { Main } from '@/components/layout/main.tsx';
import { InboxPageHeader } from '@/pages/inbox/components/inbox-page-header.tsx';

type InboxTabType = 'IMPORTANT' | 'OTHER' | 'SNOOZED' | 'CLEARED';

export const Inbox = () => {
  const [activeTab, setActiveTab] = useState<InboxTabType>('IMPORTANT');
  const handleTabChange = (tab: InboxTabType) => {
    setActiveTab(tab);
  };
  return (
    <>
      <InboxPageHeader defaultTab={activeTab} onTabChange={handleTabChange} />
      <Main></Main>
    </>
  );
};
