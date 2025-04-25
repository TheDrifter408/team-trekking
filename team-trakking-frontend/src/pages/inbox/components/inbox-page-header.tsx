// InboxPageHeader.tsx
import { useState } from 'react';
import {
  Archive,
  Check,
  Star,
  ListFilter,
  CheckCheck,
  Settings2,
  Inbox,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InboxTabType } from '@/types/props/common';

interface Props {
  defaultTab?: InboxTabType;
  onTabChange?: (tab: InboxTabType) => void;
}

const inboxTabConfig: Record<InboxTabType, { icon: any; label: string }> = {
  IMPORTANT: {
    icon: Star,
    label: 'Important',
  },
  OTHER: {
    icon: Archive,
    label: 'Other',
  },
  CLEARED: {
    icon: Check,
    label: 'Cleared',
  },
};

export const InboxPageHeader = ({
  defaultTab = 'IMPORTANT',
  onTabChange,
}: Props) => {
  const [activeTab, setActiveTab] = useState<InboxTabType>(defaultTab);

  // Handle tab change
  const handleTabChange = (tab: InboxTabType) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="w-full fixed top-[--header-height] bg-background z-10">
      {/* Inbox Tabs */}
      <div className="flex pt-2 px-4 border-b border-border justify-between">
        <div className="flex">
          <span className=" text-base relative h-10 items-center flex px-2">
            <Inbox size={14} className={'mr-2'} />
            Inbox
            <div className={'bg-border border-1 h-[16px] w-[1px] ml-4'} />
          </span>
          {Object.keys(inboxTabConfig).map((tabKey) => {
            const tab = tabKey as InboxTabType;
            const TabIcon = inboxTabConfig[tab].icon;
            const tabLabel = inboxTabConfig[tab].label;
            const isActive = tab === activeTab;

            return (
              <Button
                key={tab}
                variant="ghost"
                onClick={() => handleTabChange(tab)}
                className={`relative rounded-none h-10 px-4 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  {TabIcon && <TabIcon className="h-4 w-4" />}
                  <span>{tabLabel}</span>
                </div>
                {isActive && (
                  <div className="absolute bottom-0 center w-full h-0.5 bg-primary" />
                )}
              </Button>
            );
          })}
        </div>
        <div>
          <Button size="icon" variant="ghost">
            <ListFilter className="text-muted-foreground font-medium" />
          </Button>
          <Button size="icon" variant="ghost">
            <CheckCheck className="text-muted-foreground font-medium" />
          </Button>
          <Button size="icon" variant="ghost">
            <Settings2 className="text-muted-foreground font-medium" />
          </Button>
        </div>
      </div>
    </div>
  );
};
