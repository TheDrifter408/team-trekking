import React, { useMemo } from 'react';
import { Task } from '@/types/props/public-types';

const localeDateStringCache: Record<string, string> = {};
const toLocaleDateStringFactory =
  (locale: string) => (date: Date, options: Intl.DateTimeFormatOptions) => {
    const key = date.toString();
    let formatted = localeDateStringCache[key];
    if (!formatted) {
      formatted = date.toLocaleDateString(locale, options);
      localeDateStringCache[key] = formatted;
    }
    return formatted;
  };

const dateTimeOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const TaskListTableDefault: React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
}> = ({
  rowHeight,
  rowWidth,
  fontFamily,
  fontSize,
  locale,
  tasks,
  onExpanderClick,
}) => {
  const toLocaleDateString = useMemo(
    () => toLocaleDateStringFactory(locale),
    [locale]
  );

  return (
    <div className="w-full" style={{ fontFamily, fontSize }}>
      {tasks.map((t) => {
        const expanderSymbol =
          t.hideChildren === false ? '▼' : t.hideChildren === true ? '▶' : '';

        return (
          <div
            key={`${t.id}row`}
            className="flex items-center border-b border-muted"
            style={{ height: `${rowHeight}px` }}
          >
            <div
              className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis px-2"
              style={{ minWidth: rowWidth, maxWidth: rowWidth }}
              title={t.name}
            >
              <div
                className={`cursor-pointer w-4 flex justify-center ${expanderSymbol ? 'text-foreground' : 'invisible'}`}
                onClick={() => onExpanderClick(t)}
              >
                {expanderSymbol}
              </div>
              <div className="truncate">{t.name}</div>
            </div>
            <div
              className="px-2 truncate text-muted-foreground"
              style={{ minWidth: rowWidth, maxWidth: rowWidth }}
            >
              {toLocaleDateString(t.start, dateTimeOptions)}
            </div>
            <div
              className="px-2 truncate text-muted-foreground"
              style={{ minWidth: rowWidth, maxWidth: rowWidth }}
            >
              {toLocaleDateString(t.end, dateTimeOptions)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
