import React, { createContext, useContext, useState } from 'react';

export type ViewType = 'overview' | 'board' | 'list' | string;

type PageHeaderData = {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  viewType?: ViewType[];
};

const PageHeaderContext = createContext<{
  header: PageHeaderData | null;
  setHeader: (data: PageHeaderData | null) => void;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}>({
  header: null,
  setHeader: () => {},
  currentView: 'overview',
  setCurrentView: () => {},
});

export const PageHeaderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [header, setHeader] = useState<PageHeaderData | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('overview');

  return (
    <PageHeaderContext.Provider
      value={{ header, setHeader, currentView, setCurrentView }}
    >
      {children}
    </PageHeaderContext.Provider>
  );
};

export const usePageHeader = () => useContext(PageHeaderContext);
