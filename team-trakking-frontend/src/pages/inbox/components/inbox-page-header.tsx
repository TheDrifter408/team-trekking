import { useState } from 'react';
import {
  Archive,
  Check,
  Clock,
  Star,
  ListFilter,
  CheckCheck,
  Settings2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define inbox tab type
type InboxTabType = 'IMPORTANT' | 'OTHER' | 'SNOOZED' | 'CLEARED';

interface Props {
  // Optional default tab
  defaultTab?: InboxTabType;
  // Optional callback when tab changes
  onTabChange?: (tab: InboxTabType) => void;
}

// Define the inbox tabs configuration
const inboxTabConfig = {
  important: {
    icon: Star,
    label: 'Important',
  },
  other: {
    icon: Archive,
    label: 'Other',
  },
  snoozed: {
    icon: Clock,
    label: 'Snoozed',
  },
  cleared: {
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
    <div className="w-full sticky top-[--header-height] bg-background z-10 ">
      {/* Inbox Tabs */}
      <div className="flex pt-2 px-4 border-b border-border justify-between">
        <div className="flex">
          <span className="text-muted-foreground text-base relative h-10 items-center flex pr-2">
            Inbox
          </span>

          {(Object.keys(inboxTabConfig) as InboxTabType[]).map((tab) => {
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
        <div className="">
          <Button size={'icon'} variant={'ghost'}>
            <ListFilter className={'text-muted-foreground font-medium'} />
          </Button>
          <Button size={'icon'} variant={'ghost'}>
            <CheckCheck className={'text-muted-foreground font-medium'} />
          </Button>
          <Button size={'icon'} variant={'ghost'}>
            <Settings2 className={'text-muted-foreground font-medium'} />
          </Button>
        </div>
      </div>
    </div>
  );
};
