import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Main } from '@/components/layout/main.tsx';
import { InboxPageHeader } from '@/routes/_auth/inbox/-components/inbox-page-header';
import { InboxTabs } from '@/routes/_auth/inbox/-components/inbox-tabs';
import { mockImportant, mockOthers, mockCleared } from '@/mock';
import { InboxTabType } from '@/types/props/Common.ts';

const Inbox = () => {
  const [activeTab, setActiveTab] = useState<InboxTabType>('IMPORTANT');

  const handleTabChange = (tab: InboxTabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="">
      <InboxPageHeader defaultTab={activeTab} onTabChange={handleTabChange} />
      <Main>
        <div className="mt-2">
          {activeTab === 'IMPORTANT' && <InboxTabs data={mockImportant} />}
          {activeTab === 'OTHER' && <InboxTabs data={mockOthers} />}
          {activeTab === 'CLEARED' && <InboxTabs data={mockCleared} />}
        </div>
      </Main>
    </div>
  );
};

export const Route = createFileRoute('/_auth/inbox/')({
  component: Inbox,
});
