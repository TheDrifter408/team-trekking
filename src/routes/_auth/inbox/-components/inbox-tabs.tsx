import { Messages } from '@/types/props/Common.ts';
import { Inbox } from './messages';

interface Props {
  data: Messages;
}
export const InboxTabs = ({ data }: Props) => {
  return (
    <div className="flex flex-col px-6">
      {/* TODAY SECTION */}
      {data.today.length > 0 && (
        <div className="flex flex-col">
          <span className="font-medium text-base text-muted-foreground mb-3">
            Today
          </span>
          <Inbox items={data.today} />
        </div>
      )}

      {/* YESTERDAY SECTION */}
      {data.yesterday.length > 0 && (
        <div className="flex flex-col mt-4">
          <span className="font-medium text-base text-muted-foreground mb-3">
            Yesterday
          </span>
          <Inbox items={data.yesterday} />
        </div>
      )}

      {/* THIS WEEK SECTION */}
      {data.week.length > 0 && (
        <div className="flex flex-col mt-4">
          <span className="font-medium text-base text-muted-foreground mb-3">
            Last 7 days
          </span>
          <Inbox items={data.week} />
        </div>
      )}

      {/* THIS MONTH SECTION */}
      {data.month.length > 0 && (
        <div className="flex flex-col mt-4">
          <span className="font-medium text-base text-muted-foreground mb-3">
            Earlier This Month
          </span>
          <Inbox items={data.month} />
        </div>
      )}
    </div>
  );
};
